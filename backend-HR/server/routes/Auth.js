const express = require("express");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const controller = require("../controllers/AuthController");

router.post("/Login", (req, res) => {
  controller.login(req, res);
});

router.get("/Logout", (req, res) => {
  controller.logout(req, res);
});

module.exports = router;
