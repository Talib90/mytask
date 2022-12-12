import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import "@fortawesome/fontawesome-free/css/all.min.css";
import BarChart from './components/barchart';
import LineChart from './components/linechart';
import DashboarService from '../../services/dashboard'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';


const initialStates = {
  name: "",
  position: ""
}

const initialStatesStaff = {
  names: "",
  positions: "",
  office: "",
  salary: ""
}

function Dashboard() {
  const [showModal, setShowModal] = React.useState(false);
  const [staff, setStaffs] = useState([]);
  const [users, setUsers] = useState([]);
  const [formValue, setFormValue] = useState(initialStates);
  const { name, position } = formValue;
  const handleChange = (e: any) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value })
  };

  const navigate = useNavigate();
  const [formStaffValue, setFormStaffValue] = useState(initialStatesStaff);
  const { names, positions, office, salary } = formStaffValue;
  const handleStaffChange = (e: any) => {
    setFormStaffValue({ ...formStaffValue, [e.target.name]: e.target.value })
  };

  const amount = localStorage.getItem('amount');

  const options = [
    {
      label: "",
      value: "",
    },
    {
      label: "Waiter",
      value: "Waiter",
    },
    {
      label: "Paramedic",
      value: "Paramedic",
    },
    {
      label: "Train conductor",
      value: "Train conductor",
    },
    {
      label: "Software Engineer",
      value: "Software Engineer",
    },
  ];
  useEffect(() => {
 if(!localStorage.getItem('is_login')){
  return navigate('/');
 }
 
 getStaff();
 getUserList();
  }, []);
  const getStaff = async () => {
    const res = await DashboarService.getStaff(name, position);
    setStaffs(res.data);
  }
  const getUserList = async () => {
    const res = await DashboarService.getUserList();
    setUsers(res.data);
  }
  const addStaff = async () => {
    if (names && positions && office && salary) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn bg-primary',
        },
        buttonsStyling: false
      })
      const res = await DashboarService.createStaff({ names, positions, office, salary });
      if (res.status == 200) {
        swalWithBootstrapButtons.fire({
          title: 'Successful Add Staff',
          text: 'Do you want to continue',
          icon: 'success',
          confirmButtonText: 'Okey'
        }).then((result) => {
          if (result.isConfirmed) {
            setShowModal(false);
            getStaff();
          }
        })
      } else {
        swalWithBootstrapButtons.fire({
          title: 'Failed Add Staff',
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
  return <>
    <div className="relative bg-blueGray-100">
      <Navbar />
      {/* Header */}
      <div className="relative bg-gray-900 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 xl:w-3/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                          Wallet Amount
                        </h5>
                        <span className="font-semibold text-xl text-blueGray-700">
                          RM {amount}
                        </span>
                      </div>
                      <div className="relative w-auto pl-4 flex-initial">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                          <i className="far fa-chart-bar"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                          All Users
                        </h5>
                        <span className="font-semibold text-xl text-blueGray-700">
                        {users.length}
                        </span>
                      </div>
                      <div className="relative w-auto pl-4 flex-initial">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500">
                          <i className="fas fa-chart-pie"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                          Total Staff
                        </h5>
                        <span className="font-semibold text-xl text-blueGray-700">
                          {staff.length}
                        </span>
                      </div>
                      <div className="relative w-auto pl-4 flex-initial">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-pink-500">
                          <i className="fas fa-users"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 md:px-10 mx-auto w-full -m-24">
        <div className="flex flex-wrap">
{/* 
          <BarChart />
          <LineChart /> */}
        </div>
        <div className="flex flex-wrap mt-4">
          <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-base text-blueGray-700">
                      List Users
                    </h3>
                  </div>
                </div>
              </div>
              <div className="block w-full overflow-x-auto">
                {/* Projects table */}
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Name
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Email
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Amount
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Ref_id
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((users, index) => (
                      <tr key={users['id']}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">{users['fullname']}</th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{users['email']}</td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">RM {users['amount']}</td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{users['refid']}</td>
                      </tr>
                    ))}

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap mt-4">
          <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-base text-blueGray-700">
                      List Staff
                    </h3>
                  </div>
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                    <button
                      className="bg-primary text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                      onClick={() => setShowModal(true)}
                    >
                      Add Staff
                    </button>
                    <ToastContainer />
                  </div>
                </div>
              </div>
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <div className="relative flex w-full flex-wrap items-stretch">
                      <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                        <i className="fas fa-search"></i>
                      </span>
                      <input type="text" placeholder="Search name here..." name="name" onChange={handleChange}
                        value={name} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10" />
                    </div>
                    <div className='h-1'></div>
                    <div className="relative flex w-full flex-wrap items-stretch">
                      <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                        <i className="fas fa-search"></i>
                      </span>
                      <select
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
                        name="position"
                        value={position}
                        onChange={handleChange}
                      >
                        {options.map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}

                      </select> </div>
                    <div className='h-5'></div>
                    <button
                      className="bg-primary text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                      onClick={() => getStaff()}
                    >
                      Filter
                    </button>
                  </div>
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  </div>
                </div>
              </div>
              <div className="block w-full overflow-x-auto">
                {/* Projects table */}
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Name
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Position
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Office
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Salary
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {staff.map((staff, index) => (
                      <tr key={staff['id']}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">{staff['name']}</th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{staff['position']}</td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{staff['office']}</td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">RM {staff['salary']}</td>
                      </tr>
                    ))}

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {showModal ? (
      <>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative w-auto my-6 mx-auto max-w-xs">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">
                  Add Staff
                </h3>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <div className="flex-auto">
                  <form>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Name Staff
                      </label>
                      <input
                        type="text"
                        name="names"
                        value={names}
                        onChange={handleStaffChange}
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Name Staff"
                        style={{ transition: "all .15s ease" }}
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Position Staff
                      </label>
                      <select
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
                        name="positions"
                        value={positions}
                        onChange={handleStaffChange}
                      >
                        {options.map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}

                      </select>
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Office Staff
                      </label>
                      <input
                        type="text"
                        name="office"
                        value={office}
                        onChange={handleStaffChange}
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Office Staff"
                        style={{ transition: "all .15s ease" }}
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Salary Staff
                      </label>
                      <input
                        type="text"
                        name="salary"
                        value={salary}
                        onChange={handleStaffChange}
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Name Staff"
                        style={{ transition: "all .15s ease" }}
                      />
                    </div>
                  </form>
                </div>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="bg-primary text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => addStaff()}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    ) : null}

  </>
}
export default Dashboard;