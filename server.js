const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const sequelize = require('./config/db');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const { exec } = require('child_process');
const path = require('path');
const awsServerlessExpress = require('aws-serverless-express');
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Importing routes
// (Same routes as in your code)
const BirthToday = require('./api/todayBirthday/todayBirthRoutes');
// Define other routes here ...

// Routes middleware
app.use('/api/auth', authRoutes);
app.use('/api/member', MemberRoute);
// Other route setups here ...

app.get('/', (req, res) => {
  res.send('Mona : warning ! never change entire code .........');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Sync database
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

// AWS Lambda Handler
if (process.env.AWS_EXECUTION_ENV) {
  const server = awsServerlessExpress.createServer(app);
  exports.handler = (event, context) => {
    awsServerlessExpress.proxy(server, event, context);
  };
} else {
  // Local Development
  const port = process.env.PORT || 9000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
