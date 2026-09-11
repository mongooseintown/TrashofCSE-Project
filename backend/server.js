const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const dns = require('dns');

dns.setDefaultResultOrder('ipv4first');
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  console.warn('DNS setServers error:', e);
}
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
let mongoConnectionError = null;
const WORKING_MONGO_URI = 'mongodb+srv://admin:theorydestructor1029%40%23%24%25@cluster0.hspvqcp.mongodb.net/TrashofCSE?appName=Cluster0';

async function connectDB() {
  let targetUri = (process.env.MONGO_URI || WORKING_MONGO_URI)
    .replace(/\/trashofcse(\?|$)/i, '/TrashofCSE$1');

  // Auto-correct unencoded password in Render env vars if present
  if (targetUri.includes('theorydestructor1029') && !targetUri.includes('%40%23%24%25')) {
    targetUri = WORKING_MONGO_URI;
  }

  try {
    await mongoose.connect(targetUri, { serverSelectionTimeoutMS: 7000 });
    mongoConnectionError = null;
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.warn(`Primary Mongo connection failed (${err.message}). Trying verified fallback...`);
    try {
      await mongoose.connect(WORKING_MONGO_URI, { serverSelectionTimeoutMS: 7000 });
      mongoConnectionError = null;
      console.log('MongoDB connected successfully via verified fallback');
    } catch (fallbackErr) {
      mongoConnectionError = fallbackErr.message;
      console.error('MongoDB fallback connection error:', fallbackErr);
    }
  }
}

connectDB();

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/materials', require('./routes/materialRoutes'));

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    mongoStatus: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState],
    mongoReadyState: mongoose.connection.readyState,
    mongoConnectionError,
    hasMongoUri: !!process.env.MONGO_URI,
    mongoUriPrefix: process.env.MONGO_URI ? process.env.MONGO_URI.substring(0, 25) : 'none',
    time: new Date().toISOString()
  });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
