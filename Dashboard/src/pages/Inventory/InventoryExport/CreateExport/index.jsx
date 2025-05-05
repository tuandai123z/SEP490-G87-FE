import { useRef } from "react";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ModalConfirmCreate from "../../../../components/common/ModalConfirmCreate";
import { axiosInstance } from "../../../../utils/axiosInstant";
import { formatVND } from "../../../../utils/format";
import { Select } from "../../../../components/common/Select";

const CreateExportDelivery = () => {
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenCreateCustomer, setIsOpenCreateCustomer] = useState(false);
    const order = useSelector(state => state.sale);
    const user = useSelector(state => state.user);
    const [listProductSale, setListProductSale] = useState(order);
    const [currentCustomer, setCurrentCustomer] = useState({});
    const [currentOrder, setCurrentOrder] = useState({});
    const [listOrdersSale, setListOrdersSale] = useState([]);
    const [listOrderProducts, setListOrderProducts] = useState([]);
    const [listOrderSaleCode, setListOrderSaleCode] = useState([]);
    const [orderCodeSearch, setOrderCodeSearch] = useState('');
    const [taxNumber, setTaxNumber] = useState('');
    const totalCost = listOrderProducts && listOrderProducts?.reduce((sum, product) => sum + Number(product?.quantity * product?.sellingPrice * (100 - product?.discount) / 100), Number(0));
    const ref = useRef(false);
    const navigate = useNavigate();

    const getListOrderSale = () => {
        axiosInstance
            .get(`/order/find-all`, {
                params: {
                    approveStatus: "APPROVED",
                    size: 999
                }
            })
            .then(res => {
                const data = res.data;
                const resultListOrderCode = data?.content?.map(item => item?.code);
                setListOrderSaleCode(resultListOrderCode);
                setListOrdersSale(data.content);
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

    const getCurrentOrder = () => {
        axiosInstance
            .get(`/order/${orderCodeSearch}`)
            .then(res => {
                const data = res.data;
                setCurrentOrder(data);
                setCurrentCustomer(data?.customer)
                const products = data?.orderProducts?.map(item => ({
                    ...item,
                    discount: item?.discount * 100
                }));
                setListOrderProducts(products);
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
        const requestData = {
            totalAmount: totalCost,
            customerId: currentCustomer?.id,
            taxExportGTGT: 0.1,
            taxNumber: taxNumber
        }
        axiosInstance
            .post(`/inventory-delivery/${orderCodeSearch}/create/delivery-order`, requestData)
            .then(res => {
                toast.success("Tạo phiếu xuất kho thành công!")
                navigate("/inventory/export/management");
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
        if (!orderCodeSearch) {
            toast.warn("Bạn chưa chọn thông tin đơn hàng");
            return
        }

        const isOutOfStock = listOrderProducts?.some(product => product?.inventoryQuantity < product?.quantity);

        if (isOutOfStock) {
            toast.warn("Không đủ số lượng sản phẩm trong kho để xuất!");
            return;
        }

        setIsOpenModal(true);
    }

    useEffect(() => {
        if (ref.current) return;
        ref.current = true;
        getListOrderSale();
    }, [])

    useEffect(() => {
        setListProductSale(order);
    }, [order])

    useEffect(() => {
        orderCodeSearch && getCurrentOrder();
    }, [orderCodeSearch])


    return (
        <div className="relative overflow-x-auto ">
            <div className="flex items-center w-full h-auto gap-4 px-2 py-4">
                <h3 className="text-xl font-semibold uppercase">Phiếu xuất kho</h3>
            </div>
            <div className="flex w-full gap-4 px-2 mb-2">
                <div className="w-full p-2.5 gap-4 border-2 border-gray-400 relative">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-start w-full col-span-1">
                            <label htmlFor="first_name" className="block w-full mb-2 text-sm font-normal text-gray-900 dark:text-white">Phiếu bán hàng <span className="text-red">*</span></label>
                            <Select
                                value={orderCodeSearch}
                                onChange={setOrderCodeSearch}
                                options={listOrderSaleCode}
                            />
                        </div>
                        <div className="flex flex-col items-start w-full">
                            <label htmlFor="phoneNumber" className="block w-full mb-2 text-sm font-normal text-gray-900 dark:text-white">Số điện thoại</label>
                            <input type="text" id="phoneNumber" value={currentCustomer?.phoneNumber} disabled className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className="flex flex-col items-start w-full">
                            <label htmlFor="customerName" className="block w-full mb-2 text-sm font-normal text-gray-900 dark:text-white">Tên khách hàng</label>
                            <input type="text" id="customerName" value={currentCustomer?.name} disabled className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className="flex flex-col items-start w-full">
                            <label htmlFor="address" className="block mb-2 text-sm font-normal text-gray-900 dark:text-white ">Địa chỉ</label>
                            <input type="text" id="address" value={currentCustomer?.address} disabled className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className="flex flex-col items-start w-full">
                            <label htmlFor="taxNumber" className="block mb-2 text-sm font-normal text-gray-900 dark:text-white ">Mã số thuế</label>
                            <input type="text" id="taxNumber" value={taxNumber} onChange={e => setTaxNumber(e.target.value)} className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                    </div>
                    <p className="absolute text-gray-900 top-[-16px] bg-white font-semibold">Thông tin khách hàng</p>
                </div>
            </div>
            <div className="w-full px-2 mb-4">
                <div className="relative overflow-x-auto shadow-md">
                    <div className="flex justify-end pb-3">
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
                                <th scope="col" className="px-6 py-3 border border-blue-300">Số lượng</th>
                                <th scope="col" className="px-6 py-3 border border-blue-300">Tồn kho</th>
                                <th scope="col" className="px-6 py-3 border border-blue-300">Giá bán</th>
                                <th scope="col" className="px-6 py-3 border border-blue-300">Chiết khấu</th>
                                <th scope="col" className="px-6 py-3 border border-blue-300">Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listOrderProducts?.map((item, index) => {
                                return (
                                    <tr className="text-black border border-b border-blue-400" key={index}>
                                        <th scope="row" className="px-6 py-4 font-medium text-black border border-blue-300 whitespace-nowrap">
                                            {item?.code}
                                        </th>
                                        <td className="px-6 py-4 border border-blue-300">{item?.name}</td>
                                        <td className="px-6 py-4 border border-blue-300">{item?.unitName}</td>
                                        <td className="px-6 py-4 border border-blue-300">{item?.quantity}</td>
                                        <td className="px-6 py-4 border border-blue-300">{item?.inventoryQuantity}</td>
                                        <td className="px-6 py-4 border border-blue-300">{formatVND(item?.sellingPrice)}</td>
                                        <td className="relative px-6 py-4 border border-blue-300">
                                            {`${item?.discount} %`}
                                        </td>
                                        <td className="px-6 py-4 border border-blue-300">{formatVND(item?.quantity * item?.sellingPrice * (100 - item?.discount) / 100)}</td>

                                    </tr>
                                )
                            })}
                            {listOrderProducts?.length !== 0 && (
                                <tr className="text-black border border-b border-blue-400" >
                                    <th scope="row" className="px-6 py-4 font-medium text-black border border-l-0 border-r-0 border-blue-300 whitespace-nowrap">Tổng tiền:</th>
                                    <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                    <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                    <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                    <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                    <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                    <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                    <td className="px-6 py-4 border border-r-0 border-blue-300">{formatVND(totalCost)}</td>
                                </tr>
                            )}
                            {listOrderProducts?.length === 0 && (
                                <tr className="text-black border border-b border-blue-400" >
                                    <th scope="row" className="px-6 py-4 font-medium text-black border border-blue-300 whitespace-nowrap">Chưa có thiết bị nào được chọn</th>
                                    <td className="px-6 py-4 border border-blue-300"></td>
                                    <td className="px-6 py-4 border border-blue-300"></td>
                                    <td className="px-6 py-4 border border-blue-300"></td>
                                    <td className="px-6 py-4 border border-blue-300"></td>
                                    <td className="px-6 py-4 border border-blue-300"></td>
                                    <td className="px-4 py-4 border border-blue-300"></td>
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

export default CreateExportDelivery
