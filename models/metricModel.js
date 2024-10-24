const mongoose = require('mongoose');

const metricSchema = new mongoose.Schema({
  campaign_id: { type: String, required: true },
  total_leads: Number,
  contacted_leads: Number,
  qualified_leads: Number,
  lost_leads: Number,
  conversion_rate: Number,
  last_updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Metric', metricSchema);
