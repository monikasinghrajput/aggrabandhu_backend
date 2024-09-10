const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
// const serverless = require('serverless-http');  /// server less module installed 

const sequelize = require('./config/db');
const bodyParser = require('body-parser');
const fileUpload=require('express-fileupload');
const { exec } = require('child_process');
const path = require('path');
dotenv.config();


const app = express();


const port = process.env.PORT || 9000;

// Importing routes
const BirthToday=require('./api/todayBirthday/todayBirthRoutes');
const Donation_Receives_Route=require('./api/DonationManagement/DonationReceive/Donation_Routes');
const DonationRoute=require('./api/DonationManagement/Donations/Donation_Routes');
const GalleryRoute=require('./api/gallery/GalleryRoutes');
const MemberRoute=require('./api/Members/member-route');
const StateRoute=require('./api/StateManagement/stateRoute');
const FileRoute=require('./api/GetFileData/FileRoute');
const NewsRoute=require('./api/News/newsRoutes');
const GotraRoute=require('./api/Gotra/GotraRoute');
const authRoutes = require('./api/userProfile/auth-routes');
const DistrictRoute=require('./api/DistrictManagement/DistrictRoute');
const ValidateIMageRoute=require('./api/ImageValidation/ValidationImage');
const RoleManagementRoute=require('./api/Rolemanagement/roleManageRoute');
const mail=require('./config/nodemailer/nodemailer');
// mail.sendEmail('gamerronak9@gmail.com','hello','teting for setup')
const logger=require('./config/logger');
const NotificationRoute=require('./api/NotificationManagement/notificationRoute');



// Middleware
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));




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




sequelize.sync({alter:true})
.then(() => {
  console.log('Database synced successfully.');
})
.catch(err => {
  console.error('Error syncing database:', err);
  logger.error('error :',err.message);
});






  
// Routes middleware 
app.use('/api/auth', authRoutes);// working  
app.use('/api/member',MemberRoute);  //working  2 time removing fileFolder deleting and check image 
app.use('/api/donationreceive',Donation_Receives_Route); // it properlly working 
app.use('/api/district',DistrictRoute);//working
app.use('/api/donation',DonationRoute);//working   
app.use('/api/gallery',GalleryRoute); //working  using normal
app.use('/api/state',StateRoute);//working
app.use('/api/gotra',GotraRoute);//working
app.use('/api/news',NewsRoute);//working    
app.use('/api/file',FileRoute);//working    For Get File 
app.use('/api/validate-image',ValidateIMageRoute);//working   For Check Image and fields values 
app.use('/api/role',RoleManagementRoute);/// working with authentication 
app.use('/api/birth',BirthToday); // working   Today birthday 
app.use('/api/notification',NotificationRoute); // checking 



app.get('/', (req, res) => {
  res.send('please dont change entire code  ');
});


 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});







// Starting the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



// Export the handler for AWS Lambda
const awsServerlessExpress=require('aws-serverless-express');

const server = awsServerlessExpress.createServer(app);
exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
