import { useNavigate } from "react-router-dom";
import { FaShop } from "react-icons/fa6";
import { MdChair } from "react-icons/md";
import { PiUniteFill } from "react-icons/pi";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { MdOutlinePayment } from "react-icons/md";
import { FiPackage } from "react-icons/fi";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { FaKey } from "react-icons/fa";



function GeneralSetting() {

    const navigate = useNavigate();

    return (
        <div className="min-w-[40] rounded-lg bg-primary/[0.1] p-16 shadow min-h-[90vh] mt-2 flex-row ">
            <div className="flex justify-between">
                <h1 className="text-3xl font-black">Thiết lập hệ thống</h1>
            </div>
            <div className="flex justify-center mt-10">
                <div className="w-[60%] rounded-lg bg-white p-16 shadow min-h-10 mt-2">
                    <div className="flex justify-between">
                        <h1 className="text-xl font-black">Thiết lập thông tin</h1>

                    </div>
                    <div className="flex flex-wrap justify-between gap-4 mt-6">
                        <div className='flex items-center gap-[10px] basis-[40%]'>
                            <FaShop color='black ' size={35} />
                            <div className="flex-row">
                                <p
                                    className='text-[16px] leading-[20px] font-extrabold text-secondary/[0.7] cursor-pointer'
                                    onClick={() => navigate('/admin/management/branch')}
                                >Thông tin thương hiệu</p>
                                <span>Xem và điều chỉnh thông tin thương hiệu của bạn</span>
                            </div>
                        </div>
                        <div className='flex items-center gap-[10px] basis-[40%]'>
                            <MdOutlinePayment color='black ' size={35} />
                            <div className="flex-row">
                                <p
                                    className='text-[16px] leading-[20px] font-extrabold text-secondary/[0.7] cursor-pointer'
                                    onClick={() => navigate('/admin/management/category')}
                                >
                                    Thiết lập danh mục
                                </p>
                                <span>Xem và điều chỉnh thông tin danh mục sản phẩm.</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default GeneralSetting
