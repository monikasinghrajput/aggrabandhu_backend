const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const DB_NAME = process.env.DB_NAME || "aggrabandhuss";
const DB_USER = process.env.DB_USER || "admin";
const DB_PASSWORD = process.env.DB_PASSWORD || 'default_password';
const DB_HOST = process.env.DB_HOST || 'mysqlforlambda.c9csawm2knmp.ap-south-1.rds.amazonaws.com';

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  logging: false, // Disable logging for production
  pool: {
    max: 10, // Adjust based on your needs
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Test the connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (err) {
    console.error('Unable to connect to the database:', err.message);
    console.error('Stack Trace:', err.stack);
    // Optionally, log to an external service or alert
  }
};

testConnection();

module.exports = sequelize; // Export the sequelize instance directly



// const { Sequelize } = require('sequelize');
// const dotenv = require('dotenv');

// // Load environment variables
// dotenv.config();

// const DB_NAME = process.env.DB_NAME || "aggrabandhuss";
// const DB_USER = process.env.DB_USER || "admin";
// const DB_PASSWORD = 'password'; // Directly set password here
// const DB_HOST = process.env.DB_HOST || 'mysqlforlambda.c9csawm2knmp.ap-south-1.rds.amazonaws.com';

// const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
//   host: DB_HOST,
//   dialect: 'mysql',
//   dialectModule: require('mysql2'),
//   logging: false, // Disable logging for production
// });

// // Test the connection
// const testConnection = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (err) {
//     console.error('Unable to connect to the database:', err.message);
//     console.error('Stack Trace:', err.stack);
//     // Optionally, log to an external service or alert
//   }
// };

// testConnection();

// module.exports = sequelize; // Export the sequelize instance directly