import React from "react";
import { useNavigate } from 'react-router-dom';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

export default function Navbar() {
    const fullname = localStorage.getItem('fullname');
    const navigate = useNavigate();
    const handleLogout = async () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn bg-primary',
                cancelButton: 'btn bg-red-700'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "to logout this system !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Logout',
            cancelButtonText: 'Cancel',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("is_login");
                localStorage.removeItem("fullname");
                navigate("/")
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
            }
        })

    }
    return (
        <>
            {/* Navbar */}
            <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
                <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
                    {/* Brand */}
                    <a
                        className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                    >
                        Welcome {fullname} to
                        Dashboard
                    </a>

                    {/* User */}
                    <div className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
                        <div className="relative flex w-full flex-wrap items-stretch">
                            <button
                                className="bg-primary text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                                onClick={() => handleLogout()}
                            >
                                LogOut
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            {/* End Navbar */}
        </>
    );
}