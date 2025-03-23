import React from 'react';
import { formatVND } from '../../../../../utils/format';

const InvoicePDF = React.forwardRef(({ data }, ref) => {
    const VAT = 0.1;
    const units = ["", "nghìn", "triệu", "tỷ"];
    const ones = ["", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
    const tens = ["", "mười", "hai mươi", "ba mươi", "bốn mươi", "năm mươi", "sáu mươi", "bảy mươi", "tám mươi", "chín mươi"];

    const convertThreeDigits = (num) => {
        let str = "";
        const hundred = Math.floor(num / 100);
        const ten = Math.floor((num % 100) / 10);
        const one = num % 10;

        if (hundred > 0) str += ones[hundred] + " trăm ";
        if (ten > 1) {
            str += tens[ten] + " ";
            if (one > 0) str += ones[one] + " ";
        } else if (ten === 1) {
            str += "mười ";
            if (one > 0) str += ones[one] + " ";
        } else if (one > 0) {
            str += "lẻ " + ones[one] + " ";
        }

        return str.trim();
    };

    const numberToWords = (num) => {
        if (num === 0) return "Không đồng";
        let result = "";
        let unitIndex = 0;

        while (num > 0) {
            const threeDigits = num % 1000;
            if (threeDigits > 0) {
                result = convertThreeDigits(threeDigits) + " " + units[unitIndex] + " " + result;
            }
            num = Math.floor(num / 1000);
            unitIndex++;
        }
        return result.trim() + " đồng";
    };

    const convertDate = (date) => {
        const listDate = date?.split('T')[0]?.split('-');
        if (listDate !== undefined) return `Ngày ${listDate[2]} tháng ${listDate[1]} năm ${listDate[0]}`
        return ''
    }

    const totalCost = data?.products && data?.products?.reduce((sum, product) => sum + Number(product?.exportQuantity * product?.priceExport), Number(0));

    return (
        <div ref={ref} className="w-full p-5 mx-auto border border-gray-300 rounded-lg shadow-lg">
            <div className='flex flex-col gap-1 mb-3 ml-4'>
                <h1 className="text-sm ">Công ty TNHH Xây Dựng Thương Mại Thiết Bị Điện Hải Phòng</h1>
                <h1 className="text-sm ">Số 2/60/191 Đường Đà Nẵng, Phường Cầu Tre, Quận Ngô Quyền, Hải Phòng</h1>
            </div>
            <div className='flex flex-col gap-1 '>
                <h1 className="mb-2 text-xl font-bold text-center">PHIẾU XUẤT KHO BÁN HÀNG</h1>
                <p className="text-center">{convertDate(data?.createAt)}</p>
            </div>

            <div className="flex flex-col gap-1 mt-5 ml-4 text-sm">
                <p className='flex gap-1'><strong>Người mua:</strong> ________________________________________</p>
                <p className='flex gap-1'><strong>Tên khách hàng:</strong> {data?.customer?.name}</p>
                <p className='flex gap-1'><strong>Địa chỉ:</strong> {data?.customer?.address}</p>
                <p className='flex gap-1'><strong>Điện thoại:</strong> {data?.customer?.phoneNumber}</p>
                <p className='flex gap-1'><strong>Mã số thuế:</strong> {data?.taxNumber || '________________________________________'}</p>
                <p className='flex gap-1'><strong>Diễn giải:</strong> Bán hàng {data?.customer?.name}</p>
            </div>

            <table className="w-[98%] mt-5 border border-gray-300 text-xs mx-4">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 border border-gray-300">STT</th>
                        <th className="px-4 py-2 border border-gray-300">Mã hàng</th>
                        <th className="px-4 py-2 border border-gray-300">Tên hàng</th>
                        <th className="px-4 py-2 border border-gray-300">Đơn vị tính</th>
                        <th className="px-4 py-2 border border-gray-300">Số lượng</th>
                        <th className="px-4 py-2 border border-gray-300">Đơn giá</th>
                        <th className="px-4 py-2 border border-gray-300">Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.products?.map((p, index) => {
                        return (
                            <tr key={index}>
                                <td className="px-6 py-2 text-center align-middle border border-gray-300">{index + 1}</td>
                                <td className="px-6 py-2 text-center align-middle border border-gray-300">{p?.product?.code}</td>
                                <td className="px-6 py-2 align-middle border border-gray-300">{p?.product?.name}</td>
                                <td className="px-6 py-2 text-center align-middle border border-gray-300">{p?.product?.unit}</td>
                                <td className="px-6 py-2 text-center align-middle border border-gray-300">{p?.exportQuantity}</td>
                                <td className="px-6 py-2 text-center align-middle border border-gray-300">{formatVND(p?.priceExport)}</td>
                                <td className="px-6 py-2 text-center align-middle border border-gray-300">{formatVND(p?.exportQuantity * p?.priceExport)}</td>
                            </tr>)
                    })}
                    <tr>
                        <td colSpan="6" className="px-6 py-2 text-right border border-gray-300">Cộng tiền hàng:</td>
                        <td className="text-center border border-gray-300">{formatVND(totalCost)}</td>
                    </tr>
                    <tr>
                        <td colSpan="6" className="px-6 py-2 text-right border border-gray-300">Tiền thuế GTGT:</td>
                        <td className="text-center border border-gray-300">{formatVND(totalCost * VAT)}</td>
                    </tr>
                    <tr>
                        <td colSpan="6" className="px-6 py-2 font-bold text-right border border-gray-300">Tổng tiền thanh toán:</td>
                        <td className="font-bold text-center border border-gray-300">{formatVND(totalCost * (1 + VAT))}</td>
                    </tr>
                </tbody>
            </table>

            <div className="flex flex-col mt-3 mb-12">
                <p className="flex gap-3 ml-4">Số tiền bằng chữ: <span className='font-semibold'>{numberToWords(totalCost * (1 + VAT))}</span></p>
                <p className="mt-6 mr-10 text-sm italic text-right">Ngày ..... tháng ..... năm ........</p>
                <div className='flex justify-around mx-4 mt-1'>
                    <p className='font-semibold'>Người mua hàng</p>
                    <p className='font-semibold'>Kế toán trưởng</p>
                    <p className='font-semibold'>Giám đốc</p>
                </div>
            </div>
        </div>
    );
});

export default InvoicePDF;