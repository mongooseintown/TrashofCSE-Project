const https = require('https');

const data = JSON.stringify({
  email: 'c241079@ugrad.iiuc.ac.bd',
  password: 'wrongpassword123'
});

const options = {
  hostname: 'trashofcse-project.onrender.com',
  port: 443,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = https.request(options, (res) => {
  console.log('Status Code:', res.statusCode);
  
  let body = '';
  res.on('data', (chunk) => {
    body += chunk;
  });
  
  res.on('end', () => {
    console.log('Response body:', body);
  });
});

req.on('error', (error) => {
  console.error('Request error:', error);
});

req.write(data);
req.end();
