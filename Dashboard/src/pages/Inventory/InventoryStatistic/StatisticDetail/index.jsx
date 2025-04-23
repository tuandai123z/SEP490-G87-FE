import { TbEyeSearch } from "react-icons/tb";
import { MdModeEditOutline } from "react-icons/md";
import { FaFileExport, FaSearch, FaTrashAlt } from "react-icons/fa";
import { useRef, useState } from "react"
import { axiosInstance } from "../../../../utils/axiosInstant";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "../../../../components/common/Pagination";
import Loading from "../../../../components/layouts/Loading"
import { formatVND } from "../../../../utils/format";


const StatisticDetail = () => {
    const [fromDateSearch, setFromDateSearch] = useState('');
    const [toDateSearch, setToDateSearch] = useState('');
    const [listProduct, setListProduct] = useState([]);
    const [data, setData] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [numberBase, setNumberBase] = useState(20);
    const [currentNumberBase, setCurrentNumberbase] = useState(20);
    const ref = useRef(false);
    const [paginationInformation, setPaginationInformation] = useState('');
    const size = 10;
    const { slug } = useParams();
    const navigate = useNavigate();

    const getDetail = () => {
        axiosInstance
            .get(`/inventory-sheet/${slug}`)
            .then(res => {
                const data = res.data;
                setData(data.sheet);
                setPaginationInformation(data.data)
                setListProduct(data?.data?.content)
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
        setCurrentNumberbase(numberBase);
    }

    useEffect(() => {
        if (ref.current) return
        ref.current = true
        getDetail();
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

    const handleChangeNumberBase = (number) => {
        if (Number(number) >= 0) {
            setNumberBase(number);
        } else {
            toast.warn("Số lượng tối thiếu không được bé hơn 0")
        }
    }

    const handleExport = async () => {
        try {
            const response = await axiosInstance.get(`/inventory-sheet/${slug}/export`, {
                responseType: 'blob',
            });

            // Tạo blob từ dữ liệu
            const blob = new Blob([response.data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });

            // Tạo URL từ blob
            const url = window.URL.createObjectURL(blob);

            // Tạo thẻ <a> để tải xuống
            const link = document.createElement('a');
            link.href = url;

            // Lấy tên file từ header nếu có
            const disposition = response.headers['content-disposition'];
            let fileName = `bangkiemke${slug}.xlsx`;

            if (disposition && disposition.includes('filename=')) {
                const match = disposition.match(/filename="?(.+?)"?$/);
                if (match && match[1]) {
                    fileName = match[1];
                }
            }

            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            toast.error('Lỗi khi tải Excel:', error);
        }
    }


    return (
        <div className="relative overflow-x-auto ">
            <div className="flex items-center justify-between w-full h-auto gap-4 px-2 py-4 mb-2">
                <h3 className="text-xl font-semibold uppercase">Bảng kiểm kê vật tư hàng hoá {slug}</h3>
            </div>
            <div className="flex w-full gap-4 px-2 mb-4">
                <div className="w-full p-2.5 grid grid-cols-4 gap-4 border-2 border-gray-400 relative">
                    <div className="flex items-center w-full col-span-2 gap-2">
                        <label htmlFor="fromDateSearch" className="block mb-2 text-sm font-normal pr-2 text-right text-gray-900 dark:text-white w-[20%]">Từ ngày</label>
                        <input type="date" id="fromDateSearch" value={data?.startDate} disabled className="block w-[70%] text-sm p-1 text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="flex items-center w-full col-span-2 gap-2">
                        <label htmlFor="toDateSearch" className="block mb-2 text-sm font-normal pr-2 text-right text-gray-900 dark:text-white w-[18.5%]">Đến ngày</label>
                        <input type="date" id="toDateSearch" value={data?.endDate} disabled className="block w-[76.5%] text-sm p-1 text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="flex items-center w-full col-span-2 gap-2">
                        <label htmlFor="fromDateSearch" className="block mb-2 text-sm font-normal pr-2 text-right text-gray-900 dark:text-white w-[20%]">Số</label>
                        <input type="text" id="fromDateSearch" value={slug} disabled className="block w-[70%] text-sm p-1 text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="flex grid items-center w-full grid-cols-4 col-span-2 gap-2">
                        <div className="flex items-center w-full col-span-4 gap-2">
                            <label htmlFor="toDateSearch" className="block mb-2 text-sm font-normal pr-2 text-right text-gray-900 dark:text-white w-[18.5%]">Số lượng tối thiểu</label>
                            <input type="text" id="toDateSearch" value={numberBase} disabled className="block w-[76.5%] text-sm p-1 text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        {/* <div className="flex items-center justify-center w-full col-span-1 gap-2" onClick={handleSearch}>
                            <button className="px-4 py-1.5 font-semibold text-white bg-blue-400">Xác nhận</button>
                        </div> */}
                    </div>

                    <p className="absolute text-gray-900 top-[-16px] bg-white font-semibold">Thông tin chung</p>
                </div>
            </div>
            <div className="w-full px-2">
                <div className="relative overflow-x-auto shadow-md">
                    <div className="flex justify-between w-full mb-2">
                        <button className="px-4 py-1.5 font-semibold text-white bg-blue-400 flex items-center gap-2" onClick={() => handleExport()}>Xuất Excel <FaFileExport /></button>
                    </div>
                    <table className="w-full text-sm text-left text-blue-100 border border-blue-400 shadow-sm rtl:text-right dark:text-blue-100">
                        <thead className="text-xs text-white uppercase bg-blue-400 border border-blue-400 dark:text-white">
                            <tr>
                                <th className="px-6 py-3 text-center border border-blue-400 h-[60px]">Mã hàng</th>
                                <th className="px-6 py-3 text-right border border-blue-400 h-[60px]">Tên hàng</th>
                                <th className="px-6 py-3 text-center border border-blue-400 h-[60px]">ĐVT</th>
                                <th className="flex flex-col justify-between text-center border border-blue-400 h-[60px]" >
                                    <div className="h-[30px] w-full px-2 py-2">Nhập kho</div>
                                    <div className="flex w-full h-[30px] ">
                                        <div className="w-[50%] px-2 py-2">Số lượng</div>
                                        <div className="w-[50%] px-2 py-2">Giá trị</div>
                                    </div>
                                </th>
                                <th className=" text-center border border-blue-400 h-[60px]">
                                    <div className="h-[30px] w-full px-2 py-2">Xuất kho</div>
                                    <div className="flex w-full h-[30px] ">
                                        <div className="w-[50%] px-2 py-2">Số lượng</div>
                                        <div className="w-[50%] px-2 py-2">Giá trị</div>
                                    </div>
                                </th>
                                <th className="px-6 py-3 text-center border border-blue-400 h-[60px]">Tồn kho</th>
                                <th className="px-6 py-3 text-center border border-blue-400 h-[60px]">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listProduct && listProduct?.map((item, index) => {
                                return (
                                    <tr className={`text-black border border-b border-blue-400 ${item?.productStatus !== 'NEW' ? 'bg-gray-300' : ''} `} key={index}>
                                        <td className="px-6 py-2 text-right border border-blue-400">{item?.productCode}</td>
                                        <td className="px-6 py-2 text-right border border-blue-400">{item?.productName}</td>
                                        <td className="px-6 py-2 text-right border border-blue-400">{item?.productUnit}</td>
                                        <td className="flex text-center divide-x divide-blue-400">
                                            <div className="w-[50%] px-3 py-2 ">{item?.quantityShipped}</div>
                                            <div className="w-[50%] px-3 py-2 ">{formatVND(item?.totalImportAmount)}</div>
                                        </td>
                                        <td className="text-center border border-blue-400 ">
                                            {item?.productStatus === 'NEW' && <div className="flex divide-x divide-blue-400">
                                                <div className="w-[50%] px-3 py-2 ">{item?.productExportQuantity}</div>
                                                <div className="w-[50%] px-3 py-2 ">{formatVND(item?.exportTotalAmount)}</div>
                                            </div>}
                                        </td>
                                        <td className={`px-6 py-2 text-center border font-bold border-blue-400 ${item?.totalInventoryQuantity <= 20 && item?.productStatus === 'NEW' ? 'text-red' : ''}`}>{`${item?.totalInventoryQuantity} `}</td>
                                        <td className="flex items-center justify-center gap-3 px-6 py-2 border-blue-400 ">
                                            {item?.productStatus === 'NEW' && 'MỚI'}
                                            {item?.productStatus === 'OLD' && 'Cũ'}
                                            {item?.productStatus === 'BROKEN' && 'HỎNG'}
                                        </td>
                                    </tr>
                                )
                            })}
                            {listProduct && listProduct?.length === 0 && (
                                <tr className="text-black border border-b border-blue-400" >
                                    <th scope="row" className="px-6 py-2 font-medium text-right text-black border border-r-0 border-blue-300 whitespace-nowrap">
                                        Không tìm thấy bản ghi
                                    </th>

                                </tr>
                            )}
                        </tbody>
                    </table>
                    {listProduct && listProduct?.length !== 0 && (
                        <Pagination
                            totalPages={paginationInformation?.totalElements}
                            size={size}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                            content={'bản ghi'}
                        />
                    )}

                    {isOpenModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 animate-fadeIn">
                            <div className="relative z-50 w-full max-w-2xl max-h-screen overflow-y-auto bg-white rounded-lg shadow-lg">
                                <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-t md:p-5 dark:border-gray-600">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Kiểm kê vật tư hàng hoá
                                    </h3>
                                    <button onClick={() => setIsOpenModal(false)} type="button" className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <div className="p-4 md:p-5 ">
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="col-span-1 ">
                                            <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Từ ngày</label>
                                            <input type="date" name="fullName" id="fullName" value={fromDate} onChange={handleFromDateChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nhập tên thiết bị" required="" />
                                        </div>
                                        <div className="col-span-1 sm:col-span-1">
                                            <label htmlFor="unit" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Đến ngày</label>
                                            <input type="date" name="unit" id="unit" value={toDate} onChange={handleToDateChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nhập đơn vị" required="" />
                                        </div>

                                    </div>
                                    <div className="flex justify-between">
                                        <button onClick={() => setIsOpenModal(false)} type="submit" className="text-black inline-flex items-center shadow-lg bg-white border border-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-6">
                                            Huỷ
                                        </button>
                                        <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-6">
                                            Đồng ý
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div >
                    )}
                    {isLoading && <Loading />}
                </div>
            </div>
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

export default StatisticDetail
