import { useRef } from "react";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../../utils/axiosInstant";
import { formatVND } from "../../../../utils/format";
import { FaKey } from "react-icons/fa";
import ModalAlertConfirm from "../../../../components/common/ModalAlerConfirm";
import { IoMdArrowRoundBack } from "react-icons/io";
import { clearOrderSale } from "../../../../actions/saleActions";

const EditExportDelivery = () => {
    const [listOrderProducts, setListOrderProducts] = useState([]);
    const [orderDetail, setOrderDetail] = useState({});
    const [statusChange, setStatusChange] = useState('APPROVED');
    const [titleModalConfirm, setTitleModalConfirm] = useState('');
    const [contentModalConfirm, setContentModalConfirm] = useState('');
    const [titleModalBtnConfirm, setTitleModalBtnConfirm] = useState('');
    const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false);
    const totalCost = listOrderProducts && listOrderProducts?.reduce((sum, product) => sum + Number(product?.exportQuantity * product?.priceExport), Number(0));
    const ref = useRef(false);
    const dispath = useDispatch();
    const { slug } = useParams();
    const navigate = useNavigate();

    const getOrderDetail = () => {
        axiosInstance
            .get(`/inventory-delivery/${slug}`)
            .then(res => {
                const data = res.data;
                setOrderDetail(data);
                setListOrderProducts(data?.products)
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

    const handleOpenChange = () => {
        const title = statusChange === 'REJECTED' ? 'Huỷ phiếu xuất kho' : 'Duyệt phiếu xuất kho';
        const content = statusChange === 'REJECTED' ? 'Bạn chắc chắn huỷ phiếu xuất kho này?' : 'Bạn chắc chắn duyệt phiếu xuất kho này?';
        const titleBtnConfirm = 'Xác nhận';
        setTitleModalConfirm(title);
        setContentModalConfirm(content);
        setTitleModalBtnConfirm(titleBtnConfirm);
        setIsOpenModalConfirm(true);
    }

    const handleChangeStatus = () => {
        axiosInstance
            .put(`/inventory-delivery/${slug}/${statusChange === 'APPROVED' ? 'approve' : 'reject'}`)
            .then(res => {
                const contentStatus = statusChange === 'APPROVED' ? "Duyệt" : 'Huỷ ';
                toast.success(`${contentStatus} phiếu bán hàng thành công!`);
                getOrderDetail();
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

    useEffect(() => {
        if (ref.current) return;
        ref.current = true;
        getOrderDetail();
    }, [slug])

    const formatDate = (date) => {
        return `${date?.split('.')[0]?.split('T')[0]} ${date?.split('.')[0]?.split('T')[1]}`;
    }

    return (
        <div className="relative grid grid-cols-4 gap-2 pr-2 overflow-x-auto">
            <div className="col-span-3">
                <div className="flex items-center w-full h-auto gap-4 px-2 py-4">
                    <h3 className="text-xl font-semibold uppercase">Chỉnh sửa phiếu xuất kho</h3>
                </div>
                <div className="flex w-full gap-4 px-2 mb-2">
                    <div className="w-full p-2.5 gap-4 border-2 border-gray-400 relative">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col items-start w-full">
                                <label htmlFor="phoneNumber" className="block w-full mb-2 text-sm font-normal text-gray-900 dark:text-white">Số điện thoại</label>
                                <input type="text" id="phoneNumber" value={orderDetail?.customer?.phoneNumber} disabled className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div className="flex flex-col items-start w-full">
                                <label htmlFor="customerName" className="block w-full mb-2 text-sm font-normal text-gray-900 dark:text-white">Tên khách hàng</label>
                                <input type="text" id="customerName" value={orderDetail?.customer?.name} disabled className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div className="flex flex-col items-start w-full">
                                <label htmlFor="address" className="block mb-2 text-sm font-normal text-gray-900 dark:text-white ">Địa chỉ</label>
                                <input type="text" id="address" value={orderDetail?.customer?.address} disabled className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div className="flex flex-col items-start w-full">
                                <label htmlFor="taxNumber" className="block mb-2 text-sm font-normal text-gray-900 dark:text-white ">Mã số thuế</label>
                                <input type="text" id="taxNumber" value={orderDetail?.taxNumber} disabled className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                        </div>
                        <p className="absolute text-gray-900 top-[-16px] bg-white font-semibold">Thông tin khách hàng</p>
                    </div>
                </div>
                <div className="w-full px-2 mb-4">
                    <div className="relative overflow-x-auto shadow-md">
                        <div className="flex justify-between">
                            <div className="flex gap-2">
                                <div className={`px-4 py-1 flex gap-3 items-center uppercase border-t-2 border-l-2 cursor-pointer transition-all duration-100 bg-orange-200 font-medium`} onClick={() => navigate(-1)}>
                                    <IoMdArrowRoundBack />
                                    <span>Quay lại</span>
                                </div>
                            </div>
                        </div>
                        <table className="w-full text-sm text-left text-blue-100 border border-blue-400 rtl:text-right dark:text-blue-100">
                            <thead className="text-xs text-white uppercase bg-blue-400 border border-blue-400 dark:text-white">
                                <tr>
                                    <th scope="col" className="px-6 py-3 border border-blue-300">STT</th>
                                    <th scope="col" className="px-6 py-3 border border-blue-300">Mã hàng</th>
                                    <th scope="col" className="px-6 py-3 border border-blue-300">Tên hàng</th>
                                    <th scope="col" className="px-6 py-3 border border-blue-300">ĐVT</th>
                                    <th scope="col" className="px-6 py-3 border border-blue-300">Số lượng</th>
                                    <th scope="col" className="px-6 py-3 border border-blue-300">Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listOrderProducts?.map((item, index) => {
                                    return (
                                        <tr className="text-black border border-b border-blue-400" key={index}>
                                            <th scope="row" className="px-6 py-4 font-medium text-black border border-blue-300 whitespace-nowrap">
                                                {index + 1}
                                            </th>
                                            <td className="px-6 py-4 border border-blue-300">{item?.product?.code}</td>
                                            <td className="px-6 py-4 border border-blue-300">{item?.product?.name}</td>
                                            <td className="px-6 py-4 border border-blue-300">{item?.product?.unitName}</td>
                                            <td className="px-6 py-4 border border-blue-300">{item?.exportQuantity}</td>
                                            <td className="px-6 py-4 border border-blue-300">{formatVND(item?.priceExport)}</td>
                                        </tr>
                                    )
                                })}
                                {listOrderProducts?.length !== 0 && (
                                    <>
                                        <tr className="text-black border border-b border-blue-400" >
                                            <th scope="row" className="px-6 py-4 font-medium text-black border border-l-0 border-r-0 border-blue-300 whitespace-nowrap">Cộng tiền hàng:</th>
                                            <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                            <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                            <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                            <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                            <td className="px-6 py-4 border border-r-0 border-blue-300">{formatVND(orderDetail?.totalAmount)}</td>
                                        </tr>
                                        <tr className="text-black border border-b border-blue-400" >
                                            <th scope="row" className="px-6 py-4 font-medium text-black border border-l-0 border-r-0 border-blue-300 whitespace-nowrap">Thuế GTGT:</th>
                                            <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300">{`${orderDetail?.taxExportGtGt * 100} %`}</td>
                                            <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                            <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                            <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                            <td className="px-6 py-4 border border-r-0 border-blue-300">{formatVND(orderDetail?.totalAmount * orderDetail?.taxExportGtGt)}</td>
                                        </tr>
                                        <tr className="text-black border border-b border-blue-400" >
                                            <th scope="row" className="px-6 py-4 font-medium text-black border border-l-0 border-r-0 border-blue-300 whitespace-nowrap">Tổng tiền thanh toán:</th>
                                            <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                            <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                            <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                            <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                            <td className="px-6 py-4 border border-r-0 border-blue-300">{formatVND(orderDetail?.totalAmount * (orderDetail?.taxExportGtGt + 1))}</td>
                                        </tr>
                                    </>
                                )}
                                {listOrderProducts?.length === 0 && (
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
            </div >
            <div className="flex flex-col w-full col-span-1 gap-4 p-4 my-4 h-fit bg-slate-100">
                <h3 className="text-lg font-semibold">Tình trạng</h3>
                <div className="flex flex-col gap-2">
                    <span>Tạo bởi</span>
                    <input type="text" disabled value={orderDetail?.employee?.name} className='w-full px-4 py-1 text-right border border-gray-500' />
                    <input type="text" disabled value={`${formatDate(orderDetail?.createAt)} `} className='w-full px-4 py-1 text-right border border-gray-500' />
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between ">
                        {orderDetail?.approveStatus !== 'WAITING' && <span>{orderDetail?.approveStatus === 'APPROVED' ? 'Duyệt bởi' : 'Từ chối bởi'}</span>}
                        {orderDetail?.approveStatus === 'WAITING' && <div className="flex justify-between w-full ">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="approval"
                                    value="REJECTED"
                                    checked={statusChange === 'REJECTED'}
                                    onChange={() => setStatusChange('REJECTED')}
                                    className="scale-150 accent-rose-500"
                                />
                                <span className="text-black">Từ chối</span>
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="approval"
                                    value="APPROVED"
                                    checked={statusChange === 'APPROVED'}
                                    onChange={() => setStatusChange('APPROVED')}
                                    className="scale-150 accent-orange-500"
                                />
                                <span className="text-black">Duyệt</span>
                            </label>
                        </div>}
                        {orderDetail && orderDetail?.approveStatus === 'APPROVED' && (
                            <div className="flex items-center gap-2 px-4 py-1 bg-orange-400 rounded-md ">
                                <span>Đã duyệt</span>
                                <FaKey className="" />
                            </div>)}
                        {orderDetail && orderDetail?.approveStatus === 'REJECTED' && (
                            <div className="flex items-center gap-2 px-4 py-1 rounded-md bg-red ">
                                <span>Đã từ chối</span>
                                <FaKey className="" />
                            </div>)}
                    </div>
                    <input type="text" disabled value={orderDetail?.approveStatus !== 'WAITING' ? orderDetail?.approveBy : ''} className='w-full px-4 py-1 text-right border border-gray-500' />
                    <input type="text" disabled value={orderDetail?.approveStatus !== 'WAITING' ? `${formatDate(orderDetail?.approveDate)} ` : ''} className='w-full px-4 py-1 text-right border border-gray-500' />
                </div>
                {orderDetail?.approveStatus === 'WAITING' && <div className="flex justify-end">
                    <div
                        onClick={() => handleOpenChange()}
                        className="flex items-center justify-center px-2 py-1 transition-all duration-150 bg-blue-400 rounded-md cursor-pointer font-semibold w-[40%] hover:bg-blue-600">
                        <span>Xác nhận</span>
                    </div>
                </div>}
            </div>
            {isOpenModalConfirm && <ModalAlertConfirm
                title={titleModalConfirm}
                content={contentModalConfirm}
                handleClose={() => setIsOpenModalConfirm(false)}
                handleConfirm={handleChangeStatus}
                titleBtnConfirm={titleModalBtnConfirm}
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

export default EditExportDelivery
