const express = require("express");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const controller = require("../controllers/UserController");

router.post("/createUser", (req, res) => {
  controller.createUser(req, res);
});

router.get("/getUser", (req, res) => {
  controller.getUser(req, res);
});

router.get("/getListUser", (req, res) => {
  controller.getListUser(req, res);
});


module.exports = router;
