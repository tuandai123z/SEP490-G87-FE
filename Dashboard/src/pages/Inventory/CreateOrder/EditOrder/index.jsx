import { useRef } from "react";
import { useEffect, useState } from "react"
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { clearOrder, importOrder, } from "../../../../actions/orderActions";
import { axiosInstance } from "../../../../utils/axiosInstant";
import AddProduct from "../AddProduct";
import ModalConfirmCreate from "../../../../components/common/ModalConfirmCreate";
import { FaKey } from "react-icons/fa";
import ModalAlertConfirm from "../../../../components/common/ModalAlerConfirm";

const EditOrder = () => {
    const [currentSupplierId, setCurrentSupplierId] = useState('');
    const [currentSupplier, setCurrentSupplier] = useState({});
    const [listSuppliers, setListSuppliers] = useState([]);
    const [expectedDateShipped, setExpectedDateShipped] = useState('');
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [orderDetail, setOrderDetail] = useState('');
    const [listProducts, setListProducts] = useState([]);
    const dataUser = useSelector(state => state.user);
    const products = useSelector(state => state.order);
    const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
    const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false);
    const [titleModalConfirm, setTitleModalConfirm] = useState('');
    const [contentModalConfirm, setContentModalConfirm] = useState('');
    const [titleModalBtnConfirm, setTitleModalBtnConfirm] = useState('');
    const [statusChange, setStatusChange] = useState('');
    const ref = useRef(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { slug } = useParams();

    const getListSupplier = () => {
        axiosInstance
            .get(`/supplier/find-all`, {
                params: {
                    size: 999,
                }
            })
            .then(res => {
                const data = res.data.content;
                setListSuppliers(data);
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

    const getOrder = () => {
        axiosInstance
            .get(`/purchase-order/${slug}`)
            .then(res => {
                const data = res.data;
                setOrderDetail(data);
                setListProducts(data?.products)
                console.log(data);
                const actionClear = clearOrder();
                const actionImport = importOrder(data?.products);
                dispatch(actionClear);
                dispatch(actionImport);
                setOrderDetail(data);
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

    const handleEditPurchase = () => {
        const listProductPurchase = products?.map(product => {
            const productItem = {
                productCode: product.code,
                quantity: product.quantity
            }
            return productItem
        })

        const purchase = {
            supplierId: currentSupplierId,
            employeeCode: dataUser?.employee_code,
            deliveryDate: expectedDateShipped,
            products: listProductPurchase
        }
        axiosInstance
            .put(`/purchase-order/${orderDetail?.code}`, purchase)
            .then(res => {
                toast.success("Chỉnh sửa phiếu mua hàng thành công!");
                const action = clearOrder();
                dispatch(action)
                navigate(`/inventory/order/management`);
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

    const handleOpenModalEdit = () => {

        if (currentSupplierId === '' || expectedDateShipped === '' || products?.length === 0) {
            currentSupplierId === '' && toast.warn("Vui lòng chọn nhà cung cấp!");
            expectedDateShipped === '' && toast.warn("Vui lòng chọn ngày giao hàng");
            products?.length === 0 && toast.warn("Vui lòng chọn thiết bị");
            return;
        }

        setIsOpenModalEdit(true);
    }

    const handleChangeStatus = () => {
        axiosInstance
            .put(`/purchase-order/${slug}/approve/${statusChange}`)
            .then(res => {
                const contentStatus = statusChange === 'APPROVED' ? "Duyệt" : 'Huỷ ';
                toast.success(`${contentStatus} phiếu mua hàng thành công!`);
                getOrder();
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

    const handleOpenChange = (status, title, content, titleBtnConfirm) => {
        setStatusChange(status);
        setTitleModalConfirm(title);
        setContentModalConfirm(content);
        setTitleModalBtnConfirm(titleBtnConfirm);
        setIsOpenModalConfirm(true);
    }

    const handleBack = () => {
        const action = clearOrder();
        dispatch(action)
        navigate('/inventory/order/management');
    }

    useEffect(() => {
        if (orderDetail) {
            setCurrentSupplier(orderDetail?.supplier);
            setCurrentSupplierId(orderDetail?.supplier?.id);
            setExpectedDateShipped(orderDetail?.deliveryDate);
        }
    }, [orderDetail])

    useEffect(() => {
        if (ref.current) return;
        ref.current = true;
        getListSupplier();
        getOrder();
    }, [])

    useEffect(() => {
        if (currentSupplierId !== '') {
            axiosInstance
                .get(`/supplier/${currentSupplierId}`)
                .then(res => {
                    const data = res.data;
                    setCurrentSupplier(data);
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
    }, [currentSupplierId])

    const onChangeShowAdd = () => {
        setIsOpenAdd(!isOpenAdd);
    }

    return (
        <div className="relative grid grid-cols-4 gap-2 pr-2 overflow-x-auto">
            <div className="col-span-3">
                <div className="flex items-center w-full h-auto gap-4 px-2 py-4">
                    <h3 className="text-xl font-semibold uppercase">Chỉnh sửa phiếu mua hàng</h3>
                    <select id="jobRank" value={currentSupplierId} onChange={e => setCurrentSupplierId(e.target.value)} className="bg-gray-50 w-[20%] border border-gray-300 text-gray-900 text-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <option value={""}>---Nhà cung cấp---</option>
                        {listSuppliers?.map((supplier, index) => {
                            return <option value={supplier?.id} key={index}>{supplier?.name}</option>
                        })}
                    </select>
                </div>
                <div className="flex w-full gap-4 px-2 mb-2">
                    <div className="w-full p-2.5 grid grid-cols-2 gap-4 border-2 border-gray-400 relative">
                        <div className="flex flex-col items-start w-full">
                            <label htmlFor="first_name" className="block w-full mb-2 text-sm font-normal text-gray-900 dark:text-white">Nhà cung cấp</label>
                            <input type="text" value={currentSupplier?.name} id="first_name" disabled className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className="flex flex-col items-start w-full">
                            <label htmlFor="first_name" className="block w-full mb-2 text-sm font-normal text-gray-900 dark:text-white">Số điện thoại</label>
                            <input type="text" value={currentSupplier?.phoneNumber} id="first_name" className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className="flex flex-col items-start w-full">
                            <label htmlFor="first_name" className="block mb-2 text-sm font-normal text-gray-900 dark:text-white ">Địa chỉ</label>
                            <input type="text" value={currentSupplier?.address} id="first_name" className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className="flex flex-col items-start w-full">
                            <label htmlFor="first_name" className="block w-full mb-2 text-sm font-normal text-gray-900 dark:text-white">Ngày giao hàng dự kiến</label>
                            <input type="date" value={expectedDateShipped} onChange={e => { setExpectedDateShipped(e.target.value) }} id="first_name" className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <p className="absolute text-gray-900 top-[-16px] bg-white font-semibold">Thông tin chung</p>
                    </div>
                </div>
                <div className="w-full px-2 mb-4">
                    <div className="relative overflow-x-auto shadow-md">
                        <div className="flex justify-between">
                            <div className="flex gap-2">
                                <div className={`px-4 py-1 uppercase border-t-2 border-l-2 cursor-pointer transition-all duration-100 bg-orange-200 font-medium`} onClick={() => handleOpenModalEdit()}>
                                    <span>Lưu</span>
                                </div>
                                <div className={`px-4 py-1 flex gap-3 items-center uppercase border-t-2 border-l-2 cursor-pointer transition-all duration-100 bg-orange-200 font-medium`} onClick={() => handleBack()}>
                                    <IoMdArrowRoundBack />
                                    <span>Quay lại</span>
                                </div>
                            </div>
                            <div className={`px-4 py-1 uppercase border-t-2 border-l-2 cursor-pointer transition-all duration-100 bg-orange-200 font-medium`} onClick={() => onChangeShowAdd()}>
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
                                </tr>
                            </thead>
                            <tbody>
                                {products?.map((item, index) => {
                                    return (
                                        <tr className="text-black border border-b border-blue-400" key={index}>
                                            <th scope="row" className="px-6 py-4 font-medium text-black border border-blue-300 whitespace-nowrap">
                                                {item?.code}
                                            </th>
                                            <td className="px-6 py-4 border border-blue-300">{item?.name}</td>
                                            <td className="px-6 py-4 border border-blue-300">{item?.unit}</td>
                                            <td className="px-6 py-4 border border-blue-300">{item?.quantity}</td>

                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
            <div className="flex flex-col w-full col-span-1 gap-4 p-4 my-4 h-fit bg-slate-100">
                <h3 className="text-lg font-semibold">Tình trạng</h3>
                <div className="flex flex-col gap-2">
                    <span>Tạo bởi</span>
                    <input type="text" disabled value={orderDetail?.employee?.name} className='w-full px-4 py-1 text-right border border-gray-500' />
                    <input type="text" disabled value={`${orderDetail?.createAtDateTime?.split('.')[0]?.split('T')[0]} ${orderDetail?.createAtDateTime?.split('.')[0]?.split('T')[1]}`} className='w-full px-4 py-1 text-right border border-gray-500' />
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between ">
                        <span>Duyệt bởi</span>
                        {orderDetail && (orderDetail?.approve === 'WAITING') && (
                            <div
                                onClick={() => handleOpenChange('APPROVED', 'Duyệt phiếu mua hàng', 'Bạn chắc chắn duyệt phiếu mua hàng này?', 'Xác nhận')}
                                className="flex items-center gap-2 px-4 py-1 transition-all duration-150 bg-orange-400 rounded-md cursor-pointer hover:bg-orange-600">
                                <span>Duyệt</span>
                                <FaKey className="" />
                            </div>)}
                        {orderDetail && orderDetail?.approve === 'APPROVED' && (
                            <div className="flex items-center gap-2 px-4 py-1 bg-orange-400 rounded-md ">
                                <span>Đã duyệt</span>
                                <FaKey className="" />
                            </div>)}
                    </div>
                    <input type="text" disabled value={orderDetail?.approve === 'APPROVED' ? orderDetail?.username : ''} className='w-full px-4 py-1 text-right border border-gray-500' />
                    <input type="text" disabled value={orderDetail?.approve === 'APPROVED' ? `${orderDetail?.actionTime?.split('.')[0]?.split('T')[0]} ${orderDetail?.actionTime?.split('.')[0]?.split('T')[1]}` : ''} className='w-full px-4 py-1 text-right border border-gray-500' />
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between ">
                        <span>Từ chối bởi</span>
                        {orderDetail && (orderDetail?.approve === 'WAITING') && (
                            <div
                                onClick={() => handleOpenChange('REJECT', 'Huỷ phiếu mua hàng', 'Bạn chắc chắn huỷ phiếu mua hàng này?', 'Xác nhận')}
                                className="flex items-center gap-2 px-4 py-1 transition-all duration-150 rounded-md cursor-pointer bg-red hover:bg-rose-500">
                                <span>Từ chối</span>
                                <FaKey className="" />
                            </div>)}
                        {orderDetail && orderDetail?.approve === 'REJECT' && (
                            <div className="flex items-center gap-2 px-4 py-1 rounded-md bg-red ">
                                <span>Đã từ chối</span>
                                <FaKey className="" />
                            </div>)}
                    </div>
                    <input type="text" disabled value={orderDetail?.approve === 'REJECT' ? orderDetail?.username : ''} className='w-full px-4 py-1 text-right border border-gray-500' />
                    <input type="text" disabled value={orderDetail?.approve === 'REJECT' ? `${orderDetail?.actionTime?.split('.')[0]?.split('T')[0]} ${orderDetail?.actionTime?.split('.')[0]?.split('T')[1]}` : ''} className='w-full px-4 py-1 text-right border border-gray-500' />
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between ">
                        <span>Đã nhập bởi</span>
                        {orderDetail && orderDetail?.deliveryStatus === 'RECEIVE_DELIVERY' && <div className="flex items-center gap-2 px-4 py-1 bg-blue-400 rounded-md ">
                            <span>Đã nhập</span>
                            <FaKey className="" />
                        </div>}
                    </div>
                    <input type="text" disabled value={''} className='w-full px-4 py-1 text-right border border-gray-500' />
                    <input type="text" disabled value={orderDetail?.deliveryStatus === 'RECEIVE_DELIVERY' ? `${orderDetail?.actionTime?.split('.')[0]?.split('T')[0]} ${orderDetail?.actionTime?.split('.')[0]?.split('T')[1]}` : ''} className='w-full px-4 py-1 text-right border border-gray-500' />
                </div>
            </div>
            {isOpenAdd && <AddProduct onChangeShowAdd={onChangeShowAdd} />}
            {isOpenModalEdit && <ModalConfirmCreate
                handleClose={() => setIsOpenModalEdit(false)}
                handleConfirm={handleEditPurchase}
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

export default EditOrder