import { useRef } from "react";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ModalConfirmCreate from "../../../../components/common/ModalConfirmCreate";
import { axiosInstance } from "../../../../utils/axiosInstant";
import { formatVND } from "../../../../utils/format";
import { Select } from "../../../../components/common/Select";
import { changeReasonReturn, changeStatusReturn, clearOrderReturn } from "../../../../actions/orderReturnAction";
import AddProduct from "../component/AddProduct";
import Loading from '../../../../components/layouts/Loading'

const CreateReturnForm = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
    const [currentCustomer, setCurrentCustomer] = useState({});
    const [listOrderProducts, setListOrderProducts] = useState([]);
    const [listOrderSaleCode, setListOrderSaleCode] = useState([]);
    const [orderCodeSearch, setOrderCodeSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const totalCost = listOrderProducts && listOrderProducts?.reduce((sum, product) => sum + Number(product?.quantity * product?.sellingPrice * (100 - product?.discount) / 100), Number(0));
    const orderReturn = useSelector(state => state.orderReturn);
    const dataUser = useSelector(state => state.user);
    const ref = useRef(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getListOrderSale = () => {
        axiosInstance
            .get(`/order/find-all`, {
                params: {
                    deliveryStatus: "RECEIVE_DELIVERY",
                    size: 999
                }
            })
            .then(res => {
                const data = res.data;
                const resultListOrderCode = data?.content?.map(item => item?.code);
                setListOrderSaleCode(resultListOrderCode);
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
                setCurrentCustomer(data?.customer)
                const products = data?.orderProducts?.map(item => ({
                    ...item,
                    discount: item?.discount * 100,
                    statusReturn: 'BROKEN',
                    reason: ''
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

    const handleCreateReturnOrder = () => {
        const products = orderReturn?.map(item => ({
            productCode: item?.code,
            reason: item?.reason,
            statusProduct: item?.statusReturn,
            quantity: item?.currentQuantity
        }))

        const data = {
            orderCode: orderCodeSearch,
            employeeCode: dataUser?.employee_code,
            products: products,
            customerId: currentCustomer?.id
        }
        // setIsLoading(true);
        axiosInstance
            .post(`/return-form/create`, data)
            .then(res => {
                const data = res.data;
                setIsOpenModal(false);
                setIsLoading(false);
                toast.success("Tạo phiếu hoàn hàng thành công!")
                const action = clearOrderReturn();
                dispatch(action);
                navigate(`/inventory/return/management`);
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
            toast.warn("Bạn chưa chọn thông tin phiếu xuất kho");
            return
        }

        if (orderReturn?.length === 0) {
            toast.warn("Bạn chưa chọn thiết bị!");
            return
        }

        setIsOpenModal(true);
    }

    const handleChange = (code, statusReturn) => {
        const payload = { code: code, newStatus: statusReturn }
        const action = changeStatusReturn(payload);
        dispatch(action);
    };

    useEffect(() => {
        if (ref.current) return;
        ref.current = true;
        getListOrderSale();
    }, [])

    useEffect(() => {
        orderCodeSearch && getCurrentOrder();
        const action = clearOrderReturn();
        dispatch(action);
    }, [orderCodeSearch])

    const onChangeShowAdd = () => {
        if (listOrderProducts?.length === 0) {
            toast.warn("Vui lòng chọn phiếu xuất kho!")
            return;
        }
        setIsOpenModalAdd(!isOpenModalAdd);
    }

    const handleChangeReason = (code, newReason) => {
        const action = changeReasonReturn(code, newReason);
        dispatch(action);
    }


    return (
        <div className="relative overflow-x-auto ">
            <div className="flex items-center w-full h-auto gap-4 px-2 py-4">
                <h3 className="text-xl font-semibold uppercase">Phiếu hoàn hàng</h3>
            </div>
            <div className="flex w-full gap-4 px-2 mb-2">
                <div className="w-full p-2.5 gap-4 border-2 border-gray-400 relative">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col items-start w-full col-span-1">
                            <label htmlFor="first_name" className="block w-full mb-2 text-sm font-normal text-gray-900 dark:text-white">Phiếu xuất kho <span className="text-red">*</span></label>
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
                    </div>
                    <p className="absolute text-gray-900 top-[-16px] bg-white font-semibold">Thông tin khách hàng</p>
                </div>
            </div>
            <div className="w-full px-2 mb-4">
                <div className="relative overflow-x-auto shadow-md">
                  <div className="flex justify-end pt-2 pb-3">
                        <div className={`px-4 py-1 w-[170px] justify-end uppercase border-t-2 border-l-2 cursor-pointer transition-all duration-100 bg-orange-200 font-medium`} onClick={() => onChangeShowAdd()}>
                            <span>Thêm sản phẩm</span>
                        </div>
                        </div>
                    <table className="w-full text-sm text-left text-blue-100 border border-blue-400 rtl:text-right dark:text-blue-100">
                        <thead className="text-xs text-white uppercase bg-blue-400 border border-blue-400 dark:text-white">
                            <tr>
                                <th scope="col" className="px-6 py-3 border border-blue-300">Mã hàng</th>
                                <th scope="col" className="px-6 py-3 border border-blue-300">Tên hàng</th>
                                <th scope="col" className="px-6 py-3 border border-blue-300">ĐVT</th>
                                <th scope="col" className="px-6 py-3 border border-blue-300">Số lượng</th>
                                <th scope="col" className="px-6 py-3 border border-blue-300">Trạng thái</th>
                                <th scope="col" className="px-6 py-3 border border-blue-300">Thành tiền</th>
                                <th scope="col" className="px-6 py-3 border border-blue-300">Lý do</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderReturn?.map((item, index) => {
                                return (
                                    <tr className="text-black border border-b border-blue-400" key={index}>
                                        <th scope="row" className="px-6 py-4 font-medium text-black border border-blue-300 whitespace-nowrap">
                                            {item?.code}
                                        </th>
                                        <td className="px-6 py-4 border border-blue-300">{item?.name}</td>
                                        <td className="px-6 py-4 border border-blue-300">{item?.unit}</td>
                                        <td className="px-6 py-4 border border-blue-300">{item?.currentQuantity}</td>
                                        <td className="relative flex items-center gap-4 px-6 py-4 translate-y-1/2">
                                            <label className="flex items-center gap-1 " >
                                                <input
                                                    type="radio"
                                                    name={`status-${index}`}
                                                    value="OLD"
                                                    checked={item?.statusReturn === 'OLD'}
                                                    onChange={() => handleChange(item?.code, 'OLD')}
                                                />
                                                Cũ
                                            </label>
                                            <label className="flex items-center gap-1">
                                                <input
                                                    type="radio"
                                                    name={`status-${index}`}
                                                    value="BROKEN"
                                                    checked={item?.statusReturn === 'BROKEN'}
                                                    onChange={() => handleChange(item?.code, 'BROKEN')}
                                                />
                                                Hỏng
                                            </label>
                                        </td>

                                        <td className="px-6 py-4 border border-blue-300">{formatVND(item?.quantity * item?.sellingPrice * (100 - item?.discount) / 100)}</td>
                                        <td className="px-6 py-4 border border-blue-300">
                                            <textarea
                                                type="text"
                                                value={item?.reason}
                                                onChange={(e) => handleChangeReason(item?.code, e.target.value)}
                                                className="w-full h-20 p-2 border-none rounded"
                                                placeholder="Nhập lý do"
                                            />
                                        </td>

                                    </tr>
                                )
                            })}
                            {orderReturn?.length !== 0 && (
                                <tr className="text-black border border-b border-blue-400" >
                                    <th scope="row" className="px-6 py-4 font-medium text-black border border-l-0 border-r-0 border-blue-300 whitespace-nowrap">Tổng tiền:</th>
                                    <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                    <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                    <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                    <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                    <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                    <td className="px-6 py-4 border border-r-0 border-blue-300">{formatVND(totalCost)}</td>
                                </tr>
                            )}
                            {orderReturn?.length === 0 && (
                                <tr className="text-black border border-b border-blue-400" >
                                    <th scope="row" className="px-6 py-4 font-medium text-black border border-blue-300 whitespace-nowrap">Chưa có thiết bị nào được chọn</th>
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
                    <div className="flex justify-end pt-3">
                    <div className={`px-4 py-1 text-center w-[170px] uppercase border-t-2 border-l-2 cursor-pointer transition-all duration-100 bg-orange-200 font-medium`} onClick={() => handleOpenModal()}>
                            <span>Tạo phiếu</span>
                        </div>
                    </div>
            </div>
            {isLoading && <Loading />}
            {isOpenModal && <ModalConfirmCreate
                handleClose={() => setIsOpenModal(false)}
                handleConfirm={handleCreateReturnOrder}
                type='tạo'
            />}
            {isOpenModalAdd && <AddProduct
                onChangeShowAdd={onChangeShowAdd}
                data={listOrderProducts}
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

export default CreateReturnForm
