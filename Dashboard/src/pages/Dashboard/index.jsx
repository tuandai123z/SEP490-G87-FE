import { formatVND } from "../../utils/format";
import { LuPackage } from "react-icons/lu";
import { FiUserPlus } from "react-icons/fi";
import { PiMoneyWavy } from "react-icons/pi";
import MyChart from "../MyChart";

const TopDashboard = () => {
    return (
        <div className="flex flex-col w-full">
            <div className='flex items-center justify-between'>
                <h1 className='text-[28px] leading-[34px] font-normal text-[#5a5c69] cursor-pointer'>Thống kê</h1>

            </div>
            <div className='grid grid-cols-3 gap-[30px] mt-[25px] pb-[15px] '>
                <div className=' h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#4E73DF] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
                    <div>
                        <h2 className='text-[#B589DF] text-[11px] leading-[17px] font-bold uppercase'>Doanh thu</h2>
                        <h1 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]'>{formatVND(100)}</h1>
                    </div>
                    <PiMoneyWavy fontSize={28} color="" />

                </div>

                <div className=' h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#36B9CC] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
                    <div>
                        <h2 className='text-[#1cc88a] text-[11px] leading-[17px] font-bold uppercase'>Số khách hàng mới</h2>
                        <h1 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]'>{100} khách hàng</h1>
                    </div>
                    <FiUserPlus fontSize={28} />
                </div>
                <div className=' h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#F6C23E] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
                    <div>
                        <h2 className='text-[#1cc88a] text-[11px] leading-[17px] font-bold uppercase'>Tổng thiết bị</h2>
                        <h1 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]'>{100} thiết bị</h1>
                    </div>
                    <LuPackage fontSize={28} />
                </div>

            </div>
        </div>)
}



const Dashboard = () => {

    return (
        <div className="w-[98%] h-auto">
            <TopDashboard />
            <MyChart />
        </div>)
};

export default Dashboard;
