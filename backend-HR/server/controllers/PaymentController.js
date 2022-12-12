const PaymentService = require("../services/PaymentService");

module.exports = {
    makePayment: async (req, res) => {
        try {
            var payment = await PaymentService.makePayment(req, res);
            return res.status(200).json({
                status: 200,
                message: "Succesfully Create payment",
                data: payment,
            });
        } catch (e) {
            return res.status(400).json({ status: 400, message: e.message });
        }
    },
};
