const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure base upload directories exist
const uploadBaseDir = path.join(__dirname, '..', 'uploads');
const imagesDir = path.join(uploadBaseDir, 'images');
const videosDir = path.join(uploadBaseDir, 'videos');

[uploadBaseDir, imagesDir, videosDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configure disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isVideo = file.mimetype.startsWith('video/');
    cb(null, isVideo ? videosDir : imagesDir);
  },
  filename: (req, file, cb) => {
    // Generate unique, clean filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanName = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9-_]/g, '_')
      .slice(0, 40);
    cb(null, `${cleanName}-${uniqueSuffix}${ext}`);
  },
});

// Validate allowed MIME types for images & videos
const fileFilter = (req, file, cb) => {
  const allowedImageTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/svg+xml',
    'image/avif',
  ];
  const allowedVideoTypes = [
    'video/mp4',
    'video/webm',
    'video/ogg',
    'video/quicktime', // .mov
    'video/x-msvideo', // .avi
    'video/x-matroska', // .mkv
  ];

  if (
    allowedImageTypes.includes(file.mimetype) ||
    allowedVideoTypes.includes(file.mimetype)
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `Unsupported file type: ${file.mimetype}. Please upload a standard image (JPG, PNG, WEBP, GIF) or video (MP4, WEBM, MOV).`
      ),
      false
    );
  }
};

// Max file limit: 150 MB (accommodates high-res photos and video recordings)
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 150 * 1024 * 1024,
  },
});

module.exports = upload;
