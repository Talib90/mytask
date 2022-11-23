const Pool = require("pg").Pool;



module.exports = {
  HOST: "127.0.0.1",
  USER: "postgres",
  PASSWORD: "root",
  DB: "human_resource",
  PORT: 5432,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

