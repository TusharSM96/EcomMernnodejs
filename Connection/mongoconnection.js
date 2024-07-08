const mongoose = require('mongoose');
const mongoURI = process.env.MONGODBCONNECTION;
mongoose.connect(mongoURI).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});