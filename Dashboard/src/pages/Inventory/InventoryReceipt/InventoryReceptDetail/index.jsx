import { useRef } from "react";
import { useEffect, useState } from "react"
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { clearOrder, importOrder, } from "../../../../actions/orderActions";
import { axiosInstance } from "../../../../utils/axiosInstant";
import ModalConfirmCreate from "../../../../components/common/ModalConfirmCreate";
import { FaKey } from "react-icons/fa";
import ModalAlertConfirm from "../../../../components/common/ModalAlerConfirm";
import AddProduct from "../../CreateOrder/AddProduct";
import { NumericFormat } from "react-number-format";
import { formatVND } from "../../../../utils/format";

const InventoryReceptDetail = () => {
    const [listProducts, setListProducts] = useState([]);
    const [receptionDetail, setReceptionDetail] = useState('');
    const totalCost = listProducts && listProducts?.reduce((sum, product) => sum + Number(product?.unitPrice) * Number(product?.quantityShipped), Number(0));
    const ref = useRef(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { slug } = useParams();

    const getReceptionDetail = () => {
        axiosInstance
            .get(`/inventory-receipt/${slug}`)
            .then(res => {
                const data = res.data;
                setReceptionDetail(data);
                setListProducts(data.items)
                console.log(data, '=============');
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
        const action = clearOrder();
        dispatch(action)
        navigate(-1);
    }

    useEffect(() => {
        if (ref.current) return;
        ref.current = true;
        getReceptionDetail();
    }, [])


    const formatDateTime = (dateTime) => {
        return `${dateTime?.split('.')[0]?.split('T')[0]} ${dateTime?.split('.')[0]?.split('T')[1]}`
    }

    return (
        <div className="relative grid grid-cols-5 gap-2 pr-2 overflow-x-auto">
            <div className="col-span-4">
                <div className="flex items-center w-full h-auto gap-4 px-2 py-4">
                    <h3 className="text-xl font-semibold uppercase">Chỉnh sửa phiếu nhập kho</h3>
                </div>
                <div className="flex w-full gap-4 px-2 mb-2">
                    <div className="w-[60%] p-2.5 grid grid-cols-6 gap-4 border-2 border-gray-400 relative">
                        <div className="flex flex-col items-start w-full col-span-3">
                            <label htmlFor="first_name" className="block w-full text-sm font-normal text-gray-900 dark:text-white">Phiếu mua hàng<span className="pl-1 text-lg font-semibold text-red">*</span></label>
                            <input type="text" value={receptionDetail?.purchaseOrderCode} id="first_name" disabled className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className="flex flex-col items-start w-full col-span-3">
                            <label htmlFor="first_name" className="block w-full mb-2 text-sm font-normal text-gray-900 dark:text-white">Nhà cung cấp</label>
                            <input type="text" value={receptionDetail?.supplier?.name} id="first_name" disabled className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className="flex flex-col items-start w-full col-span-3">
                            <label htmlFor="first_name" className="block w-full mb-2 text-sm font-normal text-gray-900 dark:text-white">Số điện thoại</label>
                            <input type="text" id="first_name" value={receptionDetail?.supplier?.phoneNumber} disabled className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className="flex flex-col items-start w-full col-span-3">
                            <label htmlFor="first_name" className="block mb-2 text-sm font-normal text-gray-900 dark:text-white ">Địa chỉ</label>
                            <input type="text" id="first_name" value={receptionDetail?.supplier?.address} disabled className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <p className="absolute text-gray-900 top-[-16px] bg-white font-semibold">Thông tin chung</p>
                    </div>
                    <div className="w-[39%] p-2.5 flex flex-col border-2 border-gray-400 gap-1 relative">
                        <div className="flex items-center w-full">
                            <label htmlFor="accountingDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-[50%]">Ngày hạch toán</label>
                            <input type="date" disabled value={receptionDetail?.accountingDate} id="accountingDate" className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className="flex items-center w-full">
                            <label htmlFor="documentDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-[50%]">Ngày chứng từ</label>
                            <input type="date" disabled value={receptionDetail?.documentDate} id="documentDate" className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className="flex items-center w-full">
                            <label htmlFor="numberOfReceipts" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-[50%]">Số chứng từ<span className="pl-1 text-lg font-semibold text-red">*</span></label>
                            <input type="text" placeholder="Nhập số chứng từ" value={receptionDetail?.numberOfReceipts} disabled id="numberOfReceipts" className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <p className="absolute text-gray-900 top-[-16px] bg-white font-semibold">Chứng từ</p>
                    </div>
                </div>
                <div className="w-full px-2 mb-4">
                    <div className="relative overflow-x-auto shadow-md">
                        <div className="flex justify-between">
                            <div className="flex gap-2">
                                <div className={`px-4 py-1 flex gap-3 items-center uppercase border-t-2 border-l-2 cursor-pointer transition-all duration-100 bg-orange-200 font-medium`} onClick={() => handleBack()}>
                                    <IoMdArrowRoundBack />
                                    <span>Quay lại</span>
                                </div>
                            </div>
                        </div>
                        <table className="w-full text-sm text-left text-blue-100 border border-blue-400 rtl:text-right dark:text-blue-100">
                            <thead className="text-xs text-white uppercase bg-blue-400 border border-blue-400 dark:text-white">
                                <tr>
                                    <th scope="col" className="px-6 py-3 border border-blue-300">Mã hàng</th>
                                    <th scope="col" className="px-6 py-3 border border-blue-300">Tên hàng</th>
                                    <th scope="col" className="px-6 py-3 border border-blue-300">ĐVT</th>
                                    <th scope="col" className="px-6 py-3 border border-blue-300">NSX<span className="pl-1 text-lg font-semibold text-red">*</span></th>
                                    <th scope="col" className="px-6 py-3 border border-blue-300">HSD<span className="pl-1 text-lg font-semibold text-red">*</span></th>
                                    <th scope="col" className="px-6 py-3 border border-blue-300">Vị trí<span className="pl-1 text-lg font-semibold text-red">*</span></th>
                                    <th scope="col" className="px-6 py-3 border border-blue-300">Số lượng</th>
                                    <th scope="col" className="px-6 py-3 border border-blue-300 ">Giá nhập<span className="pl-1 text-lg font-semibold text-red">*</span></th>
                                    <th scope="col" className="px-6 py-3 border border-blue-300">Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listProducts?.map((item, index) => {
                                    return (
                                        <tr className="text-black border border-b border-blue-400" key={index}>
                                            <th scope="row" className="px-4 py-4 font-medium text-black border border-blue-300 whitespace-nowrap">
                                                {item?.productCode}
                                            </th>
                                            <td className="px-4 py-4 border border-blue-300">{item?.productName}</td>
                                            <td className="px-4 py-4 border border-blue-300">{item?.productUnit}</td>
                                            <td className="px-2 py-4 border border-blue-300">
                                                <input
                                                    type="date"
                                                    value={item?.dateOfManufacture}
                                                    disabled
                                                    className="w-full px-2 py-1 border border-gray-300 rounded"
                                                />
                                            </td>
                                            <td className="px-2 py-4 border border-blue-300">
                                                <input
                                                    type="date"
                                                    value={item?.dateExpired}
                                                    disabled
                                                    className="w-full px-2 py-1 border border-gray-300 rounded"
                                                />
                                            </td>
                                            <td className="px-4 py-4 border border-blue-300">
                                                <input
                                                    type="text"
                                                    placeholder="Nhập vị trí..."
                                                    value={item?.location}
                                                    disabled
                                                    className="w-full px-2 py-1 border border-gray-300 rounded"
                                                />
                                            </td>
                                            <td className="px-4 py-4 text-center border border-blue-300">{item?.quantityShipped}</td>
                                            <td className="px-2 py-4 border border-blue-300">
                                                <NumericFormat type="text" name="price" id="price"
                                                    className="block w-full px-2 py-1 text-sm text-gray-900 border rounded-lg outline-none focus:ring-primary-600 focus:border-primary-600 dark:text-white"
                                                    value={item?.unitPrice}
                                                    thousandSeparator=","
                                                    displayType="input"
                                                    placeholder="Giá thiết bị"
                                                    suffix=" VNĐ"
                                                    disabled
                                                />
                                            </td>
                                            <td className="px-4 py-4 border border-blue-300">{formatVND(item?.unitPrice * item?.quantityShipped)}</td>
                                        </tr>
                                    )
                                })}
                                {receptionDetail?.items?.length !== 0 && (
                                    <tr className="text-black border border-b border-blue-400" >
                                        <th scope="row" className="px-4 py-4 font-medium text-black border border-l-0 border-r-0 border-blue-300 whitespace-nowrap">Tổng tiền:</th>
                                        <td className="px-4 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                        <td className="px-4 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                        <td className="px-4 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                        <td className="px-4 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                        <td className="px-4 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                        <td className="px-4 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                        <td className="px-4 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                        <td className="px-4 py-4 border border-r-0 border-blue-300">{formatVND(totalCost)}</td>
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
                    <input type="text" disabled value={receptionDetail?.employee?.name} className='w-full px-4 py-1 text-right border border-gray-500' />
                    <input type="text" disabled value={formatDateTime(receptionDetail?.createAtDateTime)} className='w-full px-4 py-1 text-right border border-gray-500' />
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between ">
                        <span>Duyệt bởi</span>
                        {receptionDetail && receptionDetail?.approve === 'APPROVED' && (
                            <div className="flex items-center gap-2 px-4 py-1 bg-orange-400 rounded-md ">
                                <span>Đã duyệt</span>
                                <FaKey className="" />
                            </div>)}
                    </div>
                    <input type="text" disabled value={receptionDetail?.approve === 'APPROVED' ? receptionDetail?.username : ''} className='w-full px-4 py-1 text-right border border-gray-500' />
                    <input type="text" disabled value={receptionDetail?.approve === 'APPROVED' ? `${receptionDetail?.actionTime?.split('.')[0]?.split('T')[0]} ${receptionDetail?.actionTime?.split('.')[0]?.split('T')[1]}` : ''} className='w-full px-4 py-1 text-right border border-gray-500' />
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between ">
                        <span>Từ chối bởi</span>
                        {receptionDetail && receptionDetail?.approve === 'REJECTED' && (
                            <div className="flex items-center gap-2 px-4 py-1 rounded-md bg-red ">
                                <span>Đã từ chối</span>
                                <FaKey className="" />
                            </div>)}
                    </div>
                    <input type="text" disabled value={receptionDetail?.approve === 'REJECTED' ? receptionDetail?.username : ''} className='w-full px-4 py-1 text-right border border-gray-500' />
                    <input type="text" disabled value={receptionDetail?.approve === 'REJECTED' ? `${receptionDetail?.actionTime?.split('.')[0]?.split('T')[0]} ${receptionDetail?.actionTime?.split('.')[0]?.split('T')[1]}` : ''} className='w-full px-4 py-1 text-right border border-gray-500' />
                </div>
            </div>

        </div>
    )
}

export default InventoryReceptDetail