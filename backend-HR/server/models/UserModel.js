module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      autoIncrement: true,
      type: Sequelize.BIGINT,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    fullname: {
      type: Sequelize.STRING,
    },
    amount: {
      type: Sequelize.FLOAT,
    },
    refid: {
      type: Sequelize.STRING,
    },
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  });

  return User;
};
