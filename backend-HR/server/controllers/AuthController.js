const AuthService = require("../services/AuthService");

module.exports = {
  login: async (req, res) => {
    try {
      var users = await AuthService.login(req, res);
      return res.status(200).json({
        status: 200,
        message: "Succesfully Login",
        data: users,
      });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
};
