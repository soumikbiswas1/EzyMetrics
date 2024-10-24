
# EzyMetrics Backend

## Overview
EzyMetrics is a backend application built with **Node.js**, **Express**, and **MongoDB** for integrating data from dummy CRM and Marketing platforms. It features:
- Fetching and storing lead and campaign data.
- Generating PDF/CSV reports.
- Sending email alerts based on custom conditions.
- Periodic ETL processing to calculate metrics like conversion rates.

## Features
1. **API Services**:
   - Fetch dummy data from simulated CRM and marketing platforms.
   - Endpoints for lead and campaign data.
2. **ETL Process**:
   - Extract, transform, and load (ETL) data to calculate metrics.
   - Scheduled to run daily via `node-cron`.
3. **Reporting**:
   - Generate reports in PDF or CSV format.
   - Export campaign metrics (e.g., total leads, conversion rate).
4. **Email Notifications**:
   - Alerts sent when specified conditions are met (e.g., lead threshold or conversion drop).

## Technologies Used
- **Node.js**: JavaScript runtime for backend development.
- **Express.js**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing leads, campaigns, and processed metrics.
- **pdfkit**: Generate PDF reports.
- **json2csv**: Generate CSV reports.
- **nodemailer**: Send email notifications.
- **node-cron**: Schedule the ETL process.

## Setup Instructions

### Prerequisites
- **Node.js** (v14+)
- **MongoDB** installed and running locally or remotely.

### Installation

1. **Clone the repository**:
   \`\`\`bash
   git clone https://github.com/soumikbiswas1/EzyMetrics.git
   \`\`\`

2. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

3. **Environment Setup**:
   Create a `.env` file in the root directory and configure the following:
   \`\`\`env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/ezymetrics
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-email-password
   \`\`\`

4. **Start the server**:
   \`\`\`bash
   npm run dev
   \`\`\`

   The application will start running on \`http://localhost:5000\`.

### API Endpoints

1. **Fetch Leads**: \`GET /api/leads\`
   - Fetch all leads from the dummy CRM.
   - **Example Response**:
     \`\`\`json
     [
       { "lead_id": "L001", "name": "John Doe", "source": "Website", "campaign_id": "C001", "status": "Contacted", "date": "2024-10-01" },
       { "lead_id": "L002", "name": "Jane Doe", "source": "Ad", "campaign_id": "C002", "status": "Qualified", "date": "2024-10-02" }
     ]
     \`\`\`

2. **Fetch Campaigns**: \`GET /api/campaigns\`
   - Fetch all campaigns from the dummy CRM.
   - **Example Response**:
     \`\`\`json
     [
       { "campaign_id": "C001", "name": "Fall Promotion", "start_date": "2024-09-01", "end_date": "2024-12-01" },
       { "campaign_id": "C002", "name": "Winter Promotion", "start_date": "2024-11-01", "end_date": "2025-01-01" }
     ]
     \`\`\`

3. **Generate Reports**: \`GET /api/reports?format=<pdf|csv>&campaignId=<campaignId>&startDate=<startDate>&endDate=<endDate>\`
   - Generates a report (PDF/CSV) for a specific campaign within the specified date range.
   - **Query Parameters**:
     - `format`: Report format (`pdf` or `csv`).
     - `campaignId`: The ID of the campaign to generate the report for.
     - `startDate` and `endDate`: Date range for filtering leads and campaigns.

   - **Example Request**:
     \`\`\`
     GET /api/reports?format=pdf&campaignId=C001&startDate=2024-09-01&endDate=2024-12-01
     \`\`\`

   - **Example Response**: A downloadable PDF or CSV file.

### Testing

You can test the API using **Postman**, **cURL**, or any HTTP client.

1. **Fetch Leads**:
   \`\`\`bash
   curl -X GET http://localhost:5000/api/leads
   \`\`\`

2. **Fetch Campaigns**:
   \`\`\`bash
   curl -X GET http://localhost:5000/api/campaigns
   \`\`\`

3. **Generate PDF Report**:
   \`\`\`bash
   curl -X GET "http://localhost:5000/api/reports?format=pdf&campaignId=C001&startDate=2024-09-01&endDate=2024-12-01" -o report.pdf
   \`\`\`

4. **Generate CSV Report**:
   \`\`\`bash
   curl -X GET "http://localhost:5000/api/reports?format=csv&campaignId=C002&startDate=2024-09-01&endDate=2024-12-01" -o report.csv
   \`\`\`

### Email Notifications

Email notifications are triggered when the following conditions are met:
- **Lead Threshold**: When the number of leads for a campaign exceeds a set threshold.
- **Conversion Rate Drop**: When a campaign’s conversion rate drops below a defined value.

You can customize these thresholds in `etlService.js` for testing.

### ETL Process

The ETL process runs every day at midnight by default, processing leads and campaigns into metrics. To trigger it manually for testing:
\`\`\`bash
node -e 'require("./services/etlService")()'
\`\`\`

