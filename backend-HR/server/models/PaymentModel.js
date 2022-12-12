module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("payment_details", {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        primaryKey: true,
      },
      payment_key_id: {
        type: Sequelize.STRING,
      },
      payment_ref_no: {
        type: Sequelize.STRING,
      },
      payment_invoice_no: {
        type: Sequelize.STRING,
      },
      payment_name: {
        type: Sequelize.STRING,
      },
      payment_email: {
        type: Sequelize.STRING,
      },
      payment_phone_number: {
        type: Sequelize.STRING,
      },
      payment_desc: {
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