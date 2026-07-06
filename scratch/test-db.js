const mongoose = require('mongoose');

const uri = 'mongodb+srv://admin:theorydestructor1029@ac-wf1zzbc.hspvqcp.mongodb.net/TrashofCSE?retryWrites=true&w=majority';

console.log('Connecting to:', uri);
mongoose.connect(uri)
  .then(() => {
    console.log('Connection successful!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Connection failed:', err);
    process.exit(1);
  });
