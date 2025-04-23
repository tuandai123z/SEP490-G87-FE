import { useRef } from "react";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../../utils/axiosInstant";
import { IoMdArrowRoundBack } from "react-icons/io";
import { formatVND } from "../../../../utils/format";
import { clearOrderSale, importOrderSale } from "../../../../actions/saleActions";
import { FaFileExport, FaKey } from "react-icons/fa";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import InvoicePDF from "../component/InvoicePDF";

const ViewOrderSale = () => {
    const [orderSaleDetail, setOrderSaleDetail] = useState('');
    const order = useSelector(state => state.sale);
    const user = useSelector(state => state.user);
    const [listProductSale, setListProductSale] = useState(order);
    const [currentCustomer, setCurrentCustomer] = useState({});
    const [currentDataPDF, setCurrentDataPDF] = useState({});
    const contentRef = useRef();
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

    const formatDate = (date) => {
        return `${date?.split('.')[0]?.split('T')[0]} ${date?.split('.')[0]?.split('T')[1]}`;
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

    const handleExportPDF = () => {
        const data = {
            createAt: orderSaleDetail?.createAt,
            customer: currentCustomer,
            products: listProductSale
        }
        setCurrentDataPDF(data);
        setTimeout(generatePDF, 200);
    }

    const generatePDF = () => {
        const input = contentRef.current;
        html2canvas(input, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff',
        }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
            pdf.save(`phieubanhang${slug}.pdf`);
        });
    };

    return (
        <div className="relative grid grid-cols-4 gap-2 pr-2 overflow-x-auto">
            <div className="col-span-3">
                <div className="flex items-center w-full h-auto gap-4 px-2 py-4">
                    <h3 className="text-xl font-semibold uppercase">Thông tin phiếu bán hàng</h3>
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
                                <div className={`px-4 py-1 flex gap-3 items-center uppercase border-t-2 border-l-2 cursor-pointer transition-all duration-100 bg-orange-200 font-medium`} onClick={() => handleBack()}>
                                    <IoMdArrowRoundBack />
                                    <span>Quay lại</span>
                                </div>
                            </div>
                            {orderSaleDetail?.approveStatus !== 'REJECTED' && <div className="flex gap-2">
                                <div className={`px-4 py-1 flex gap-3 items-center uppercase border-t-2 border-l-2 cursor-pointer transition-all duration-100 bg-orange-200 font-medium`} onClick={() => handleExportPDF()} >
                                    <FaFileExport />
                                    <span>Xuất PDF</span>
                                </div>
                            </div>}
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
                                            <td className="px-6 py-4 border border-blue-300">{item?.unitName}</td>
                                            <td className="px-6 py-4 border border-blue-300">{item?.quantity}</td>
                                            <td className="px-6 py-4 border border-blue-300">{formatVND(item?.sellingPrice)}</td>
                                            <td className="relative px-6 py-4 border border-blue-300">{`${item?.discount} %`}</td>
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
                        {orderSaleDetail?.approveStatus !== 'WAITING' && <span>{orderSaleDetail?.approveStatus === 'APPROVED' ? 'Duyệt bởi' : "Từ chối bởi"}</span>}
                        {orderSaleDetail && orderSaleDetail?.approveStatus === 'APPROVED' && (
                            <div className="flex items-center gap-2 px-4 py-1 bg-orange-400 rounded-md ">
                                <span>Đã duyệt</span>
                                <FaKey className="" />
                            </div>)}
                        {orderSaleDetail && orderSaleDetail?.approveStatus === 'REJECTED' && (
                            <div className="flex items-center gap-2 px-4 py-1 rounded-md bg-red ">
                                <span>Đã từ chối</span>
                                <FaKey className="" />
                            </div>)}
                    </div>
                    <input type="text" disabled value={orderSaleDetail?.approveStatus !== 'WAITING' ? orderSaleDetail?.approveBy : ''} className='w-full px-4 py-1 text-right border border-gray-500' />
                    <input type="text" disabled value={orderSaleDetail?.approveStatus !== 'WAITING' ? `${formatDate(orderSaleDetail?.approveDate)} ` : ''} className='w-full px-4 py-1 text-right border border-gray-500' />
                </div>
                {orderSaleDetail?.approveStatus !== 'REJECTED' && <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between ">
                        <span>Đã nhập bởi</span>
                        {orderSaleDetail && orderSaleDetail?.deliveryStatus === 'RECEIVE_DELIVERY' && <div className="flex items-center gap-2 px-4 py-1 bg-blue-400 rounded-md ">
                            <span>Đã giao</span>
                            <FaKey className="" />
                        </div>}
                    </div>
                    <input type="text" disabled value={orderSaleDetail?.deliveryStatus !== 'WAITING_DELIVERY' ? `${orderSaleDetail?.deliveryBy}` : ''} className='w-full px-4 py-1 text-right border border-gray-500' />
                    <input type="text" disabled value={orderSaleDetail?.deliveryStatus !== 'WAITING_DELIVERY' ? `${formatDate(orderSaleDetail?.deliveryDate)} ` : ''} className='w-full px-4 py-1 text-right border border-gray-500' />
                </div>}
            </div>
            <div className="absolute -left-[9999px]">
                <InvoicePDF className='' ref={contentRef} data={currentDataPDF} />
            </div>
        </div>
    )
}

export default ViewOrderSale
