const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const GalleryItem = require('../models/GalleryItem');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Helper mapping for category labels
const categoryLabels = {
  'solar-rooftop': 'Rooftop Solar PV',
  'water-heating': 'Solar Water Heating',
  'solar-lighting': 'Solar Lighting',
  'security-cctv': 'Smart Security & CCTV',
  'all': 'All Projects',
};

/**
 * @route   GET /api/gallery
 * @desc    Fetch all gallery items with filtering and search
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const { category, mediaType, search } = req.query;
    const filter = {};

    if (category && category !== 'all') {
      filter.category = category;
    }

    if (mediaType && (mediaType === 'image' || mediaType === 'video')) {
      filter.mediaType = mediaType;
    }

    if (search && search.trim()) {
      const q = search.trim();
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { location: { $regex: q, $options: 'i' } },
        { tag: { $regex: q, $options: 'i' } },
      ];
    }

    const items = await GalleryItem.find(filter).sort({ createdAt: -1 });

    return res.json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (err) {
    console.error('Fetch gallery items error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve gallery items.',
    });
  }
});

/**
 * @route   GET /api/gallery/:id
 * @desc    Fetch single gallery item
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const item = await GalleryItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found.',
      });
    }
    return res.json({ success: true, data: item });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

/**
 * @route   POST /api/gallery
 * @desc    Create new gallery item by uploading an image or video file
 * @access  Private (Admin only)
 */
router.post('/', auth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please select an image or video file from your file manager to upload.',
      });
    }

    const {
      title,
      description,
      category = 'solar-rooftop',
      location = 'Coimbatore, Tamil Nadu',
      tag = 'Solar Installation',
    } = req.body;

    if (!title || !title.trim()) {
      // Remove uploaded file if validation fails
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({
        success: false,
        message: 'Item title is required.',
      });
    }

    const isVideo = req.file.mimetype.startsWith('video/');
    const relativeSubdir = isVideo ? 'videos' : 'images';
    const mediaUrl = `/uploads/${relativeSubdir}/${req.file.filename}`;

    const newItem = new GalleryItem({
      title: title.trim(),
      description: (description || '').trim(),
      category: category.trim(),
      categoryLabel: categoryLabels[category] || 'Solar Installation',
      location: location.trim(),
      tag: tag.trim(),
      mediaType: isVideo ? 'video' : 'image',
      mediaUrl,
      fileName: req.file.filename,
      fileSize: req.file.size,
      mimeType: req.file.mimetype,
    });

    await newItem.save();

    return res.status(201).json({
      success: true,
      message: `${isVideo ? 'Video' : 'Image'} uploaded and created successfully.`,
      data: newItem,
    });
  } catch (err) {
    console.error('Create gallery item error:', err);
    if (req.file && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (e) {}
    }
    return res.status(500).json({
      success: false,
      message: err.message || 'Failed to upload and create gallery item.',
    });
  }
});

/**
 * @route   PUT /api/gallery/:id
 * @desc    Update gallery item (metadata and optional new file)
 * @access  Private (Admin only)
 */
router.put('/:id', auth, upload.single('file'), async (req, res) => {
  try {
    const item = await GalleryItem.findById(req.params.id);
    if (!item) {
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found.',
      });
    }

    const { title, description, category, location, tag } = req.body;

    if (title) item.title = title.trim();
    if (description !== undefined) item.description = description.trim();
    if (category) {
      item.category = category.trim();
      item.categoryLabel = categoryLabels[category] || item.categoryLabel;
    }
    if (location !== undefined) item.location = location.trim();
    if (tag !== undefined) item.tag = tag.trim();

    // If new file is uploaded through file manager, replace the old file
    if (req.file) {
      // Remove old file if it was locally stored in /uploads
      if (item.mediaUrl && item.mediaUrl.startsWith('/uploads/')) {
        const oldFilePath = path.join(__dirname, '..', item.mediaUrl);
        if (fs.existsSync(oldFilePath)) {
          try {
            fs.unlinkSync(oldFilePath);
          } catch (e) {
            console.warn('Could not delete old media file:', oldFilePath);
          }
        }
      }

      const isVideo = req.file.mimetype.startsWith('video/');
      const relativeSubdir = isVideo ? 'videos' : 'images';
      item.mediaType = isVideo ? 'video' : 'image';
      item.mediaUrl = `/uploads/${relativeSubdir}/${req.file.filename}`;
      item.fileName = req.file.filename;
      item.fileSize = req.file.size;
      item.mimeType = req.file.mimetype;
    }

    await item.save();

    return res.json({
      success: true,
      message: 'Gallery item updated successfully.',
      data: item,
    });
  } catch (err) {
    console.error('Update gallery item error:', err);
    if (req.file && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (e) {}
    }
    return res.status(500).json({
      success: false,
      message: err.message || 'Failed to update gallery item.',
    });
  }
});

/**
 * @route   DELETE /api/gallery/:id
 * @desc    Delete gallery item and its local file
 * @access  Private (Admin only)
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await GalleryItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found.',
      });
    }

    // Delete file from disk if stored in /uploads
    if (item.mediaUrl && item.mediaUrl.startsWith('/uploads/')) {
      const filePath = path.join(__dirname, '..', item.mediaUrl);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (e) {
          console.warn('Could not delete media file on disk:', filePath);
        }
      }
    }

    await GalleryItem.findByIdAndDelete(req.params.id);

    return res.json({
      success: true,
      message: 'Gallery item deleted successfully.',
    });
  } catch (err) {
    console.error('Delete gallery item error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete gallery item.',
    });
  }
});

module.exports = router;
