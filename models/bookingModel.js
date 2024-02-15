// models/bookingModel.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database')

// Define the Booking model
const Booking = sequelize.define('Booking', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Sync the model with the database
sequelize.sync();

// Export the Booking model
module.exports = Booking;
