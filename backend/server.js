const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const Admin = require('./models/Admin');
const authRoutes = require('./routes/authRoutes');
const galleryRoutes = require('./routes/galleryRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://sumathiagencies:Sumathiagencies123@cluster0.s5mco6x.mongodb.net/sumathiagency';

// Ensure uploads folder and subdirectories exist
const uploadsDir = path.join(__dirname, 'uploads');
const imagesDir = path.join(uploadsDir, 'images');
const videosDir = path.join(uploadsDir, 'videos');
[uploadsDir, imagesDir, videosDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Middlewares
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploaded media files
app.use('/uploads', express.static(uploadsDir));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/gallery', galleryRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    database:
      mongoose.connection.readyState === 1 ? 'connected' : 'connecting/disconnected',
  });
});

// Seed default admin account if none exists
async function seedDefaultAdmin() {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const defaultUsername = (process.env.ADMIN_USERNAME || 'admin').toLowerCase();
      const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123';

      const newAdmin = new Admin({
        username: defaultUsername,
        password: defaultPassword,
      });
      await newAdmin.save();
      console.log(`[Admin Seed] Default admin created: Username: "${defaultUsername}"`);
    } else {
      console.log(`[Admin Seed] Admin account already configured (${adminCount} found).`);
    }
  } catch (err) {
    console.error('[Admin Seed] Error seeding default admin:', err.message);
  }
}

// Connect to MongoDB and start server
mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB successfully.');
    await seedDefaultAdmin();

    app.listen(PORT, () => {
      console.log(`🚀 Sumathi Agencies Backend running on http://localhost:${PORT}`);
      console.log(`📁 Static files served at http://localhost:${PORT}/uploads`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    // Still start server so API endpoints can inform frontend
    app.listen(PORT, () => {
      console.log(`⚠️ Backend started with DB connection error on http://localhost:${PORT}`);
    });
  });

module.exports = app;
