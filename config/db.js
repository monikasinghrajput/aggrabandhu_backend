const { Sequelize } = require('sequelize');
const mysql = require('mysql2');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();
const DB_NAME=process.env.DB_NAME || "aggrabandhuss";
const DB_USER=process.env.DB_USER|| "root";
const DB_PASSWORD=process.env.DB_PASSWORD||'';

const sequelize = new Sequelize(DB_NAME,DB_USER,DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  dialectOptions: {
    // options: {
    //   encrypt: true,
    // },
  },
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize; // Export the sequelize instance directly