const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  lead_id: { type: String, required: true },
  name: String,
  email: String,
  source: String,
  campaign_id: String,
  status: String,
  date: Date
});

module.exports = mongoose.model('Lead', leadSchema);
