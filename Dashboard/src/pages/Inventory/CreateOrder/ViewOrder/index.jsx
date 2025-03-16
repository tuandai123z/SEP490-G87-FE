import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaKey } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../../utils/axiosInstant";
import { clearOrder, importOrder } from "../../../../actions/orderActions";


const ViewOrder = () => {
    const [currentSupplierId, setCurrentSupplierId] = useState('');
    const [currentSupplier, setCurrentSupplier] = useState({});
    const [listSuppliers, setListSuppliers] = useState([]);
    const [expectedDateShipped, setExpectedDateShipped] = useState('');
    const [orderDetail, setOrderDetail] = useState('');
    const [listProducts, setListProducts] = useState([]);
    const dataUser = useSelector(state => state.user);
    const dispatch = useDispatch();
    const products = useSelector(state => state.order);
    const ref = useRef(false);
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



    return (
        <div className="relative grid grid-cols-4 gap-2 pr-2 overflow-x-auto">
            <div className="col-span-3">
                <div className="flex items-center w-full h-auto gap-4 px-2 py-4">
                    <h3 className="text-xl font-semibold uppercase">Thông tin phiếu mua hàng</h3>
                    <select id="jobRank" value={currentSupplierId} disabled className="bg-gray-50 w-[20%] border border-gray-300 text-gray-900 text-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <option value={""}>---Nhà cung cấp---</option>
                        {listSuppliers?.map((supplier, index) => {
                            return <option value={supplier?.id} key={index}>{supplier?.name}</option>
                        })}
                    </select>
                </div>
                <div className="flex w-full gap-4 px-2 mb-2">
                    <div className="w-full p-2.5 grid grid-cols-2 gap-4 border-2 border-gray-400 relative">
                        <div className="flex flex-col items-start w-full">
                            <label htmlFor="supplier" className="block w-full mb-2 text-sm font-normal text-gray-900 dark:text-white">Nhà cung cấp</label>
                            <input type="text" value={currentSupplier?.name} id="supplier" disabled className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className="flex flex-col items-start w-full">
                            <label htmlFor="first_name" className="block w-full mb-2 text-sm font-normal text-gray-900 dark:text-white">Số điện thoại</label>
                            <input type="text" value={currentSupplier?.phoneNumber} id="first_name" disabled className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className="flex flex-col items-start w-full">
                            <label htmlFor="first_name" className="block mb-2 text-sm font-normal text-gray-900 dark:text-white ">Địa chỉ</label>
                            <input type="text" value={currentSupplier?.address} id="first_name" disabled className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className="flex flex-col items-start w-full">
                            <label htmlFor="first_name" className="block w-full mb-2 text-sm font-normal text-gray-900 dark:text-white">Ngày giao hàng dự kiến</label>
                            <input type="date" value={expectedDateShipped} id="first_name" disabled className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <p className="absolute text-gray-900 top-[-16px] bg-white font-semibold">Thông tin chung</p>
                    </div>
                </div>
                <div className="w-full px-2 mb-4">
                    <div className="relative overflow-x-auto shadow-md">
                        <div className="flex justify-between">
                            <div className={`px-4 py-1 flex gap-3 items-center uppercase border-t-2 border-l-2 cursor-pointer transition-all duration-100 bg-orange-200 font-medium`} onClick={() => navigate('/inventory/order/management')}>
                                <IoMdArrowRoundBack />
                                <span>Quay lại</span>
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
                    <input type="text" disabled value={orderDetail?.createAt} className='w-full px-4 py-1 text-right border border-gray-500' />
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between ">
                        <span>Duyệt bởi</span>

                        {orderDetail && orderDetail?.approve === 'APPROVED' && (
                            <div className="flex items-center gap-2 px-4 py-1 bg-orange-400 rounded-md ">
                                <span>Đã duyệt</span>
                                <FaKey className="" />
                            </div>)}
                    </div>
                    <input type="text" disabled value={orderDetail?.approve === 'APPROVED' ? orderDetail?.employee?.name : ''} className='w-full px-4 py-1 text-right border border-gray-500' />
                    <input type="text" disabled value={orderDetail?.approve === 'APPROVED' ? `${orderDetail?.actionTime?.split('.')[0]?.split('T')[0]} ${orderDetail?.actionTime?.split('.')[0]?.split('T')[1]}` : ''} className='w-full px-4 py-1 text-right border border-gray-500' />
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between ">
                        <span>Từ chối bởi</span>
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
        </div>
    )
}

export default ViewOrder
