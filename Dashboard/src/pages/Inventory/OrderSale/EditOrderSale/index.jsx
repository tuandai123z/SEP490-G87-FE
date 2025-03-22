import { useRef } from "react";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ModalConfirmCreate from "../../../../components/common/ModalConfirmCreate";
import { axiosInstance } from "../../../../utils/axiosInstant";
import { IoMdArrowRoundBack } from "react-icons/io";
import AddProductSale from "../AddProductSale";
import { formatVND } from "../../../../utils/format";
import { clearOrderSale, importOrderSale } from "../../../../actions/saleActions";
import { FaKey } from "react-icons/fa";
import ModalAlertConfirm from "../../../../components/common/ModalAlerConfirm";

const EditOrderSale = () => {
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [orderSaleDetail, setOrderSaleDetail] = useState('');
    const order = useSelector(state => state.sale);
    const user = useSelector(state => state.user);
    const [listProductSale, setListProductSale] = useState(order);
    const [currentCustomer, setCurrentCustomer] = useState({});
    const [statusChange, setStatusChange] = useState('');
    const [titleModalConfirm, setTitleModalConfirm] = useState('');
    const [contentModalConfirm, setContentModalConfirm] = useState('');
    const [titleModalBtnConfirm, setTitleModalBtnConfirm] = useState('');
    const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false);
    const { slug } = useParams();
    const totalCost = listProductSale && listProductSale?.reduce((sum, product) => sum + Number(product?.quantity * product?.sellingPrice * (100 - product?.discount) / 100), Number(0));
    const ref = useRef(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getOrderSaleDetail = () => {
        axiosInstance
            .get(`/order/${slug}`)
            .then(res => {
                const data = res.data;
                console.log(data, '=========');
                setOrderSaleDetail(data);
                const dataImport = data?.orderProducts?.map(item => ({
                    ...item,
                    discount: item?.discount * 100
                }));
                const action = importOrderSale(dataImport);
                dispatch(action);
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



    const handleEditOrderSale = () => {
        const listProductOrder = order?.map(product => {
            const productItem = {
                productCode: product.code,
                quantity: product.quantity,
                discount: parseFloat(product.discount) / 100
            }
            return productItem
        })

        const requestData = {
            employeeCode: user.employee_code,
            totalAmount: totalCost,
            products: listProductOrder,
            customerId: currentCustomer?.id,
        }

        axiosInstance
            .put(`/order/${slug}/update`, requestData)
            .then(res => {
                toast.success("Cập nhật thông tin phiếu mua thành công");
                navigate('/inventory/orderSale/management');
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

    const formatDate = (date) => {
        return `${date?.split('.')[0]?.split('T')[0]} ${date?.split('.')[0]?.split('T')[1]}`;
    }

    const handleOpenModal = () => {
        if (listProductSale?.length === 0) {
            toast.warn("Bạn chưa chọn thiết bị");
            return;
        }
        setIsOpenModal(true);
    }

    const onChangeShowAdd = () => {
        setIsOpenAdd(!isOpenAdd);
    }

    const handleChangeDiscount = (index, value) => {
        const discount = (Number(value) >= 0 && Number(value) <= 100) ? Number(value) : 0;
        const updatedProducts = [...listProductSale];
        updatedProducts[index].discount = discount;
        setListProductSale(updatedProducts);
    }

    const handleOpenChange = (status, title, content, titleBtnConfirm) => {
        setStatusChange(status);
        setTitleModalConfirm(title);
        setContentModalConfirm(content);
        setTitleModalBtnConfirm(titleBtnConfirm);
        setIsOpenModalConfirm(true);
    }

    const handleChangeStatus = () => {
        console.log(statusChange);
        axiosInstance
            .put(`/order/${slug}/${statusChange === 'APPROVED' ? 'approve' : 'reject'}`)
            .then(res => {
                const contentStatus = statusChange === 'APPROVED' ? "Duyệt" : 'Huỷ ';
                toast.success(`${contentStatus} phiếu bán hàng thành công!`);
                getOrderSaleDetail();
                setIsOpenModalConfirm(false);
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

    const handleBack = () => {
        const action = clearOrderSale();
        dispatch(action)
        navigate(-1);
    }

    useEffect(() => {
        setListProductSale(order);
    }, [order])

    useEffect(() => {
        if (ref.current) return;
        ref.current = true;
        getOrderSaleDetail();
    }, [slug])

    useEffect(() => {
        setCurrentCustomer(orderSaleDetail?.customer)
    }, [orderSaleDetail])

    return (
        <div className="relative grid grid-cols-4 gap-2 pr-2 overflow-x-auto">
            <div className="col-span-3">
                <div className="flex items-center w-full h-auto gap-4 px-2 py-4">
                    <h3 className="text-xl font-semibold uppercase">Phiếu bán hàng</h3>
                </div>
                <div className="flex w-full gap-4 px-2 mb-2">
                    <div className="w-full p-2.5 grid grid-cols-2 gap-4 border-2 border-gray-400 relative">
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
                        <p className="absolute text-gray-900 top-[-16px] bg-white font-semibold">Thông tin khách hàng</p>
                    </div>
                </div>
                <div className="w-full px-2 mb-4">
                    <div className="relative overflow-x-auto shadow-md">
                        <div className="flex justify-between">
                            <div className="flex gap-2">
                                <div className={`px-4 py-1 uppercase border-t-2 border-l-2 cursor-pointer transition-all duration-100 bg-orange-200 font-medium`} onClick={() => handleOpenModal()}>
                                    <span>Lưu</span>
                                </div>
                                <div className={`px-4 py-1 flex gap-3 items-center uppercase border-t-2 border-l-2 cursor-pointer transition-all duration-100 bg-orange-200 font-medium`} onClick={() => handleBack()}>
                                    <IoMdArrowRoundBack />
                                    <span>Quay lại</span>
                                </div>
                            </div>
                            <div className={`px-4 py-1 uppercase border-t-2 border-l-2 cursor-pointer transition-all duration-100 bg-orange-200 font-medium`} onClick={() => onChangeShowAdd()}>
                                <span>Thêm thiết bị</span>
                            </div>
                        </div>
                        <table className="w-full text-sm text-left text-blue-100 border border-blue-400 rtl:text-right dark:text-blue-100">
                            <thead className="text-xs text-white uppercase bg-blue-400 border border-blue-400 dark:text-white">
                                <tr>
                                    <th scope="col" className="px-6 py-3 border border-blue-300">Mã hàng</th>
                                    <th scope="col" className="px-6 py-3 border border-blue-300">Tên hàng</th>
                                    <th scope="col" className="px-6 py-3 border border-blue-300">ĐVT</th>
                                    <th scope="col" className="px-6 py-3 border border-blue-300">Số lượng</th>
                                    <th scope="col" className="px-6 py-3 border border-blue-300">Giá bán</th>
                                    <th scope="col" className="px-6 py-3 border border-blue-300">Chiết khấu</th>
                                    <th scope="col" className="px-6 py-3 border border-blue-300">Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listProductSale?.map((item, index) => {
                                    return (
                                        <tr className="text-black border border-b border-blue-400" key={index}>
                                            <th scope="row" className="px-6 py-4 font-medium text-black border border-blue-300 whitespace-nowrap">
                                                {item?.code}
                                            </th>
                                            <td className="px-6 py-4 border border-blue-300">{item?.name}</td>
                                            <td className="px-6 py-4 border border-blue-300">{item?.unit}</td>
                                            <td className="px-6 py-4 border border-blue-300">{item?.quantity}</td>
                                            <td className="px-6 py-4 border border-blue-300">{formatVND(item?.sellingPrice)}</td>
                                            <td className="relative px-6 py-4 border border-blue-300">
                                                <input
                                                    type="text"
                                                    value={item?.discount}
                                                    onChange={(e) => handleChangeDiscount(index, e.target.value)}
                                                    className="w-[40px] px-2 py-1 border-none rounded"
                                                />
                                                <span className="absolute text-gray-500 transform -translate-y-1/2 pointer-events-none left-[66px] top-1/2">%</span>
                                            </td>
                                            <td className="px-6 py-4 border border-blue-300">{formatVND(item?.quantity * item?.sellingPrice * (100 - item?.discount) / 100)}</td>

                                        </tr>
                                    )
                                })}
                                {listProductSale?.length !== 0 && (
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
                                {listProductSale?.length === 0 && (
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
                </div>
            </div>
            <div className="flex flex-col w-full col-span-1 gap-4 p-4 my-4 h-fit bg-slate-100">
                <h3 className="text-lg font-semibold">Tình trạng</h3>
                <div className="flex flex-col gap-2">
                    <span>Tạo bởi</span>
                    <input type="text" disabled value={orderSaleDetail?.employee?.name} className='w-full px-4 py-1 text-right border border-gray-500' />
                    <input type="text" disabled value={`${formatDate(orderSaleDetail?.createAt)} `} className='w-full px-4 py-1 text-right border border-gray-500' />
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between ">
                        <span>Duyệt bởi</span>
                        {orderSaleDetail && (orderSaleDetail?.approveStatus === 'WAITING') && (
                            <div
                                onClick={() => handleOpenChange('APPROVED', 'Duyệt phiếu mua hàng', 'Bạn chắc chắn duyệt phiếu mua hàng này?', 'Xác nhận')}
                                className="flex items-center gap-2 px-4 py-1 transition-all duration-150 bg-orange-400 rounded-md cursor-pointer hover:bg-orange-600">
                                <span>Duyệt</span>
                                <FaKey className="" />
                            </div>)}
                        {orderSaleDetail && orderSaleDetail?.approveStatus === 'APPROVED' && (
                            <div className="flex items-center gap-2 px-4 py-1 bg-orange-400 rounded-md ">
                                <span>Đã duyệt</span>
                                <FaKey className="" />
                            </div>)}
                    </div>
                    <input type="text" disabled value={orderSaleDetail?.approveStatus === 'APPROVED' ? orderSaleDetail?.approveBy : ''} className='w-full px-4 py-1 text-right border border-gray-500' />
                    <input type="text" disabled value={orderSaleDetail?.approveStatus === 'APPROVED' ? `${formatDate(orderSaleDetail?.approveDate)} ` : ''} className='w-full px-4 py-1 text-right border border-gray-500' />
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between ">
                        <span>Từ chối bởi</span>
                        {orderSaleDetail && (orderSaleDetail?.approveStatus === 'WAITING') && (
                            <div
                                onClick={() => handleOpenChange('REJECTED', 'Huỷ phiếu mua hàng', 'Bạn chắc chắn huỷ phiếu mua hàng này?', 'Xác nhận')}
                                className="flex items-center gap-2 px-4 py-1 transition-all duration-150 rounded-md cursor-pointer bg-red hover:bg-rose-500">
                                <span>Từ chối</span>
                                <FaKey className="" />
                            </div>)}
                        {orderSaleDetail && orderSaleDetail?.approveStatus === 'REJECTED' && (
                            <div className="flex items-center gap-2 px-4 py-1 rounded-md bg-red ">
                                <span>Đã từ chối</span>
                                <FaKey className="" />
                            </div>)}
                    </div>
                    <input type="text" disabled value={orderSaleDetail?.approveStatus === 'REJECTED' ? orderSaleDetail?.approveBy : ''} className='w-full px-4 py-1 text-right border border-gray-500' />
                    <input type="text" disabled value={orderSaleDetail?.approveStatus === 'REJECTED' ? `${formatDate(orderSaleDetail?.approveDate)} ` : ''} className='w-full px-4 py-1 text-right border border-gray-500' />
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between ">
                        <span>Đã nhập bởi</span>
                        {orderSaleDetail && orderSaleDetail?.deliveryStatus === 'RECEIVE_DELIVERY' && <div className="flex items-center gap-2 px-4 py-1 bg-blue-400 rounded-md ">
                            <span>Đã nhập</span>
                            <FaKey className="" />
                        </div>}
                    </div>
                    <input type="text" disabled value={''} className='w-full px-4 py-1 text-right border border-gray-500' />
                    <input type="text" disabled value={orderSaleDetail?.deliveryStatus === 'RECEIVE_DELIVERY' ? `${formatDate(orderSaleDetail?.actionTime)} ` : ''} className='w-full px-4 py-1 text-right border border-gray-500' />
                </div>
            </div>
            {isOpenAdd && <AddProductSale onChangeShowAdd={onChangeShowAdd} />}
            {isOpenModal && <ModalConfirmCreate
                handleClose={() => setIsOpenModal(false)}
                handleConfirm={handleEditOrderSale}
                type='chỉnh sửa'
            />}
            {isOpenModalConfirm && <ModalAlertConfirm
                title={titleModalConfirm}
                content={contentModalConfirm}
                handleClose={() => setIsOpenModalConfirm(false)}
                handleConfirm={handleChangeStatus}
                titleBtnConfirm={titleModalBtnConfirm}
            />}
        </div>
    )
}

export default EditOrderSale
