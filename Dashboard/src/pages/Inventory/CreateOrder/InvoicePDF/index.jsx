import React from 'react';
import { formatVND } from '../../../../utils/format';

const InvoicePDF = React.forwardRef(({ data }, ref) => {
    const convertDate = (date) => {
        const listDate = date?.split('T')[0]?.split('-');
        if (listDate !== undefined) return `Ngày ${listDate[2]} tháng ${listDate[1]} năm ${listDate[0]}`
        return ''
    }

    const totalCost = data?.products && data?.products?.reduce((sum, product) => sum + Number(product?.sellingPrice * product?.quantity), Number(0));

    return (
        <div ref={ref} className="w-full p-5 mx-auto border border-gray-300 rounded-lg shadow-lg">
            <div className='flex flex-col gap-1 mb-3 ml-4'>
                <h1 className="text-sm ">Công ty TNHH Xây Dựng Thương Mại Thiết Bị Điện Hải Phòng</h1>
                <h1 className="text-sm ">Số 2/60/191 Đường Đà Nẵng, Phường Cầu Tre, Quận Ngô Quyền, Hải Phòng</h1>
            </div>
            <div className='flex flex-col gap-1 '>
                <h1 className="mb-2 text-xl font-bold text-center">PHIẾU MUA HÀNG</h1>
                <p className="text-center">{convertDate(data?.createAt)}</p>
            </div>

            <div className="flex flex-col gap-1 mt-5 ml-4 text-sm">
                <p className='flex gap-1'><strong>Bên bán:</strong> ________________________________________</p>
                <p className='flex gap-1'><strong>Nhà cung cấp:</strong> {data?.supplier?.name}</p>
                <p className='flex gap-1'><strong>Địa chỉ:</strong> {data?.supplier?.address}</p>
                <p className='flex gap-1'><strong>Điện thoại:</strong> {data?.supplier?.phoneNumber}</p>
                <p className='flex gap-1'><strong>Ngày giao dự kiến:</strong>{data?.supplier?.name}</p>
            </div>

            <table className="w-[98%] mt-5 border border-gray-300 text-xs mx-4">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 border border-gray-300">STT</th>
                        <th className="px-4 py-2 border border-gray-300">Mã hàng</th>
                        <th className="px-4 py-2 border border-gray-300">Tên hàng</th>
                        <th className="px-4 py-2 border border-gray-300">Đơn vị tính</th>
                        <th className="px-4 py-2 border border-gray-300">Số lượng</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.products?.map((p, index) => {
                        return (
                            <tr key={index}>
                                <td className="px-6 py-2 text-center align-middle border border-gray-300">{index + 1}</td>
                                <td className="px-6 py-2 text-center align-middle border border-gray-300">{p?.code}</td>
                                <td className="px-6 py-2 align-middle border border-gray-300">{p?.name}</td>
                                <td className="px-6 py-2 text-center align-middle border border-gray-300">{p?.unitName}</td>
                                <td className="px-6 py-2 text-center align-middle border border-gray-300">{p?.quantity}</td>
                            </tr>)
                    })}
                </tbody>
            </table>

            <div className="flex flex-col mt-3 mb-12">
                {/* <p className="flex gap-3 ml-4">Số tiền bằng chữ: <span className='font-semibold'>{numberToWords(totalCost)}</span></p> */}
                <p className="mt-6 mr-10 text-sm italic text-right">Ngày ..... tháng ..... năm ........</p>
                <div className='flex justify-around mx-4 mt-1'>
                    <p className='font-semibold'>Nhà cung cấp</p>
                    <p className='font-semibold'>Kế toán trưởng</p>
                    <p className='font-semibold'>Giám đốc</p>
                </div>
            </div>
        </div>
    );
});

export default InvoicePDF;