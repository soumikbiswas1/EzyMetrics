const fs = require('fs');
const path = require('path');

const loadLeads = () => {
  try {
    const dataPath = path.join(__dirname, '../mockData/leads.json');
    const leadsData = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(leadsData);
  } catch (error) {
    console.error('Error loading leads data:', error);
    return [];
  }
};

const loadCampaigns = () => {
  try {
    const dataPath = path.join(__dirname, '../mockData/campaigns.json');
    const campaignsData = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(campaignsData);
  } catch (error) {
    console.error('Error loading campaigns data:', error);
    return [];
  }
};

module.exports = {
  loadLeads,
  loadCampaigns
};
