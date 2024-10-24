const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cron = require('node-cron');
const dummyCRMRoutes = require('./routes/dummyCRMRoutes');
const reportRoutes = require('./routes/reportRoutes');
const runETL = require('./services/etlService');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Sample Route
app.get('/', (req, res) => {
  res.send('EzyMetrics Backend is running');
});

// Use routes
app.use('/api', dummyCRMRoutes);
app.use('/api', reportRoutes);

// Schedule the ETL to run every day at midnight
cron.schedule('0 0 * * *', () => {
  console.log('Running ETL process...');
  runETL();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
