// const mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://Tushar9963:Tushar@9963@ecomnode.pc4qbsw.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=EcomNode')
// mongoose.connect('mongodb+srv://tusharshivaji1811:Tushar%4078657865@ecomnode.pc4qbsw.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=EcomNode')
// mongoose.connect(process.env.MONGODBCONNECTION)
const mongoose = require('mongoose');

// Corrected MongoDB connection URI
const mongoURI = 'mongodb+srv://Tushar9963:Tushar%409963@ecomnode.pc4qbsw.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=EcomNode';

mongoose.connect(mongoURI).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});