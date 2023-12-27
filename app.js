const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const snowflake = require('@theinternetfolks/snowflake');

const app = express();
const PORT = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost:27017/saas', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});
app.use(bodyParser.json());
const authRoutes = require('./routes/auth');
const communityRoutes = require('./routes/community');
app.use('/api', authRoutes);
app.use('/api', communityRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
