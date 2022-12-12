const Pool = require("pg").Pool;

module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "tekkis_system",
  PORT: 3306,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};