import { TbEyeSearch } from "react-icons/tb";
import { MdModeEditOutline } from "react-icons/md";
import { FaSearch, FaTrashAlt } from "react-icons/fa";
import { useState } from "react"
import { axiosInstance } from "../../../utils/axiosInstant";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LIST_STATUS_FILTER_ORDER } from "./const";
import Pagination from "../../../components/common/Pagination";


const OrderManagement = () => {
    const [listOrders, setListOrders] = useState([]);
    const [currentStatusOrder, setCurrentStatusOrder] = useState('')
    const [orderCode, setOrderCode] = useState('');
    const [currentSupplierId, setCurrentSupplierId] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [listSuppliers, setListSuppliers] = useState([]);
    const [toDate, setToDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationInformation, setPaginationInformation] = useState('');
    const size = 8;
    const navigate = useNavigate();

    const getListOrders = () => {
        axiosInstance
            .get(`/purchase-order/find`, {
                params: {
                    ...(currentStatusOrder && currentStatusOrder !== 'RECEIVE_DELIVERY' ? { approveStatus: currentStatusOrder } : { deliveryStatus: currentStatusOrder }),
                    ...(fromDate ? { fromDate: fromDate } : {}),
                    ...(toDate ? { toDate: toDate } : {}),
                    code: `${orderCode}`,
                    ...(currentSupplierId !== '' ? { supplierId: currentSupplierId } : {}),
                    page: currentPage - 1,
                    size: size,
                }
            })
            .then(res => {
                const data = res.data;
                setListOrders(data?.content);
                setPaginationInformation(data);
                console.log(data);
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

    const handleSearch = () => {
        getListOrders();
    }

    useEffect(() => {
        getListOrders();
    }, [currentPage])

    useEffect(() => {
        getListSupplier();
    }, [])
    const handleFromDateChange = (e) => {
        const newFromDate = e.target.value;
        if (toDate && new Date(newFromDate) > new Date(toDate)) {
            setToDate(newFromDate);
        }
        setFromDate(newFromDate);
    };

    const handleToDateChange = (e) => {
        const newToDate = e.target.value;
        if (fromDate && new Date(newToDate) < new Date(fromDate)) {
            setFromDate(newToDate);
        }
        setToDate(newToDate);
    };
    return (
        <div className="relative overflow-x-auto ">
            <div className="flex items-center w-full h-auto gap-4 px-2 py-4">
                <h3 className="text-xl font-semibold uppercase">Phiếu mua hàng</h3>
            </div>
            <div className="flex w-full gap-4 px-2 mb-2">
                <div className="w-full p-2.5 grid grid-cols-4 gap-4 border-2 border-gray-400 relative">
                    <div className="grid grid-cols-3 col-span-3 gap-4">
                        <div className="flex items-center w-full col-span-1">
                            <label htmlFor="code" className="block mb-2 text-sm font-normal pr-2 text-gray-900 dark:text-white w-[25%]">Mã phiếu</label>
                            <input type="text" id="code" value={orderCode} onChange={e => setOrderCode(e.target.value)} className="block w-[75%] p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className="flex items-center w-full col-span-2 gap ">
                            <label htmlFor="first_name" className="block mb-2 text-sm font-normal pr-2 text-right text-gray-900 dark:text-white w-[20%]">Nhà cung cấp</label>
                            <select id="jobRank" value={currentSupplierId} onChange={e => setCurrentSupplierId(e.target.value)} className="bg-gray-50 w-[80%] border border-gray-300 text-gray-900 text-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option value={""}>---Nhà cung cấp---</option>
                                {listSuppliers?.map((supplier, index) => {
                                    return <option value={supplier?.id} key={index}>{supplier?.name}</option>
                                })}
                            </select>
                        </div>
                        <div className="flex items-center w-full col-span-1 gap">
                            <label htmlFor="first_name" className="block mb-2 text-sm font-normal pr-2 text-right text-gray-900 dark:text-white w-[25%]">Tình trạng</label>
                            <select id="statusOrder" value={currentStatusOrder} onChange={e => setCurrentStatusOrder(e.target.value)} className="bg-gray-50 w-[80%] border border-gray-300 text-gray-900 text-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option value={""}>-----Chọn trạng thái-------</option>
                                {LIST_STATUS_FILTER_ORDER?.map((status, index) => {
                                    return <option value={status?.approveStatus} key={index}>{status?.title}</option>
                                })}
                            </select>
                        </div>
                        <div className="flex items-center w-full col-span-1 gap">
                            <label htmlFor="first_name" className="block mb-2 text-sm font-normal pr-2 text-right text-gray-900 dark:text-white w-[40%]">Từ ngày</label>
                            <input type="date" id="first_name" value={fromDate} onChange={handleFromDateChange} className="block w-[60%] text-sm p-1 text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className="flex items-center w-full col-span-1 gap">
                            <label htmlFor="first_name" className="block mb-2 text-sm font-normal pr-2 text-right text-gray-900 dark:text-white w-[40%]">Đến ngày</label>
                            <input type="date" id="first_name" value={toDate} onChange={handleToDateChange} className="block w-[60%] text-sm p-1 text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <button className="flex items-center gap-2 px-6 py-2 font-medium text-white bg-blue-400 rounded-md" onClick={handleSearch}>Tìm kiếm<FaSearch className="rotate-90" /></button>
                    </div>

                    <p className="absolute text-gray-900 top-[-16px] bg-white font-semibold">Thông tin chung</p>
                </div>
            </div>
            <div className="w-full px-2">
                <div className="relative overflow-x-auto shadow-md">
                    <div className="flex justify-end py-2">
                        <div
                            className={`px-6 py-2 border-t-2 border-l-2 cursor-pointer transition-all duration-100 bg-blue-400  text-white font-semibold`}
                            onClick={() => { navigate('/inventory/order/create') }}>
                            <span className="uppercase" >Tạo phiếu mua hàng</span>
                        </div>
                    </div>
                    <table className="w-full text-sm text-left text-blue-100 border border-blue-400 shadow-sm rtl:text-right dark:text-blue-100">
                        <thead className="text-xs text-white uppercase bg-blue-400 border border-blue-400 dark:text-white">
                            <tr>
                                <th className="px-6 py-3 text-right border border-blue-400">STT</th>
                                <th className="px-6 py-3 text-right border-white">Mã Phiếu</th>
                                <th className="px-6 py-3 text-center border border-blue-400">Nguồn nhận</th>
                                <th className="px-6 py-3 text-center border border-blue-400">Thời gian</th>
                                <th className="px-6 py-3 text-center border border-blue-400">Dự kiến</th>
                                <th className="px-6 py-3 text-center border border-blue-400">Tình trạng</th>
                                <th className="px-6 py-3 text-center border border-blue-400">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listOrders?.map((order, index) => {
                                return (
                                    <tr className="text-black border border-b border-blue-400" key={index}>
                                        <th scope="row" className="px-6 py-2 font-medium text-right text-black border border-blue-300 whitespace-nowrap">
                                            {(currentPage - 1) * size + index + 1}
                                        </th>
                                        <td className="px-6 py-2 text-right border border-blue-400">{order?.code}</td>
                                        <td className="px-6 py-2 text-right border border-blue-400">{order?.supplierName}</td>
                                        <td className="px-6 py-2 text-right border border-blue-400">{order?.createAt}</td>
                                        <td className="px-6 py-2 text-right border border-blue-400">{order?.deliveryDate}</td>
                                        <td className="px-6 py-2 text-center border border-blue-400">
                                            {order?.approve === 'WAITING' && <span className="px-4 py-1 font-medium uppercase bg-orange-300 rounded-lg">CHỜ DUYỆT</span>}
                                            {order?.approve === 'REJECTED' && <span className="px-4 py-1 font-medium uppercase rounded-lg bg-red">TỪ CHỐI</span>}
                                            {(order?.approve === 'APPROVED' && order?.deliveryStatus === 'WAITING_DELIVERY') && <span className="px-4 py-1 font-medium uppercase rounded-lg bg-green">CHỜ GIAO HÀNG</span>}
                                            {order?.deliveryStatus === 'IMPORT_SUCCESS' && <span className="px-4 py-1 font-medium uppercase bg-blue-600 rounded-lg">ĐÃ NHẬP</span>}
                                        </td>
                                        <td className="flex items-center justify-center gap-3 px-6 py-2 border-blue-400 ">
                                            {order?.approve === 'WAITING' && <MdModeEditOutline className="text-lg font-bold text-blue-700 transition-all duration-500 shadow-sm cursor-pointer hover:scale-[140%] " onClick={() => navigate((`/inventory/order/edit/${order?.code}`))} />}
                                            {order?.approve !== 'WAITING' && <TbEyeSearch className="text-lg font-bold text-blue-700 transition-all duration-500 shadow-sm cursor-pointer hover:scale-[140%] " onClick={() => navigate((`/inventory/order/view/${order?.code}`))} />}
                                            {/* <FaTrashAlt className="text-lg font-bold transition-all duration-150 shadow-sm cursor-pointer hover:scale-[140%] text-red" /> */}
                                        </td>
                                    </tr>
                                )
                            })}
                            {listOrders?.length === 0 && (
                                <tr className="text-black border border-b border-blue-400" >
                                    <th scope="row" className="px-6 py-2 font-medium text-right text-black border border-r-0 border-blue-300 whitespace-nowrap">
                                        Không tìm thấy phiếu mua
                                    </th>

                                </tr>
                            )}
                        </tbody>
                    </table>
                    {listOrders?.length !== 0 && (
                        <Pagination
                            totalPages={paginationInformation?.totalElements}
                            size={size}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                            content={'phiếu mua hàng'}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default OrderManagement
