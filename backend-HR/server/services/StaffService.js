const db = require("../models");
const { validateJwt } = require("../helpers/loginCheck");
const staffTable = db.staff;
const Op = db.Sequelize.Op;
module.exports = {
    //-------------------------------------------- Create Staff ---------------------------------------------------//
    async createStaff(request, reply) {
        const { name, position, office, salary } = request.body;
        if (!name) {
            throw Error("Name is required");
        }

        if (!position) {
            throw Error("Position is required");
        }

        var countStaff = await staffTable.count({});

        var createUser = await staffTable.create({
            id: Number(countStaff + 1),
            name: name,
            position: position,
            office: office,
            salary: salary
        });

        return createUser;
    },
    //-------------------------------------------- Create Staff ---------------------------------------------------//

    //-------------------------------------------- Get Staff ---------------------------------------------------//
    async getStaff(request, reply) {
        const { name, position } = request.query;
        var whereString = {};

        if (name) {
            whereString['name'] = {
                [Op.substring]: name
            };

        }

        if (position) {
            whereString['position'] = {
                [Op.substring]: position
            };
        }


        var listStaff = await staffTable.findAll({
            where: whereString
        })
        
        return listStaff
    },
    //-------------------------------------------- Get Staff ---------------------------------------------------//
}