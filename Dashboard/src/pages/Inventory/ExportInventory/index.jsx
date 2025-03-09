import { useState } from "react";


const ExportInventory = () => {
    const [statusTable, setStatusTable] = useState('1');

    return (
        <div className="relative overflow-x-auto ">
            <div className="flex items-center w-full h-auto gap-4 px-2 py-4">
                <h3 className="text-xl font-semibold uppercase">Phiếu xuất kho</h3>
                <select id="jobRank" className="bg-gray-50 w-[20%] border border-gray-300 text-gray-900 text-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                    <option value={""}>---Nhà cung cấp---</option>
                </select>
            </div>
            <div className="flex w-full gap-4 px-2 mb-2">
                <div className="w-[65%] p-2.5 flex flex-col gap-1 border-2 border-gray-400 relative">
                    <div className="flex items-center w-full">
                        <label htmlFor="first_name" className="block mb-2 text-sm font-normal text-gray-900 dark:text-white w-[18%]">Đối tượng</label>
                        <input type="text" id="first_name" className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="flex items-center w-full">
                        <label htmlFor="first_name" className="block mb-2 text-sm font-normal text-gray-900 dark:text-white w-[18%]">Người giao hàng</label>
                        <input type="text" id="first_name" className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="flex items-center w-full">
                        <label htmlFor="first_name" className="block mb-2 text-sm font-normal text-gray-900 dark:text-white w-[18%]">Diễn giải</label>
                        <input type="text" id="first_name" className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="flex items-center w-full">
                        <label htmlFor="first_name" className="block mb-2 text-sm font-normal text-gray-900 dark:text-white w-[18%]">Kèm theo</label>
                        <input type="text" id="first_name" className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <p className="absolute text-gray-900 top-[-16px] bg-white font-semibold">Thông tin chung</p>
                </div>
                <div className="w-[34%] p-2.5 flex flex-col border-2 border-gray-400 gap-1 relative">
                    <div className="flex items-center w-full">
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-[50%]">Ngày hạch toán</label>
                        <input type="date" id="first_name" className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="flex items-center w-full">
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-[50%]">Ngày chứng từ</label>
                        <input type="date" id="first_name" className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="flex items-center w-full">
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-[50%]">Số chứng từ</label>
                        <input type="text" id="first_name" className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <p className="absolute text-gray-900 top-[-16px] bg-white font-semibold">Chứng từ</p>
                </div>
            </div>
            <div className="w-full">
                <div class="relative overflow-x-auto shadow-md">
                    <div className="flex">
                        <div className={`px-4 py-1 border-t-2 border-l-2 cursor-pointer transition-all duration-100 ${statusTable === '1' && 'bg-orange-200 font-medium'}`} onClick={() => { if (statusTable !== '1') setStatusTable('1') }}>
                            <span>1. Hàng tiền</span>
                        </div>
                        <div className={`px-4 py-1 border-t-2 border-l-2 cursor-pointer transition-all duration-100 ${statusTable === '2' && 'bg-orange-200 font-medium'}`} onClick={() => { if (statusTable !== '2') setStatusTable('2') }}>
                            <span>2. Thống kê</span>
                        </div>
                        <div className={`px-4 py-1 border-2 border-b-0 cursor-pointer transition-all duration-100 ${statusTable === '3' && 'bg-orange-200 font-medium'}`} onClick={() => { if (statusTable !== '3') setStatusTable('3') }}>
                            <span>3. Khác</span>
                        </div>
                    </div>
                    <table className="w-full text-sm text-left text-blue-100 border border-blue-400 rtl:text-right dark:text-blue-100">
                        <thead className="text-xs text-white uppercase bg-blue-400 border border-blue-400 dark:text-white">
                            <tr>
                                <th scope="col" className="px-6 py-3 border border-blue-300">Mã hàng</th>
                                <th scope="col" className="px-6 py-3 border border-blue-300">Tên hàng</th>
                                <th scope="col" className="px-6 py-3 border border-blue-300">TK Nợ</th>
                                <th scope="col" className="px-6 py-3 border border-blue-300">TK Có</th>
                                <th scope="col" className="px-6 py-3 border border-blue-300">DVT</th>
                                <th scope="col" className="px-6 py-3 border border-blue-300">Số lượng</th>
                                <th scope="col" className="px-6 py-3 border border-blue-300">Đơn giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="text-black border border-b border-blue-400">
                                <th scope="row" className="px-6 py-4 font-medium text-black border border-blue-300 whitespace-nowrap">
                                    Apple MacBook Pro 17"
                                </th>
                                <td className="px-6 py-4 border border-blue-300">Silver</td>
                                <td className="px-6 py-4 border border-blue-300">Laptop</td>
                                <td className="px-6 py-4 border border-blue-300">$2999</td>
                                <td className="px-6 py-4 border border-blue-300">$2999</td>
                                <td className="px-6 py-4 border border-blue-300">$2999</td>
                                <td className="px-6 py-4 border border-blue-300">$2999</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ExportInventory
