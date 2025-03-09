

const InventoryStatistic = () => {
    return (
        <div className="relative overflow-x-auto ">
            <div className="flex items-center justify-center w-full h-auto py-6">
                <h3 className="text-2xl font-semibold uppercase">Tổng hợp hàng tồn kho</h3>
            </div>
            <div className="w-full">
                <div class="relative overflow-x-auto shadow-md">
                    <table className="w-full text-sm text-left text-blue-100 border border-blue-400 rtl:text-right dark:text-blue-100">
                        <thead className="text-xs text-white uppercase bg-blue-400 border border-blue-400 dark:text-white">
                            <tr>
                                <th scope="col" className="px-6 py-3 border border-blue-300">Mã hàng</th>
                                <th scope="col" className="px-6 py-3 border border-blue-300">Tên hàng</th>
                                <th scope="col" className="px-6 py-3 border border-blue-300">ĐVT</th>
                                <th scope="col" className="px-6 py-3 border border-blue-300">Price</th>
                                <th scope="col" className="px-6 py-3 border border-blue-300">Action</th>
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
                                <td className="px-6 py-4 border border-blue-300">
                                    <a href="#" className="font-medium text-white hover:underline">Edit</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default InventoryStatistic