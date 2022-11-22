import React from "react";
import axios from 'axios';
import { app } from "../config";
import { createStaffModel } from "../model/dashboard/create_staff_model";



class DashboarService {
    
    createStaff = async (staff: createStaffModel) => {
        return await axios
            .post(app.api_endpoint + 'staff/createStaff', {
                name: staff.names,
                position: staff.positions,
                office: staff.office,
                salary: staff.salary,
            })
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                return error.response.data;
            });
    };
    getStaff = async (name: String, position: String) => {
        var defaults = "";
        
        if (name) {
            defaults = "?name=" + name
        }
        if (position) {
            defaults = "?position=" + position
        }
        if (name && position) {
            defaults = "?name=" + name + "&position=" + position
        }
        return await axios
            .get(app.api_endpoint + 'staff/getListStaff' + defaults)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                return error.response.data;
            });
    };
}


export default new DashboarService();