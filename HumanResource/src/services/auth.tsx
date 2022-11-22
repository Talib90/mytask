import React from "react";
import axios from 'axios';
import Alert from "react-native-awesome-alerts";
import { app } from "../config";
import { LoginModel } from "../model/auth/login_model";



class AuthService {
  login = async (auth: LoginModel) => {
   return  await axios
      .post(app.api_endpoint + 'auth/login', {
        username: auth.username,
        password: auth.password,
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error.response.data;
      });
  };
}


export default new AuthService();