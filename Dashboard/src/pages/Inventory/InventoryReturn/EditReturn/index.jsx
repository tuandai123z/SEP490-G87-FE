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

const EditReturnForm = () => {
    const [listOrderProducts, setListOrderProducts] = useState([]);
    const [returnDetail, setReturnDetail] = useState({});
    const [statusChange, setStatusChange] = useState('');
    const [titleModalConfirm, setTitleModalConfirm] = useState('');
    const [contentModalConfirm, setContentModalConfirm] = useState('');
    const [titleModalBtnConfirm, setTitleModalBtnConfirm] = useState('');
    const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false);
    const totalCost = listOrderProducts && listOrderProducts?.reduce((sum, product) => sum + Number(product?.exportQuantity * product?.priceExport), Number(0));
    const ref = useRef(false);
    const { slug } = useParams();
    const navigate = useNavigate();

    const getReturnDetail = () => {
        axiosInstance
            .get(`/return-form/${slug}`)
            .then(res => {
                const data = res.data;
                setReturnDetail(data?.returnForm);
                console.log(data, '---------------');
                setListOrderProducts(data?.returnProducts)
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

    const handleChangeStatus = () => {
        axiosInstance
            .put(`/inventory-delivery/${slug}/${statusChange === 'APPROVED' ? 'approve' : 'reject'}`)
            .then(res => {
                const contentStatus = statusChange === 'APPROVED' ? "Duyệt" : 'Huỷ ';
                toast.success(`${contentStatus} phiếu bán hàng thành công!`);
                getReturnDetail();
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
        getReturnDetail();
    }, [slug])

    const formatDate = (date) => {
        return `${date?.split('.')[0]?.split('T')[0]} ${date?.split('.')[0]?.split('T')[1]}`;
    }

    return (
        <div className="relative grid grid-cols-4 gap-2 pr-2 overflow-x-auto">
            <div className="col-span-3">
                <div className="flex items-center w-full h-auto gap-4 px-2 py-4">
                    <h3 className="text-xl font-semibold uppercase">Thông tin phiếu hoàn hàng</h3>
                </div>
                <div className="flex w-full gap-4 px-2 mb-2">
                    <div className="w-full p-2.5 gap-4 border-2 border-gray-400 relative">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col items-start w-full">
                                <label htmlFor="phoneNumber" className="block w-full mb-2 text-sm font-normal text-gray-900 dark:text-white">Số điện thoại</label>
                                <input type="text" id="phoneNumber" value={returnDetail?.customer?.phoneNumber} disabled className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div className="flex flex-col items-start w-full">
                                <label htmlFor="customerName" className="block w-full mb-2 text-sm font-normal text-gray-900 dark:text-white">Tên khách hàng</label>
                                <input type="text" id="customerName" value={returnDetail?.customer?.name} disabled className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div className="flex flex-col items-start w-full">
                                <label htmlFor="address" className="block mb-2 text-sm font-normal text-gray-900 dark:text-white ">Địa chỉ</label>
                                <input type="text" id="address" value={returnDetail?.customer?.address} disabled className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div className="flex flex-col items-start w-full">
                                <label htmlFor="taxNumber" className="block mb-2 text-sm font-normal text-gray-900 dark:text-white ">Mã số thuế</label>
                                <input type="text" id="taxNumber" value={returnDetail?.taxNumber} disabled className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
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
                                    <th scope="col" className="px-6 py-3 border border-blue-300">Lý do</th>
                                    <th scope="col" className="px-6 py-3 border border-blue-300">Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listOrderProducts?.map((item, index) => {
                                    return (
                                        <tr className="text-black border border-b border-blue-400" key={index}>
                                            <th className="px-6 py-4 border border-blue-300">
                                                {index + 1}
                                            </th>
                                            <td className="px-6 py-4 border border-blue-300">{item?.productInformation?.code}</td>
                                            <td className="px-6 py-4 border border-blue-300">{item?.productInformation?.name}</td>
                                            <td className="px-6 py-4 border border-blue-300">{item?.productInformation?.unit}</td>
                                            <td className="px-6 py-4 border border-blue-300">{item?.quantityReturn}</td>
                                            <td className="px-6 py-4 border border-blue-300">{item?.reason}</td>
                                            <td className="px-6 py-4 border border-blue-300">{formatVND(item?.exportQuantity * item?.priceExport)}</td>
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
                                            <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                            <td className="px-6 py-4 border border-r-0 border-blue-300">{formatVND(totalCost)}</td>
                                        </tr>
                                        <tr className="text-black border border-b border-blue-400" >
                                            <th scope="row" className="px-6 py-4 font-medium text-black border border-l-0 border-r-0 border-blue-300 whitespace-nowrap">Thuế GTGT:</th>
                                            <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300">{`${returnDetail?.taxExportGtGt * 100} %`}</td>
                                            <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                            <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                            <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                            <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                            <td className="px-6 py-4 border border-r-0 border-blue-300">{formatVND(totalCost * returnDetail?.taxExportGtGt)}</td>
                                        </tr>
                                        <tr className="text-black border border-b border-blue-400" >
                                            <th scope="row" className="px-6 py-4 font-medium text-black border border-l-0 border-r-0 border-blue-300 whitespace-nowrap">Tổng tiền thanh toán:</th>
                                            <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                            <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                            <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                            <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                            <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                            <td className="px-6 py-4 border border-r-0 border-blue-300">{formatVND(totalCost * (returnDetail?.taxExportGtGt + 1))}</td>
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
                    <input type="text" disabled value={returnDetail?.employee?.name} className='w-full px-4 py-1 text-right border border-gray-500' />
                    <input type="text" disabled value={`${formatDate(returnDetail?.createAt)} `} className='w-full px-4 py-1 text-right border border-gray-500' />
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between ">
                        <span>Duyệt bởi</span>
                        {returnDetail && (returnDetail?.approveStatus === 'WAITING') && (
                            <div
                                onClick={() => handleOpenChange('APPROVED', 'Duyệt phiếu xuất kho', 'Bạn chắc chắn duyệt phiếu xuất kho này?', 'Xác nhận')}
                                className="flex items-center gap-2 px-4 py-1 transition-all duration-150 bg-orange-400 rounded-md cursor-pointer hover:bg-orange-600">
                                <span>Duyệt</span>
                                <FaKey className="" />
                            </div>)}
                        {returnDetail && returnDetail?.approveStatus === 'APPROVED' && (
                            <div className="flex items-center gap-2 px-4 py-1 bg-orange-400 rounded-md ">
                                <span>Đã duyệt</span>
                                <FaKey className="" />
                            </div>)}
                    </div>
                    <input type="text" disabled value={returnDetail?.approveStatus === 'APPROVED' ? returnDetail?.approveBy : ''} className='w-full px-4 py-1 text-right border border-gray-500' />
                    <input type="text" disabled value={returnDetail?.approveStatus === 'APPROVED' ? `${formatDate(returnDetail?.approveDate)} ` : ''} className='w-full px-4 py-1 text-right border border-gray-500' />
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between ">
                        <span>Từ chối bởi</span>
                        {returnDetail && (returnDetail?.approveStatus === 'WAITING') && (
                            <div
                                onClick={() => handleOpenChange('REJECTED', 'Huỷ phiếu xuất kho ', 'Bạn chắc chắn huỷ phiếu xuất kho  này?', 'Xác nhận')}
                                className="flex items-center gap-2 px-4 py-1 transition-all duration-150 rounded-md cursor-pointer bg-red hover:bg-rose-500">
                                <span>Từ chối</span>
                                <FaKey className="" />
                            </div>)}
                        {returnDetail && returnDetail?.approveStatus === 'REJECTED' && (
                            <div className="flex items-center gap-2 px-4 py-1 rounded-md bg-red ">
                                <span>Đã từ chối</span>
                                <FaKey className="" />
                            </div>)}
                    </div>
                    <input type="text" disabled value={returnDetail?.approveStatus === 'REJECTED' ? returnDetail?.approveBy : ''} className='w-full px-4 py-1 text-right border border-gray-500' />
                    <input type="text" disabled value={returnDetail?.approveStatus === 'REJECTED' ? `${formatDate(returnDetail?.approveDate)} ` : ''} className='w-full px-4 py-1 text-right border border-gray-500' />
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between ">
                        <span>Đã nhập bởi</span>
                        {returnDetail && returnDetail?.deliveryStatus === 'RECEIVE_DELIVERY' && <div className="flex items-center gap-2 px-4 py-1 bg-blue-400 rounded-md ">
                            <span>Đã nhập</span>
                            <FaKey className="" />
                        </div>}
                    </div>
                    <input type="text" disabled value={''} className='w-full px-4 py-1 text-right border border-gray-500' />
                    <input type="text" disabled value={returnDetail?.deliveryStatus === 'RECEIVE_DELIVERY' ? `${formatDate(returnDetail?.actionTime)} ` : ''} className='w-full px-4 py-1 text-right border border-gray-500' />
                </div>
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

export default EditReturnForm
