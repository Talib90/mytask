
const db = require("../models");
const { validateJwt } = require("../helpers/loginCheck");
const userTable = db.user;
const Op = db.Sequelize.Op;
var md5 = require('md5');

module.exports = {
  //-------------------------------------------- Create User ---------------------------------------------------//
  async createUsers(request, reply) {
    const { username, password, fullname, email, refid } = request.body;
    if (!username) {
      throw Error("Username is required");
    }

    if (!email) {
      throw Error("Email is required");
    }

    if (!password) {
      throw Error("Password is required");
    }



    var findUser = await userTable.findOne({
      where: {
        username: username,
      },
    });

    var findUserEmail = await userTable.findOne({
      where: {
        email: email,
      },
    });




    if (findUser) {
      throw Error("Username already exist");
    } else if (findUserEmail) {
      throw Error("Email already exist");
    } else {
      // get id number
      var encPass = md5(password)

      var createUser = await userTable.create({
        username: username,
        password: encPass,
        fullname: fullname,
        email: email,
      });
      const refId = ('REF0000' + createUser.id);
      var updateString = {};
      updateString["refid"] = refId;
      updateString["amount"] = 0;
      userTable.update(updateString, {
        where: {
          username: username,
        },
      }).catch((err) => {
        res.status(500).send({ message: err.message });
      });

      if (refid) {
        var findRefid = await userTable.findOne({
          where: {
            refid: refid,
          },
        });

        if (findRefid) {
          var updateString = {};

          updateString["amount"] = findRefid.amount + 25;
          userTable.update(updateString, {
            where: {
              refid: refid,
            },
          }).catch((err) => {
            res.status(500).send({ message: err.message });
          });

        }
      }

      return createUser;
    }
  },
  //-------------------------------------------- Create User ---------------------------------------------------//

  //-------------------------------------------- Get User ---------------------------------------------------//
  async getUsers(request, reply) {
    const { username, id } = request.query;

    var token = request.headers.authorization.replace("Bearer ", "");

    // // start create object for compare
    var jwtAtt = {
      username: username,
    };

    var validate = await validateJwt(token, jwtAtt);
    if (!validate) {
      throw Boom.badRequest("Authenticate failed. Please login");
    }

    var whereString = {}
    if (id) {
      whereString = {
        where: {
          id: id
        }
      }
    }


    var listUser = await userTable.findAll(whereString)
    return listUser
  },
  //-------------------------------------------- Get User ---------------------------------------------------//

  //-------------------------------------------- Get User List---------------------------------------------------//
  async getListUsers(request, reply) {
    var listUser = await userTable.findAll()
    return listUser
  },
  //-------------------------------------------- Get User List---------------------------------------------------//

};
