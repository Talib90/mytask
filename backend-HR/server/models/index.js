const dbConfig = require("../config/dbconfig");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./UserModel")(sequelize, Sequelize);
db.staff = require("./StaffModel")(sequelize, Sequelize);
db.payment = require("./PaymentModel")(sequelize, Sequelize);


db.sequelize.sync();

module.exports = db;
