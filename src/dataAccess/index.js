const { HOST, USER, PASSWORD, DB, dialect } = require('../config/db.config.js');
const { Sequelize } = require('sequelize');
const getUserModel = require('../models/users.model.js');

const sequelize = new Sequelize(
    `${dialect}://${USER}:${PASSWORD}@${HOST}:5432/${DB}`
);

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
testConnection();

module.exports = {
    sequelize,
    Sequelize,
    users: getUserModel(sequelize, Sequelize)
};
