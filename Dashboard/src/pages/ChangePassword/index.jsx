import axios from "axios";
import { useEffect, useState } from "react";
import { GrUpdate } from "react-icons/gr";
import { useNavigate } from "react-router";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from "react-toastify";
import { axiosInstance } from "../../utils/axiosInstant";
import { useSelector } from "react-redux";

function ChangePassword() {

    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');
    const dataUser = useSelector(state => state.user);

    const handleSubmitChange = () => {
        if (oldPassword === '' || newPassword === '' || confirmPassword === '') {
            toast.warn("Có thông tin đang để trống")
            return
        }
        if (oldPassword?.length < 6 || newPassword?.length < 6 || confirmPassword?.length < 6) {
            toast.warn("Mật khẩu phải dài hơn hoặc bằng 6 ký tự")
            return
        }
        if (newPassword !== confirmPassword) {
            toast.warn("Xác nhận mật khẩu không trùng khớp")
            return
        }
        if (oldPassword === newPassword) {
            toast.warn("Mật khẩu mới không được trùng với mật khẩu cũ")
            return
        }
        const dataRequest = {
            oldPassword: oldPassword,
            newPassword: newPassword
        }

        axiosInstance
            .put(`/employees/update-password/${dataUser?.employee_code}`, dataRequest)
            .then(res => {
                toast.success("Đổi mật khẩu thành công")
                navigate(-1)
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


    return (
        <div className="min-w-[40]x rounded-lg bg-primary/[0.1] p-16 shadow min-h-[90vh]  mt-2 flex-row ">

            <div className="min-w-[40]x rounded-lg bg-white p-16 shadow min-h-[40vh] mt-2 relative">
                <div className="absolute flex text-gray-500 cursor-pointer top-2 left-2" onClick={() => navigate(-1)}><IoIosArrowBack className="size-6" /> <span className="font-medium">Quay lại</span></div>
                <h1 className="mb-8 text-3xl font-black">Đổi mật khẩu</h1>

                <div className="grid w-full grid-cols-2 gap-4 mb-4">
                    <div className="w-[60%]">
                        <span className="w-full font-normal">Thay đổi mật khẩu nhằm tránh việc bị rò rỉ thông tin của bạn</span>
                    </div>
                    <div className="w-[100%] bg-gray-300 p-4">
                        <div className="flex w-full py-3 border-b-2">
                            <span className="flex w-full text-base font-semibold">
                                Đổi mật khẩu
                            </span>
                        </div>

                        <div className="py-4">
                            <div className="grid grid-cols-1 gap-4 mb-4 animate-fadeIn">
                                <div className="grid grid-cols-1 gap-4 ">
                                    <div className="col-span-1">
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu cũ
                                            <span className="text-red-600">{` (*)`}</span>
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            value={oldPassword}
                                            onChange={e => setOldPassword(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                                        focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500
                                                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Mật khẩu cũ"
                                            required=""
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu mới
                                            <span className="text-red-600">{` (*)`}</span>
                                        </label>
                                        <input
                                            type="password"
                                            name="newPassword"
                                            id="newPassword"
                                            value={newPassword}
                                            onChange={e => setNewPassword(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                                        focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500
                                                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Mật khẩu mới"
                                            required=""
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Xác nhận mật khẩu
                                            <span className="text-red-600">{` (*)`}</span>
                                        </label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            id="confirmPassword"
                                            value={confirmPassword}
                                            onChange={e => setConfirmPassword(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                                        focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500
                                                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Xác nhận mật khẩu"
                                            required=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        onClick={() => handleSubmitChange()}
                        className="text-white transition ease-in-out duration-300 inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        <GrUpdate className="mr-2" />
                        Cập nhật
                    </button>
                </div>
            </div>
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
        </div>
    )
}

export default ChangePassword
