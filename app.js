const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');

// Connect to mongo database with uri that defined in the config file
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true });

// Echo msg on successful connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + config.MONGODB_URI);
});

// Echo msg on connection error
mongoose.connection.on('error', err => {
  console.log('Database error: ' + err);
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

// routeing
const userRoute = require('./Routes/users.js');
app.use('/api/users', userRoute);

app.listen(config.PORT, () => {
  console.log(`Server started on port ${config.PORT}`);
});
