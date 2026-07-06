const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const dns = require('dns');

dns.setDefaultResultOrder('ipv4first');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection (Triggered redeployment for whitelist propagation check)
mongoose.connect(process.env.MONGO_URI, { family: 4 })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.get('/debug-db', async (req, res) => {
  const dnsPromises = require('dns').promises;
  const results = {};
  const hosts = [
    'ac-wf1zzbc-shard-00-00.hspvqcp.mongodb.net',
    'ac-wf1zzbc-shard-00-01.hspvqcp.mongodb.net',
    'ac-wf1zzbc-shard-00-02.hspvqcp.mongodb.net'
  ];
  for (const host of hosts) {
    try {
      const addresses = await dnsPromises.resolve4(host);
      results[host] = { success: true, addresses };
    } catch (err) {
      results[host] = { success: false, error: err.message };
    }
  }
  results['mongoose_state'] = mongoose.connection.readyState;
  res.json(results);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
