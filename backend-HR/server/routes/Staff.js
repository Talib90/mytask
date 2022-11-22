const express = require("express");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const controller = require("../controllers/StaffController");

router.post("/createStaff", (req, res) => {
    controller.createStaff(req, res);
});

router.get("/getListStaff", (req, res) => {
    controller.getStaff(req, res);
});

module.exports = router;
