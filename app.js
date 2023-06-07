const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const mongoDB = 'mongodb://localhost:27017/test'; // Ensure you specify a database name, I used 'test' here
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Use body-parser middleware
app.use(bodyParser.json());

// Routes
app.use('/api/items', require('./routes/items'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
