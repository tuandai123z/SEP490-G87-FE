import { useEffect, useRef, useState } from "react";
import { FaLock, FaPlus, FaUserCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import validator from "validator";
import Pagination from "../../components/common/Pagination";
import { axiosInstance } from "../../utils/axiosInstant";
import { WRONG_FORMAT_PHONE } from "../../utils/constants";


const StaffManagement = () => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(false)
    const [listStaff, setListStaff] = useState([]);
    const [listRole, setListRole] = useState([]);
    const [employeeCode, setEmployeeCode] = useState('')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [roleAccount, setRoleAccount] = useState('-1');
    const [currentStaff, setCurrentStaff] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [statusModal, setStatusModal] = useState(false)
    const [isOpenBlock, setIsOpenBlock] = useState(false);
    const [statusBlock, setStatusBlock] = useState(false);
    const [isBlockFilter, setIsBlockFilter] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const size = 6;

    const getListStaff = async () => {
        await axiosInstance
            .get(`/employees`, {
                params: {
                    size: size,
                    page: currentPage - 1,
                    isBlock: isBlockFilter,
                }
            })
            .then(res => {
                const data = res.data;
                setListStaff(data);
                setIsLoading(true);
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
                setIsLoading(false);
            });
        setIsLoading(false);
    }

    const getListRole = async () => {
        await axiosInstance
            .get('/roles/find-all')
            .then(res => {
                const data = res.data;
                setListRole(data);
                setIsLoading(true);
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
                setIsLoading(false);
            });
        setIsLoading(false);
    }

    const resetDataForm = () => {
        setFullname('');
        setUsername('');
        setPassword('');
        setPhoneNumber('');
        setRoleAccount('-1');
    }

    useEffect(() => {
        if (ref.current === true) return;
        ref.current = true;
        getListRole();
        getListStaff();
        resetDataForm();
    }, [])

    const handleOpenModalAdd = () => {
        setStatusModal(false);
        setIsOpen(true);
    }

    const handleOpenModalEdit = (staff) => {
        setStatusModal(true);
        setCurrentStaff(staff);
        setIsOpen(true);
    }

    useEffect(() => {
        setEmployeeCode(currentStaff?.code)
        setFullname(currentStaff?.name);
        setRoleAccount(currentStaff?.roleCode);
        setPhoneNumber(currentStaff?.phoneNumber);
        setUsername(currentStaff?.username);
    }, [currentStaff])

    const handleCloseModal = () => {
        setIsOpen(false);
        setCurrentStaff(undefined)
        setEmployeeCode('')
    }

    const handleChangePhone = (value) => {
        if (!isNaN(value) && value.length <= 10) {
            setPhoneNumber(value);
        }
    }

    const handleCreateEmployee = () => {
        if (!statusModal) {
            if ((username || '').trim() === '' || (password || '').trim() === '' || roleAccount === '-1' || phoneNumber === '' || (fullname || '').trim() === '') {
                toast.warn('Vui lòng điền đầy đủ thông tin!!')
                return;
            }
            if (roleAccount === undefined) {
                toast.warn("Vui lòng chọn chức vụ!")
                return
            }

            if (!validator.isMobilePhone(phoneNumber, 'vi-VN')) {
                toast.warn(WRONG_FORMAT_PHONE)
                return
            }

            if (password?.trim().length <= 6) {
                toast.warn("Mật khẩu phải dài hơn 6 ký tự");
                return;
            }

            const employeeCreate = {
                username,
                password,
                roleCode: roleAccount,
                phoneNumber,
                name: fullname,
                inventoryCode: null
            }

            axiosInstance
                .post('/authenticated/register', employeeCreate)
                .then(res => {
                    getListStaff();
                    setIsOpen(false);
                    setIsLoading(true);
                    resetDataForm();
                    toast.success("Tạo nhân viên mới thành công!")
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
                    setIsLoading(false);
                });
        } else {
            if (fullname.trim() === '') {
                toast.warn('Tên nhân viên không được để trống');
                return
            }
            if (!validator.isMobilePhone(phoneNumber, 'vi-VN')) {
                toast.warn("Số điện thoại không đúng định dạng!!")
                return
            }

            const employeeUpdate = {
                name: fullname,
                phoneNumber,
                roleCode: roleAccount
            }


            axiosInstance
                .put(`/employees/${employeeCode}`, employeeUpdate)
                .then(res => {
                    toast.success(`Chỉnh sửa thông tin nhân viên ${currentStaff?.username} thành công`)
                    setCurrentStaff(undefined);
                    handleCloseModal();
                    getListStaff();
                    resetDataForm();
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
        setIsLoading(false);

    }

    const handleOpenUserBlock = (user) => {
        setEmployeeCode(user?.code)
        setIsOpenBlock(true);
        setStatusBlock(user?.isBlock);
    }

    const handleConfirmBlockUser = () => {
        axiosInstance
            .get(`/employees/${employeeCode}/${statusBlock ? 'unlock' : 'lock'}`)
            .then(res => {
                toast.success(`${statusBlock ? "Mở khoá" : "Khoá"} tài khoản thành công`);
                setIsOpenBlock(false);
                setEmployeeCode('');
                getListStaff();
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

    useEffect(() => {
        getListStaff();
    }, [isBlockFilter, currentPage])

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (isOpenBlock) handleConfirmBlockUser();
            if (isOpen) handleCreateEmployee();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                    <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white rtl:text-right dark:text-white dark:bg-gray-800">
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                Danh sách nhân viên
                                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Danh sách nhân viên của công ty.</p>
                            </div>
                            <div className="flex items-center justify-center gap-4">
                                <div className="col-span-2">
                                    <select id="jobRank" onChange={(e) => setIsBlockFilter(e.target.value)} value={isBlockFilter} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        <option value={false}>Không khoá</option>
                                        <option value={true}>Bị khoá</option>
                                    </select>
                                </div>
                                <button className="flex items-center gap-1 px-4 py-2 text-base text-white bg-blue-500 outline-none" onClick={handleOpenModalAdd}>
                                    <FaPlus className="mr-1" />
                                    Thêm nhân viên
                                </button>
                            </div>
                        </div>
                    </caption>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Tên nhân viên
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tài khoản
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Vị trí
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Trạng thái
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listStaff && listStaff?.content?.map((staff, index) => {
                            return (
                                <tr className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700" key={index}>
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {staff?.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {staff?.username}
                                    </td>
                                    <td className="px-6 py-4">
                                        {staff?.roleCode}
                                    </td>
                                    <td className="flex items-center px-6 py-4 cursor-pointer ">
                                        <p onClick={() => handleOpenUserBlock(staff)}>{!staff?.isBlock ? <FaUserCheck className="text-lg transition-all duration-100 text-green hover:text-gray-600" /> : <FaLock className="text-lg transition-all duration-100 text-red hover:text-rose-600" />
                                        }</p>
                                    </td>
                                    <td className="px-6 py-4 ">
                                        <a onClick={() => handleOpenModalEdit(staff)} className="font-medium text-blue-600 cursor-pointer dark:text-blue-500 hover:underline">Edit</a>
                                    </td>
                                </tr>)
                        })}
                        {
                            listStaff && listStaff?.content?.length == 0 && (
                                <tr className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700" >
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Không có thông tin nhân viên tương ướng
                                    </td>
                                    <td className="px-6 py-4">
                                    </td>
                                    <td className="px-6 py-4">
                                    </td>
                                    <td className="flex items-center px-6 py-4 cursor-pointer ">

                                    </td>
                                    <td className="px-6 py-4 ">
                                    </td>
                                </tr>
                            )

                        }

                    </tbody>
                </table>
                <Pagination
                    totalPages={listStaff?.totalElements}
                    size={size}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    content={'nhân viên'}
                />
            </div>

            {isOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 animate-fadeIn">
                <div className="relative z-50 w-full max-w-2xl max-h-screen overflow-y-auto bg-white rounded-lg shadow-lg">
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-t md:p-5 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {statusModal ? 'Chỉnh sửa thông tin nhân viên' : 'Thêm nhân viên mới'}
                        </h3>
                        <button type="button" onClick={handleCloseModal} className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* <form className="p-4 md:p-5 "> */}
                    <div className="grid grid-cols-2 gap-4 p-4 mb-4 md:p-5">
                        <div className={`col-span-2 ${currentStaff ?? "sm:col-span-1"}`}>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên đăng nhập</label>
                            <input type="text" name="username" disabled={currentStaff} value={username} onChange={(e) => setUsername(e.target.value)} id="username" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 `} placeholder="Nhập tên đăng nhập" required="" />
                        </div>
                        {!statusModal &&
                            (<div className="col-span-2 sm:col-span-1">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Mật khẩu" required="" />
                            </div>)}
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
                            <select id="jobRank" onChange={(e) => setRoleAccount(e.target.value)} value={roleAccount} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option value={'-1'}>---Chọn chức vụ------</option>
                                {listRole?.map((role, index) => {
                                    return <option value={role?.code} key={index}>{role?.name}</option>
                                })}
                            </select>
                        </div>
                        <button type="submit" onClick={handleCreateEmployee} className="text-white inline-flex w-[70%] items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-6">
                            <svg className="w-5 h-5 me-1 -ms-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                            {employeeCode ? 'Xác nhận' : 'Thêm nhân viên'}
                        </button>
                    </div>
                    {/* </form> */}
                </div>
            </div >}
            {isOpenBlock && <div id="popup-delete" className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 animate-fadeIn">
                <div className="relative w-full max-w-md pt-4 bg-white rounded-lg shadow dark:bg-gray-700 animate-slideIn">
                    <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                        <button type="button" onClick={() => setIsOpenBlock(false)} className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-4 text-center md:p-5">
                            <svg className={`w-12 h-12 mx-auto mb-4  dark:text-gray-200 ${statusBlock ? 'text-green' : "text-red"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Bạn muốn {statusBlock ? "Mở khoá" : "Khoá"} nhân viên này</h3>
                            <button onClick={handleConfirmBlockUser} data-modal-hide="popup-modal" type="button" className="text-white bg-blue-500 bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                Chắc chắn
                            </button>
                            <button data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Huỷ bỏ</button>
                        </div>
                    </div>
                </div>

            </div>}
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

export default StaffManagement
