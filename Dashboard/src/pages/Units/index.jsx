import { useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa"
import { toast } from "react-toastify";
import ModalAlert from "../../components/common/ModalAlert";
import Pagination from "../../components/common/Pagination";
import { axiosInstance } from "../../utils/axiosInstant";


const UnitsManagement = () => {
    const [listUnits, setListUnits] = useState([]);
    const [statusModal, setStatusModal] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [unitName, setUnitName] = useState('');
    const [currentUnit, setCurrentUnit] = useState({})
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const size = 6;


    const getListUnits = () => {
        axiosInstance
            .get(`/unit/find-all?isDeleted=false`, {
                params: {
                    size: size,
                    page: currentPage - 1,
                }
            })
            .then(res => {
                const data = res.data;
                setListUnits(data)
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

    const handleCreateOrUpdateProduct = () => {
        if ((unitName || '').trim() === '') {
            toast.warn("Vui lòng điền tên đơn vị tính");
            return;
        }

        if (!statusModal) {
            const data = {
                unitName: unitName
            }
            axiosInstance
                .post(`/unit/create`, data)
                .then(res => {
                    toast.success("Thêm đơn vị tính thành công")
                    handleCloseModalCreate();
                    getListUnits();
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
        } else {
            const data = {
                unitName: unitName
            }
            axiosInstance
                .put(`/unit/${currentUnit?.code}/update`, data)
                .then(res => {
                    toast.success("Cập nhật đơn vị tính thành công")
                    handleCloseModalCreate();
                    getListUnits();
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
    }

    const handleSubmitDelete = () => {
        axiosInstance
            .delete(`/unit/${currentUnit?.code}/delete`)
            .then(res => {
                toast.success(`Xoá đơn vị tính ${currentUnit?.name} thành công!`);
                setIsOpenDelete(false);
                setCurrentUnit({});
                getListUnits();
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

    const handleCloseDelete = () => {
        setIsOpenDelete(false);
        setCurrentUnit('');
    }

    const handleOpenDelete = (unit) => {
        setIsOpenDelete(true);
        setCurrentUnit(unit);
    }

    const handleCloseModalCreate = () => {
        setIsOpenModal(false);
        setUnitName('');
    }

    const handleOpenModalEdit = (unit) => {
        setIsOpenModal(true);
        setStatusModal(true);
        setCurrentUnit(unit);
        setUnitName(unit?.name);
    }

    const handleOpenModalCreate = () => {
        setStatusModal(false);
        setIsOpenModal(true);
    }

    const handleChangeUnitName = (value) => {
        if (value?.length <= 50) {
            setUnitName(value)
        }
    }

    useEffect(() => {
        getListUnits();
    }, [currentPage])

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                <caption >
                    <div className="flex flex-col gap-2 ">
                        <div className="flex items-center justify-between px-2 py-2 text-lg font-semibold text-left text-gray-900 bg-white rtl:text-right dark:text-white dark:bg-gray-800">
                            <div className="flex flex-col">
                                Danh sách đơn vị tính
                                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Thông tin đơn vị tính thiết bị điện</p>
                            </div>
                            <button className="flex items-center w-[15%] h-10 gap-2 px-4 py-2 text-base text-white bg-blue-500 outline-none" onClick={() => handleOpenModalCreate()}>
                                <FaPlus />
                                Thêm đơn vị tính
                            </button>
                        </div>
                    </div>
                </caption>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Code
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Đơn vị tính
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Hành động
                        </th>
                        <th scope="col" className="px-6 py-3">
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {listUnits?.content?.map((item, index) => {
                        return (
                            <tr key={index} className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item?.code}
                                </th>
                                <th scope="row" className="flex justify-start px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item?.name}
                                </th>
                                <td className="px-6 py-4 ">
                                    <a className="mr-4 font-medium text-blue-600 cursor-pointer dark:text-blue-500 hover:underline" onClick={() => handleOpenModalEdit(item)}>Chỉnh sửa</a>
                                </td>
                                <td className="px-6 py-4 ">
                                    <a className="font-medium cursor-pointer text-red dark:text-blue-500 hover:underline" onClick={() => handleOpenDelete(item)}>Xoá</a>
                                </td>
                            </tr>
                        )
                    })}
                    {listUnits?.content?.length === 0 &&
                        <tr className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Không có thông tin đơn vị tính tương ứng
                            </th>
                            <td className="px-6 py-4">
                            </td>
                            <td className="px-6 py-4">
                            </td>
                        </tr>
                    }

                </tbody>
            </table>
            <div className="pl-3 pr-3">
            {listUnits?.content?.length !== 0 && <Pagination
                totalPages={listUnits?.totalElements}
                size={size}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                content={'đơn vị tính'}
            />}
            </div>
            {isOpenModal && <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 animate-fadeIn">
                <div className="relative z-50 w-full max-w-2xl max-h-screen overflow-y-auto bg-white rounded-lg shadow-lg">
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-t md:p-5 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {!statusModal ? 'Thêm đơn vị tính mới' : 'Chỉnh sửa đơn vị tính'}
                        </h3>
                        <button type="button" onClick={handleCloseModalCreate} className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5 ">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="col-span-2 ">
                                <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên đơn vị tính</label>
                                <input type="text" value={unitName} onChange={(e) => handleChangeUnitName(e.target.value)} name="fullName" id="fullName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nhập tên thiết bị" required="" />
                            </div>
                        </div>
                        <button onClick={handleCreateOrUpdateProduct} type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-6">
                            <svg className="w-5 h-5 me-1 -ms-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                            {!statusModal ? 'Thêm đơn vị tính' : "Lưu"}
                        </button>
                    </div>
                </div>
            </div >}
            {isOpenDelete && (
                <ModalAlert
                    handleClose={handleCloseDelete}
                    handleDelete={handleSubmitDelete}
                    name={currentUnit?.name}
                />
            )}
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

export default UnitsManagement