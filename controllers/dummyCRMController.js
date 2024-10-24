const { loadLeads, loadCampaigns } = require('../services/dummyCRMService');

const getLeads = (req, res) => {
  try {
    const leads = loadLeads();
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load leads data', error: error.message });
  }
};

const getCampaigns = (req, res) => {
  try {
    const campaigns = loadCampaigns();
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load campaigns data', error: error.message });
  }
};

module.exports = {
  getLeads,
  getCampaigns
};
