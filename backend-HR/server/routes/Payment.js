const express = require("express");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const controller = require("../controllers/PaymentController");

router.post("/makePayment", (req, res) => {
    controller.makePayment(req, res);
});

module.exports = router;
