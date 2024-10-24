const path = require('path');
const { generatePDFReport, generateCSVReport, getMetricsForReport } = require('../services/reportService');

const generateReport = async (req, res) => {
  try {
    const { campaignId, startDate, endDate, format } = req.query;
    const metrics = await getMetricsForReport(campaignId, startDate, endDate);
    if (!metrics.length) {
      return res.status(404).json({ message: 'No data found for the given parameters.' });
    }

    const fileName = `report_${Date.now()}.${format}`;
    const filePath = path.join(__dirname, `../reports/${fileName}`);

    if (format === 'pdf') {
      await generatePDFReport(metrics, filePath);
    } else if (format === 'csv') {
      await generateCSVReport(metrics, filePath);
    } else {
      return res.status(400).json({ message: 'Invalid format. Use pdf or csv.' });
    }

    res.download(filePath, fileName, (err) => {
      if (err) res.status(500).json({ message: 'Error downloading the report.' });
      fs.unlinkSync(filePath);
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate report', error: error.message });
  }
};

module.exports = {
  generateReport
};
