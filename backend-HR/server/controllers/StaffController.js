const StaffService = require("../services/StaffService");

module.exports = {
    createStaff: async (req, res) => {
        try {
            var staff = await StaffService.createStaff(req, res);
            return res.status(200).json({
                status: 200,
                message: "Succesfully Create Staff",
                data: staff,
            });
        } catch (e) {
            return res.status(400).json({ status: 400, message: e.message });
        }
    },
    getStaff: async (req, res) => {
        try {
            var staff = await StaffService.getStaff(req, res);
            return res.status(200).json({
                status: 200,
                message: "Succesfully List Staff",
                data: staff,
            });
        } catch (e) {
            return res.status(400).json({ status: 400, message: e.message });
        }
    },
};
