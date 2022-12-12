
const db = require("../models");
const { createJwt, validateJwt } = require("../helpers/loginCheck");
const userTable = db.user;
const Op = db.Sequelize.Op;
var md5 = require('md5');

module.exports = {
  //-------------------------------------------- Login ---------------------------------------------------//
  async login(request, reply) {
    const { username, password } = request.body;

    var encPass = md5(password)
    var login = await userTable.findOne({
      where: 
      {
        [Op.or] : [
          {
            username: username,
            password: encPass,
          },
          {
            email: username,
            password: encPass,
          }
        ]
      }
    });

    if (login) {
      // start create token
      var jwtAtt = {
        username: username,
      };

      var token = await createJwt(jwtAtt);
      // done create token
//console.log(token);
      var data = {
        id: login.id,
        fullname: login.fullname,
        username: login.username,
        email: login.email,
        amount: login.amount,
        token: token,
      };

      return data;
    } else {
      throw Error("Username / Email and password not match");
    }
  },
  //-------------------------------------------- Login ---------------------------------------------------//
};
