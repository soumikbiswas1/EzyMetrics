const PDFDocument = require('pdfkit');
const { Parser } = require('json2csv');
const fs = require('fs');
const path = require('path');
const Metric = require('../models/metricModel');

const generatePDFReport = (metrics, filePath) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(18).text('Campaign Metrics Report', { align: 'center' });
    doc.moveDown();

    metrics.forEach(metric => {
      doc.fontSize(14).text(`Campaign ID: ${metric.campaign_id}`);
      doc.text(`Total Leads: ${metric.total_leads}`);
      doc.text(`Contacted Leads: ${metric.contacted_leads}`);
      doc.text(`Qualified Leads: ${metric.qualified_leads}`);
      doc.text(`Lost Leads: ${metric.lost_leads}`);
      doc.text(`Conversion Rate: ${metric.conversion_rate}%`);
      doc.moveDown();
    });

    doc.end();
    doc.on('finish', () => resolve(filePath));
    doc.on('error', (error) => reject(error));
  });
};

const generateCSVReport = (metrics, filePath) => {
  return new Promise((resolve, reject) => {
    const parser = new Parser();
    const csv = parser.parse(metrics);
    fs.writeFile(filePath, csv, (err) => {
      if (err) reject(err);
      resolve(filePath);
    });
  });
};

const getMetricsForReport = async (campaignId, startDate, endDate) => {
  const query = {};
  if (campaignId) query.campaign_id = campaignId;
  if (startDate && endDate) {
    query.last_updated = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }
  return Metric.find(query);
};

module.exports = {
  generatePDFReport,
  generateCSVReport,
  getMetricsForReport
};
