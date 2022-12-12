import React, { Component, useState } from 'react';
import styles from "../../style";
import { Provider } from 'react-redux';
import AuthService from '../../services/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

const initialStates = {
    username: "",
    password: "",
    fullname: "",
    email: "",
    refid: ""
}

const Register = () => {
    const [formValue, setFormValue] = useState(initialStates);
    const { username, password, fullname, email, refid } = formValue;
    const handleChange = (e: any) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value })
    };
    const handleRegister = async () => {
        if (username && password && fullname && email) {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn bg-primary',
                },
                buttonsStyling: false
            })
            const res = await AuthService.register({ username, password,fullname,email,refid });
            if (res.status == 200) {
                swalWithBootstrapButtons.fire({
                    title: 'Successful Register',
                   // text: 'Do you want to continue',
                    icon: 'success',
                    confirmButtonText: 'Okey'
                }).then((result) => {
                })
            } else {
                swalWithBootstrapButtons.fire({
                    title: 'Failed Register',
                    text: res.message,
                    icon: 'error',
                    confirmButtonText: 'Okey'
                })
            }

        } else {
            toast.error('Please fill all Input field', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }
    return (<>
        <main>
            <section className="absolute w-full h-full">
                <div
                    className="absolute top-0 w-full h-full bg-gray-900"
                    style={{
                        backgroundImage:
                            "url(src/assets/images/register_bg_2.png)",
                        backgroundSize: "100%",
                        backgroundRepeat: "no-repeat"
                    }}
                ></div>
                <div className="container mx-auto px-4 h-full">
                    <div className="flex content-center items-center justify-center h-full">
                        <div className="w-full lg:w-4/12 px-4">
                            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                                <div className="rounded-t mb-0 px-6 py-6 ">
                                    <img src="https://www.tekkis.com.my/img/tekkis-logo.76627b26.png" style={{ width: "100px" }} />
                                </div>
                                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                    <form>
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                name="fullname"
                                                value={fullname}
                                                onChange={handleChange}
                                                className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                                placeholder="Full Name"
                                                style={{ transition: "all .15s ease" }}
                                            />
                                        </div>

                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Username
                                            </label>
                                            <input
                                                type="text"
                                                name="username"
                                                value={username}
                                                onChange={handleChange}
                                                className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                                placeholder="Username"
                                                style={{ transition: "all .15s ease" }}
                                            />
                                        </div>

                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Email
                                            </label>
                                            <input
                                                type="text"
                                                name="email"
                                                value={email}
                                                onChange={handleChange}
                                                className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                                placeholder="Email"
                                                style={{ transition: "all .15s ease" }}
                                            />
                                        </div>

                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                name="password"
                                                value={password}
                                                onChange={handleChange}
                                                className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                                placeholder="Password"
                                                style={{ transition: "all .15s ease" }}
                                            />
                                        </div>

                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Ref Id
                                            </label>
                                            <input
                                                type="text"
                                                name="refid"
                                                value={refid}
                                                onChange={handleChange}
                                                className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                                placeholder="Ref Id"
                                                style={{ transition: "all .15s ease" }}
                                            />
                                        </div>
                                        <div className="text-center mt-6">
                                            <button
                                                className="bg-primary text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                                                type="button"
                                                style={{ transition: "all .15s ease" }}

                                                onClick={() => handleRegister()}
                                            >
                                                Sign Up
                                            </button>
                                            <ToastContainer />
                                        </div>
                                    </form>
                                    <div className="px-3 py-3 text-center">
                                        <a href='/'>Go to Login Page</a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </>)
}

export default Register;