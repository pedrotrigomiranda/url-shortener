const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

const app = express();

app.use(express.json({ extended: false })); // Accept json data into the API

// Define routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`.yellow.bold)
);
