import React from 'react';
import { formatVND } from '../../../../../utils/format';

const InvoicePDF = React.forwardRef(({ data }, ref) => {
    const VAT = 0.1;
    const units = ["", "nghìn", "triệu", "tỷ", "nghìn tỷ", "triệu tỷ"];
    const ones = ["", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
    const tens = ["", "mười", "hai mươi", "ba mươi", "bốn mươi", "năm mươi", "sáu mươi", "bảy mươi", "tám mươi", "chín mươi"];

    const convertThreeDigits = (num, isThousand) => {
        let str = "";
        const hundred = Math.floor(num / 100);
        const ten = Math.floor((num % 100) / 10);
        const one = num % 10;
        if (hundred > 0) {
            str += ones[hundred] + " trăm ";
            if (ten === 0 && one > 0) str += "lẻ "; // Xử lý trường hợp có "lẻ"
        }

        if (ten > 1) {
            str += tens[ten] + " ";
            if (one === 1) str += "mốt "; // 21 -> "hai mươi mốt" 
            else if (one === 5) str += "lăm "; // 25 -> "hai mươi lăm"
            else if (one > 0) str += ones[one] + " ";
        } else if (ten === 1) {
            str += "mười ";
            if (one === 5) str += "lăm "; // 15 -> "mười lăm"
            else if (one > 0) str += ones[one] + " ";
        } else if (one > 0) {
            str += ones[one] + " ";
        }
        return str.trim();
    };

    const numberToWords = (num) => {
        if (num === 0) return "Không đồng";

        let result = "";
        let unitIndex = 0;
        let isThousand = false; // Đánh dấu khi vượt quá 1000 để xử lý "lẻ"

        while (num > 0) {
            const threeDigits = num % 1000;
            if (threeDigits > 0) {
                let words = convertThreeDigits(threeDigits, isThousand);
                // let unitName = units[unitIndex] || ""; // Tránh undefined
                // if (words) {
                //     result = words + (unitName ? " " + unitName : "") + (result ? " " + result : "");
                // }

                let unitName = unitIndex > 0 ? units[unitIndex] : "";

                // Kiểm tra giá trị trước khi nối chuỗi
                if (words && unitName !== undefined) {
                    result = words + (unitName ? " " + unitName : "") + (result ? " " + result : "");
                }
            }

            num = Math.floor(num / 1000);
            unitIndex++;
            isThousand = true; // Nếu có số hàng nghìn trở lên, cho phép thêm "lẻ"
        }

        return result.trim() + " đồng";
    };

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
                <h1 className="mb-2 text-xl font-bold text-center">PHIẾU BÁN HÀNG</h1>
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
                                <td className="px-6 py-2 text-center align-middle border border-gray-300">{p?.code}</td>
                                <td className="px-6 py-2 align-middle border border-gray-300">{p?.name}</td>
                                <td className="px-6 py-2 text-center align-middle border border-gray-300">{p?.unitName}</td>
                                <td className="px-6 py-2 text-center align-middle border border-gray-300">{p?.quantity}</td>
                                <td className="px-6 py-2 text-center align-middle border border-gray-300">{formatVND(p?.sellingPrice)}</td>
                                <td className="px-6 py-2 text-center align-middle border border-gray-300">{formatVND(p?.sellingPrice * p?.quantity)}</td>
                            </tr>)
                    })}
                    <tr>
                        <td colSpan="6" className="px-6 py-2 text-right border border-gray-300">Cộng tiền hàng:</td>
                        <td className="text-center border border-gray-300">{formatVND(totalCost)}</td>
                    </tr>
                    <tr>
                        <td colSpan="6" className="px-6 py-2 font-bold text-right border border-gray-300">Tổng tiền thanh toán:</td>
                        <td className="font-bold text-center border border-gray-300">{formatVND(totalCost)}</td>
                    </tr>
                    <tr>
                        <td colSpan="6" className="px-6 py-2 text-right border border-gray-300">Tiền thuế GTGT:</td>
                        <td className="text-center border border-gray-300">Không gồm thuế</td>
                    </tr>
                </tbody>
            </table>

            <div className="flex flex-col mt-3 mb-12">
                <p className="flex gap-3 ml-4">Số tiền bằng chữ: <span className='font-semibold'>{numberToWords(totalCost)}</span></p>
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