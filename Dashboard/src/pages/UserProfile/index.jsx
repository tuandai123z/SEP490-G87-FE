import { FaHome } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { axiosInstance } from "../../utils/axiosInstant";
import { toast } from 'react-toastify';
import './styles.scss'
import { useSelector } from 'react-redux';
import validator from "validator";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {

    const [userDetail, setUserDetail] = useState();
    const dataUser = useSelector(state => state.user);
    const [isOpen, setIsOpen] = useState(false);
    const [employeeCode, setEmployeeCode] = useState('');
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [role, setRole] = useState('')
    const navigate = useNavigate();

    const getDataUser = () => {
        axiosInstance
            .get(`/employees/${dataUser?.employee_code}`)
            .then(res => {
                const data = res.data;
                setUserDetail(data);
            })
            .catch((err) => {
                if (err.response) {
                    const errorRes = err.response.data;
                    toast.error(errorRes.message);
                } else if (err.request) {
                    toast.error(err.request);
                } else {
                    toast.error(err.message);
                }
            });
    }

    const handleCloseModal = () => {
        setIsOpen(false);
    }

    const handleOpenModal = () => {
        setIsOpen(true);
    }

    const handleChangePhone = (value) => {
        if (!isNaN(value) && value.length <= 10) {
            setPhoneNumber(value);
        }
    }

    useEffect(() => {
        if (dataUser) {
            getDataUser();
        }
    }, [])

    useEffect(() => {
        setFullname(userDetail?.name);
        setUsername(userDetail?.username);
        setPhoneNumber(userDetail?.phoneNumber);
        setEmployeeCode(userDetail?.code);
        setRole(userDetail?.roleCode);
    }, [userDetail])

    const handleConfirmUpdate = () => {
        if (fullname.trim() === '') {
            toast.warn("Vui lòng điền đầy đủ thông tin");
            return
        }

        if (!validator.isMobilePhone(phoneNumber, 'vi-VN')) {
            toast.warn("Số điện thoại không đúng định dạng!!")
            return
        }

        const employeeUpdate = {
            name: fullname,
            phoneNumber,
            roleCode: role
        }


        axiosInstance
            .put(`/employees/${employeeCode}`, employeeUpdate)
            .then(res => {
                toast.success(`Chỉnh sửa thông tin cá nhân thành công`)
                setIsOpen(false);
                getDataUser();
            })
            .catch(err => {
                if (err.response) {
                    const errorRes = err.response.data;
                    toast.error(errorRes.message);
                } else if (err.request) {
                    toast.error(err.request);
                } else {
                    toast.error(err.message);
                }
            })


    }


    return (
        <div className="profilePage">
            <div className="cardProfile">
                <div className="card-inner">
                    <div className="front">
                        <h2>{userDetail?.name}</h2>
                        <p>{userDetail?.phoneNumber}</p>
                        <button>hover me</button>
                    </div>
                    <div className="relative flex flex-col max-w-full gap-2 back">
                        <div className="pb-4 topBack" >
                            <span className="homeIcon" onClick={() => navigate('/admin/dashboard')}>
                                {/* <HomeIcon /> */}
                                <FaHome />
                            </span>
                            <img
                                onClick={handleOpenModal}
                                className="avatarProfile"
                                src={`https://cdn1.iconfinder.com/data/icons/avatar-3/512/Manager-512.png`}
                            />
                        </div>
                        <h1>
                            {userDetail?.name}
                        </h1>
                        <p>
                            <span>Tên tài khoản: {userDetail?.username} </span>
                            <br />
                            <span>SDT: {userDetail?.phoneNumber}</span>
                            <br />
                            <span>Chức vụ: {userDetail?.roleCode}</span>
                            <br />
                        </p>

                        <div className="absolute bottom-[20px] w-full -translate-x-[50%] left-[50%]">
                            <img src="https://www.bannerhealth.com/-/media/images/project/bh/hero-images/for-employees/employees-hero.ashx" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 animate-fadeIn">
                <div className="relative z-50 w-full max-w-2xl max-h-screen overflow-y-auto bg-white rounded-lg shadow-lg">
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-t md:p-5 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Chỉnh sửa thông tin cá nhân
                        </h3>
                        <button type="button" onClick={handleCloseModal} className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 p-4 mb-4 md:p-5">
                        <div className="col-span-2 ">
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên đăng nhập</label>
                            <input type="text" name="username" disabled value={username} id="username" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 `} placeholder="Nhập tên đăng nhập" required="" />
                        </div>
                        <div className="col-span-2 ">
                            <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Họ và tên</label>
                            <input type="text" name="fullName" value={fullname} onChange={(e) => setFullname(e.target.value)} id="fullName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nhập họ và tên" required="" />
                        </div>
                        <div className="col-span-2 ">
                            <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số điện thoại</label>
                            <input type="text" name="fullName" value={phoneNumber} onChange={(e) => handleChangePhone(e.target.value)} id="fullName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nhập số điện thoại" required="" />
                        </div>

                        <div className="col-span-2">
                            <label htmlFor="jobRank" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chức vụ</label>
                            <select id="jobRank" disabled value={role} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option value={role}>{role}</option>

                            </select>
                        </div>

                        <button type="submit" onClick={handleConfirmUpdate} className="text-white inline-flex w-[50%] items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-6">
                            <svg className="w-5 h-5 me-1 -ms-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                            Xác nhận
                        </button>
                    </div>
                    {/* </form> */}
                </div>
            </div >}
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes slideIn {
                    from {
                        transform: translateY(-20%);
                    }
                    to {
                        transform: translateY(0);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-in-out;
                }

                .animate-slideIn {
                    animation: slideIn 0.3s ease-in-out;
                }
            `}</style>
        </div >
    )
}

export default UserProfile