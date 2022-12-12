const db = require("../models");
const axios = require("axios");
const paymentTable = db.payment;

module.exports = {
    async makePayment(request, reply) {
        const { paymentName, paymentEmail, paymentPhone, paymentDesc, paymentAmount } = request.body;
        if (!paymentName) {
            throw Error("Name is required");
        }

        if (!paymentEmail) {
            throw Error("Email is required");
        }

        if (!paymentPhone) {
            throw Error("Phone is required");
        }

        if (!paymentAmount) {
            throw Error("Amount is required");
        }

        var dataPayment = {
            "merchantKey": "DGlVOMk6EXpOCGIDgzF53XP80Qr-qWSbbjI4YhJfFm6sgZRRzn3GdIb8WOUWA9hJeeRJaoK09lxsPd1NtQfj5bwYg2EyZlfgLPRC",
            "signature": "8a8b75360d5040a9715b612a4cc5f27139b197ae457d3ac80ca3d20c488fec51",
            "paymentName": paymentName,
            "paymentEmail": paymentEmail,
            "paymentPhone": paymentPhone,
            "paymentDesc": paymentDesc,
            "paymentAmount": paymentAmount,
            "paymentStatus": "pending",
            "paymentType": "Ewallet,FPX,Card",
            "paymentRefNo": "KJ-0001",
            "paymentCallbackURL": "https://webhook.site/820bf3bf-75ba-4182-a289-a01d81c9180c",
            "paymentRedirectURL": "www.facebook.com"
        }

        var base64str = Buffer.from(JSON.stringify(dataPayment)).toString('base64');
        var response;
        await axios.post("https://api.tpay.com.my/payment/GenerateTpaymentToken", { payload: base64str })
            .then(data => {
                paymentTable.create({
                    payment_key_id: data.data.response.paymentDetails.payment_key_id,
                    payment_ref_no: data.data.response.paymentDetails.payment_ref_no,
                    payment_invoice_no: data.data.response.paymentDetails.payment_invoice_no,
                    payment_name: data.data.response.paymentDetails.payment_name,
                    payment_email: data.data.response.paymentDetails.payment_email,
                    payment_phone_number: data.data.response.paymentDetails.payment_phone_number,
                    payment_desc: data.data.response.paymentDetails.payment_desc,
                });
                response = data.data.response.paymentDetails.payment_link;
            })
            .catch(err => {
                throw Error(err.response.data.msg);
            });

        return response;
    },
}