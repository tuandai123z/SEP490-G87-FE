import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ModalConfirmCreate from "../../../../components/common/ModalConfirmCreate";
import { Select } from "../../../../components/common/Select";
import { axiosInstance } from "../../../../utils/axiosInstant";

const CreateExportDeliveryReturn = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [currentCustomer, setCurrentCustomer] = useState({});
    const [listOrderProducts, setListOrderProducts] = useState([]);
    const [returnDetail, setReturnDetail] = useState({});
    const [currentReturnCode, setCurrentReturnCode] = useState('');
    const [listReturn, setListReturn] = useState([]);
    const [listReturnCode, setListReturnCode] = useState([]);
    const navigate = useNavigate();

    const getListReturn = () => {
        axiosInstance
            .get(`/return-form/find-all`, {
                params: {
                    size: 999,
                    approveStatus: 'APPROVED'
                }
            })
            .then(res => {
                const data = res.data;
                const listCode = data?.content?.map(item => item?.returnForm.code)
                setListReturnCode(listCode);
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

    const getReturnDetail = () => {
        axiosInstance
            .get(`/return-form/${currentReturnCode}`)
            .then(res => {
                const data = res.data;
                const groupedArray = data?.returnProducts?.filter(item => item?.statusProduct === 'BROKEN');
                if (groupedArray?.length === 0) {
                    toast.warn('Phiếu hoàn hàng này không có sản phẩm hỏng!')
                    return;
                }
                setCurrentCustomer(data?.customer)
                setReturnDetail(data?.returnForm)
                setListOrderProducts(groupedArray)
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


    const handleCreateExportOrder = () => {
        axiosInstance
            .post(`/inventory-delivery/return/${currentReturnCode}`)
            .then(res => {
                toast.success(`Tạo phiếu xuất kho cho phiếu hoàn hàng ${currentReturnCode} thành công`)
                setIsOpenModal(false);
                navigate(`/inventory/export/management`);
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

    const handleOpenModal = () => {
        setIsOpenModal(true);
    }

    useEffect(() => {
        if (currentReturnCode) {
            getReturnDetail()
        }
    }, [currentReturnCode])
    useEffect(() => {
        // getReturnDetail()
        getListReturn();
    }, [])


    return (
        <div className="relative overflow-x-auto ">
            <div className="flex items-center w-full h-auto gap-4 px-2 py-4">
                <h3 className="text-xl font-semibold uppercase">Phiếu xuất kho</h3>
            </div>
            <div className="flex w-full gap-4 px-2 mb-2">
                <div className="w-full p-2.5 gap-4 border-2 border-gray-400 relative">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col items-start w-full col-span-1">
                            <label htmlFor="first_name" className="block w-full mb-2 text-sm font-normal text-gray-900 dark:text-white">Phiếu hoàn hàng </label>
                            {/* <input type="text" id="phoneNumber" value={returnDetail?.code} disabled className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /> */}
                            <Select
                                value={currentReturnCode}
                                onChange={setCurrentReturnCode}
                                options={listReturnCode}
                            />
                        </div>
                        <div className="flex flex-col items-start w-full">
                            <label htmlFor="customerName" className="block w-full mb-2 text-sm font-normal text-gray-900 dark:text-white">Tên khách hàng</label>
                            <input type="text" id="customerName" value={currentCustomer?.name} disabled className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className="flex flex-col items-start w-full">
                            <label htmlFor="phoneNumber" className="block w-full mb-2 text-sm font-normal text-gray-900 dark:text-white">Số điện thoại</label>
                            <input type="text" id="phoneNumber" value={currentCustomer?.phoneNumber} disabled className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className="flex flex-col items-start w-full">
                            <label htmlFor="address" className="block mb-2 text-sm font-normal text-gray-900 dark:text-white ">Địa chỉ</label>
                            <input type="text" id="address" value={currentCustomer?.address} disabled className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                    </div>
                    <p className="absolute text-gray-900 top-[-16px] bg-white font-semibold">Thông tin khách hàng</p>
                </div>
            </div>
            <div className="w-full px-2 mb-4">
                <div className="relative overflow-x-auto shadow-md">
                    <div className="flex justify-between">
                        <div className={`px-4 py-1 uppercase border-t-2 border-l-2 cursor-pointer transition-all duration-100 bg-orange-200 font-medium`} onClick={() => handleOpenModal()}>
                            <span>Tạo phiếu</span>
                        </div>
                    </div>
                    <table className="w-full text-sm text-left text-blue-100 border border-blue-400 rtl:text-right dark:text-blue-100">
                        <thead className="text-xs text-white uppercase bg-blue-400 border border-blue-400 dark:text-white">
                            <tr>
                                <th scope="col" className="px-6 py-3 border border-blue-300">Mã hàng</th>
                                <th scope="col" className="px-6 py-3 border border-blue-300">Tên hàng</th>
                                <th scope="col" className="px-6 py-3 border border-blue-300">ĐVT</th>
                                <th scope="col" className="px-6 py-3 border border-blue-300">Số lượng hoàn</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listOrderProducts?.map((item, index) => {
                                return (
                                    <tr className="text-black border border-b border-blue-400" key={index}>
                                        <th scope="row" className="px-6 py-4 font-medium text-black border border-blue-300 whitespace-nowrap">
                                            {item?.productInformation?.code}
                                        </th>
                                        <td className="px-6 py-4 border border-blue-300">{item?.productInformation?.name}</td>
                                        <td className="px-6 py-4 border border-blue-300">{item?.productInformation?.unitName}</td>
                                        <td className="px-6 py-4 border border-blue-300">{item?.quantityReturn}</td>
                                    </tr>
                                )
                            })}
                            {listOrderProducts?.length === 0 && (
                                <tr className="text-black border border-b border-blue-400" >
                                    <th scope="row" className="px-6 py-4 font-medium text-black border border-blue-300 whitespace-nowrap">Chưa có thiết bị nào được chọn</th>
                                    <td className="px-6 py-4 border border-blue-300"></td>
                                    <td className="px-6 py-4 border border-blue-300"></td>
                                    <td className="px-6 py-4 border border-blue-300"></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {isOpenModal && <ModalConfirmCreate
                handleClose={() => setIsOpenModal(false)}
                handleConfirm={handleCreateExportOrder}
                type='tạo'
            />}

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

export default CreateExportDeliveryReturn
