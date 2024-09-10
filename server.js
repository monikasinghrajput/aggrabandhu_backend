const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const sequelize = require('./config/db');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const { exec } = require('child_process');
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Run the cleanup script
exec('node ./cleanupIndexes.js', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing cleanup script: ${error}`);
    return;
  }
  console.log(`Cleanup script output: ${stdout}`);
  if (stderr) {
    console.error(`Cleanup script stderr: ${stderr}`);
  }
});

// Sync database
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

// Importing routes
const routes = {
  '/api/auth': require('./api/userProfile/auth-routes'),
  '/api/member': require('./api/Members/member-route'),
  '/api/donationreceive': require('./api/DonationManagement/DonationReceive/Donation_Routes'),
  '/api/district': require('./api/DistrictManagement/DistrictRoute'),
  '/api/donation': require('./api/DonationManagement/Donations/Donation_Routes'),
  '/api/gallery': require('./api/gallery/GalleryRoutes'),
  '/api/state': require('./api/StateManagement/stateRoute'),
  '/api/gotra': require('./api/Gotra/GotraRoute'),
  '/api/news': require('./api/News/newsRoutes'),
  '/api/file': require('./api/GetFileData/FileRoute'),
  '/api/validate-image': require('./api/ImageValidation/ValidationImage'),
  '/api/role': require('./api/Rolemanagement/roleManageRoute'),
  '/api/birth': require('./api/todayBirthday/todayBirthRoutes'),
  '/api/notification': require('./api/NotificationManagement/notificationRoute'),
  '/api/useradd': require('./api/userProfile/auth-routes'),
};

for (const [path, route] of Object.entries(routes)) {
  app.use(path, route);
}

app.get('/', (req, res) => {
  res.send('Mona : warning ! never change entire code ..........');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// AWS Lambda setup
const awsServerlessExpress = require('aws-serverless-express');
const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  awsServerlessExpress.proxy(server, event, context);
};
