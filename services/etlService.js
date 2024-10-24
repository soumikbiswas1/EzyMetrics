const { sendEmail } = require('./emailService');

const runETL = async () => {
  try {
    // ETL logic here...
    // Example condition: Send an email if total leads exceed 100
    if (totalLeads > 100) {
      const message = `Alert: The number of leads for campaign ${campaign.campaign_id} has exceeded 100.`;
      await sendEmail('recipient@example.com', 'Lead Threshold Alert', message);
    }

    console.log('ETL process completed successfully.');
  } catch (error) {
    console.error('ETL process failed:', error);
  }
};

