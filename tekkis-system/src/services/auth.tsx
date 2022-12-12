import React from "react";
import axios from 'axios';
import Alert from "react-native-awesome-alerts";
import { app } from "../config";
import { LoginModel } from "../model/auth/login_model";
import { RegisterModel } from "../model/auth/register_model";
import { MakePaymentModel } from "../model/auth/make_payment_model";



class AuthService {
  login = async (auth: LoginModel) => {
    return await axios
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
  register = async (auth: RegisterModel) => {
    return await axios
      .post(app.api_endpoint + 'user/createUser', {
        username: auth.username,
        password: auth.password,
        fullname: auth.fullname,
        email: auth.email,
        refid: auth.refid,
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error.response.data;
      });
  };

  makePayment = async (auth: MakePaymentModel) => {
    return await axios
      .post(app.api_endpoint + 'payment/makePayment', {
        paymentName: auth.paymentName,
        paymentEmail: auth.paymentEmail,
        paymentPhone: auth.paymentPhone,
        paymentDesc: auth.paymentDesc,
        paymentAmount: auth.paymentAmount,
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