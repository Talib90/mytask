const UserService = require("../services/UserService");

module.exports = {
  createUser: async (req, res) => {
    try {
      var users = await UserService.createUsers(req, res);
      return res.status(200).json({
        status: 200,
        message: "Succesfully Create Users",
        data: users,
      });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },

  getUser: async (req, res) => {
    try {
      var users = await UserService.getUsers(req, res);
      return res.status(200).json({
        status: 200,
        message: "Succesfully Retrieved User",
        data: users,
      });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },

  getListUser: async (req, res) => {
    try {
      var users = await UserService.getListUsers(req, res);
      return res.status(200).json({
        status: 200,
        message: "Succesfully Retrieved User",
        data: users,
      });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
};
