import { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import ModalAlert from "../../../components/common/ModalAlert";
import Pagination from "../../../components/common/Pagination";
import { axiosInstance } from "../../../utils/axiosInstant";

const BranchManagement = () => {
    const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
    const [brandName, setBrandName] = useState('');
    const [statusModal, setStatusModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [listBranch, setListBranch] = useState();
    const [currentBranch, setCurrentBranch] = useState('');
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const size = 6;
    const inputRef = useRef(null);

    const getListBranch = () => {
        axiosInstance
            .get('/brand/find-all', {
                params: {
                    size: size,
                    page: currentPage - 1,
                }
            })
            .then(res => {
                const data = res.data
                setListBranch(data);
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
    }

    const handleOpenModalCreate = () => {
        setIsOpenModalCreate(true);
        setStatusModal(false);
        if (inputRef) {
            inputRef.current?.focus();
        }
    }

    const handleOpenModalEdit = (branch) => {
        setCurrentBranch(branch);
        setIsOpenModalCreate(true);
        setStatusModal(true);
    }

    const handleCloseModalCreate = () => {
        setIsOpenModalCreate(false);
    }

    const handleOpenModalDelete = (branch) => {
        setCurrentBranch(branch);
        setIsOpenDelete(true);
    }

    const handleCloseModalDelete = () => {
        setCurrentBranch({});
        setIsOpenDelete(false);
    }

    const handleDeleteBranch = () => {
        axiosInstance
            .get(`/brand/delete/${currentBranch?.code}`)
            .then(res => {
                toast.success(`Xoá thương hiệu ${currentBranch?.name} thành công!`)
                handleCloseModalDelete();
                getListBranch();
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

    const handleSubmitForm = () => {
        if (brandName?.trim()?.length === 0 && brandName !== undefined) {
            toast.warn("Vui lòng điền đầy đủ thông tin!");
            return
        }

        if (!statusModal) {
            const data = {
                brandName: brandName
            }

            axiosInstance
                .post('/brand/create', data)
                .then(res => {
                    toast.success(`Thêm thương hiệu ${brandName} thành công!`)
                    setIsOpenModalCreate(false);
                    setBrandName('');
                    getListBranch();
                    setCurrentBranch('');
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
            const data = {
                brandName: brandName
            }

            axiosInstance
                .put(`/brand/update/${currentBranch?.code}`, data)
                .then(res => {
                    toast.success(`Sửa thương hiệu ${brandName} thành công!`)
                    setIsOpenModalCreate(false);
                    setBrandName('');
                    getListBranch();
                    setCurrentBranch('');
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
        }


    }

    useEffect(() => {
        getListBranch();
    }, [currentPage])

    useEffect(() => {
        setBrandName(currentBranch?.name);
    }, [currentBranch])

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (isOpenModalCreate) handleSubmitForm();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white rtl:text-right dark:text-white dark:bg-gray-800">
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            Danh sách thương hiệu
                            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Thông tin danh sách thương hiệu</p>
                        </div>
                        <div className="flex items-center justify-center">
                            <button className="flex items-center gap-2 px-4 py-2 text-base text-white bg-blue-500 rounded-md outline-none" onClick={() => handleOpenModalCreate()}>
                                <FaPlus />
                                Thêm thương hiệu
                            </button>
                        </div>
                    </div>
                </caption>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>

                        <th scope="col" className="px-6 py-3">
                            Tên thương hiệu
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Hành động
                        </th>
                        <th scope="col" className="px-6 py-3">
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {listBranch?.content?.map((item, index) => {
                        return (
                            <tr key={index} className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item?.name}
                                </th>
                                <td className="px-6 py-4">
                                    <a onClick={() => handleOpenModalEdit(item)} className="font-medium text-blue-600 cursor-pointer dark:text-blue-500 hover:underline">Chỉnh sửa</a>
                                </td>
                                <td className="px-6 py-4">
                                    <a onClick={() => handleOpenModalDelete(item)} className="font-medium cursor-pointer text-red dark:text-blue-500 hover:underline">Xoá</a>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
            <div className="pl-3 pr-3">
            <Pagination
                totalPages={listBranch?.totalElements}
                size={size}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                content={'thương hiệu'}
            />
            </div>
            {isOpenModalCreate && <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 animate-fadeIn">
                <div className="relative z-50 w-full max-w-2xl max-h-screen overflow-y-auto bg-white rounded-lg shadow-lg">
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-t md:p-5 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {statusModal ? 'Chỉnh sửa thương hiệu' : 'Thêm thương hiệu mới'}
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
                                <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên thương hiệu</label>
                                <input ref={inputRef} type="text" name="fullName" id="fullName" value={brandName} onChange={(e) => setBrandName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nhập tên danh mục" required="" />
                            </div>
                        </div>
                        <button onClick={handleSubmitForm} className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-6">
                            <svg className="w-5 h-5 me-1 -ms-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                            {statusModal ? 'Lưu' : 'Thêm danh mục'}
                        </button>
                    </div>
                </div>
            </div >}

            {isOpenDelete && (
                <ModalAlert
                    handleClose={handleCloseModalDelete}
                    handleDelete={handleDeleteBranch}
                    name={currentBranch?.name}
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

export default BranchManagement