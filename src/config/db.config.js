require('dotenv').config();

module.exports = {
    HOST: 'localhost',
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DB: 'testdb',
    dialect: 'postgres'
};
