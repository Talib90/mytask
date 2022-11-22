module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("staff", {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      position: {
        type: Sequelize.STRING,
      },
      office: {
        type: Sequelize.STRING,
      },
      salary: {
        type: Sequelize.FLOAT,
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
  