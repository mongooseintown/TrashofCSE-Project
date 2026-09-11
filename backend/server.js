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
const rawUri = process.env.MONGO_URI || '';
const mongoUri = rawUri.replace(/\/trashofcse(\?|$)/i, '/TrashofCSE$1');

mongoose.connect(mongoUri, {
  serverSelectionTimeoutMS: 5000,
})
.then(() => {
  mongoConnectionError = null;
  console.log('MongoDB connected');
})
.catch(err => {
  mongoConnectionError = err.message;
  console.error('MongoDB connection error:', err);
});

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
