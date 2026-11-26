const mongoose = require('mongoose');

const galleryItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    category: {
      type: String,
      required: true,
      default: 'solar-rooftop',
      trim: true,
    },
    categoryLabel: {
      type: String,
      default: 'Rooftop Solar PV',
      trim: true,
    },
    location: {
      type: String,
      default: 'Coimbatore, Tamil Nadu',
      trim: true,
    },
    tag: {
      type: String,
      default: 'Solar Installation',
      trim: true,
    },
    mediaType: {
      type: String,
      enum: ['image', 'video'],
      default: 'image',
    },
    mediaUrl: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      default: '',
    },
    fileName: {
      type: String,
      default: '',
    },
    fileSize: {
      type: Number,
      default: 0,
    },
    mimeType: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Index for fast search and filtering
galleryItemSchema.index({ category: 1, mediaType: 1, createdAt: -1 });
galleryItemSchema.index({ title: 'text', description: 'text', location: 'text', tag: 'text' });

module.exports = mongoose.model('GalleryItem', galleryItemSchema);
