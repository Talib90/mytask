import React, { Component, useState } from 'react';
import styles from "../../style";
import { Provider } from 'react-redux';
import AuthService from '../../services/auth';
import { LoginModel } from '../../model/auth/login_model';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'


const initialStates = {
    username: "",
    password: ""
}

const Login = () => {
    const [formValue, setFormValue] = useState(initialStates);
    const navigate = useNavigate()
    const { username, password } = formValue;
    const handleChange = (e: any) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value })
    };
    const handleLogin = async () => {

        if (username && password) {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn bg-primary',
                },
                buttonsStyling: false
            })
            const res = await AuthService.login({ username, password });
            if (res.status == 200) {
                swalWithBootstrapButtons.fire({
                    title: 'Successful Login',
                    text: 'Do you want to continue',
                    icon: 'success',
                    confirmButtonText: 'Okey'
                }).then((result) => {
                    if (result.isConfirmed) {
                        localStorage.setItem("fullname", res.data.fullname);
                        localStorage.setItem("is_login", JSON.stringify(true));
                        navigate('/dashboard');
                    }
                })
            } else {
                swalWithBootstrapButtons.fire({
                    title: 'Failed Login',
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
                                <div className="rounded-t mb-0 px-6 py-6">
                                    <img src="src/assets/images/HRM-Logo-FINAL.png" />
                                </div>
                                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                    <form>
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Email / Username
                                            </label>
                                            <input
                                                type="text"
                                                name="username"
                                                value={username}
                                                onChange={handleChange}
                                                className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                                placeholder="Email / Username"
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

                                        <div className="text-center mt-6">
                                            <button
                                                className="bg-primary text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                                                type="button"
                                                style={{ transition: "all .15s ease" }}

                                                onClick={() => handleLogin()}
                                            >
                                                Sign In
                                            </button>
                                            <ToastContainer />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </>)
}
export default Login;