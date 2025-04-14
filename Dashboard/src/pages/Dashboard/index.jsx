import { formatVND } from "../../utils/format";
import { LuPackage } from "react-icons/lu";
import { FiUserPlus } from "react-icons/fi";
import { PiMoneyWavy } from "react-icons/pi";
import MyChart from "../MyChart";
import { axiosInstance } from "../../utils/axiosInstant";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useState } from "react";
import PieChart from "../MyChart/PieChart";

const TopDashboard = () => {
    return (
        <div className="flex flex-col w-full">
            <div className='flex items-center justify-between'>
                <h1 className='text-[28px] leading-[34px] font-normal text-[#5a5c69] cursor-pointer'>Thống kê kho hàng</h1>

            </div>
            {/* <div className='grid grid-cols-3 gap-[30px] mt-[25px] pb-[15px] '>
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

            </div> */}
        </div>)
}



const Dashboard = () => {

    const [dataReturn, setDataReturn] = useState([])
    const [dataReceipt, setDataReceipt] = useState([])
    const [dataDelivery, setDataDelivery] = useState([])
    const totalFormReceipt = dataReceipt?.reduce((sum, item) => sum + Number(item?.totalFormInMonth), Number(0));
    const totalFormDelivery = dataDelivery?.reduce((sum, item) => sum + Number(item?.totalFormInMonth), Number(0));
    const dataPieChart = [
        {
            name: `Xuất kho`,
            y: totalFormDelivery
        },
        {
            name: `Nhập kho`,
            y: totalFormReceipt
        }
    ]

    const getDataStatisticReturn = () => {
        axiosInstance
            .get(`/statistic/return`)
            .then(res => {
                const data = res.data;
                setDataReturn(data);
            }).catch((err) => {
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

    const getDataStatisticReceipt = () => {
        axiosInstance
            .get(`/statistic/receipt`)
            .then(res => {
                const data = res.data;
                setDataReceipt(data);
                console.log(data);
            }).catch((err) => {
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

    const getDataStatisticDelivery = () => {
        axiosInstance
            .get(`/statistic/delivery`)
            .then(res => {
                const data = res.data;
                setDataDelivery(data);
            }).catch((err) => {
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

    useEffect(() => {
        getDataStatisticReturn();
        getDataStatisticReceipt();
        getDataStatisticDelivery();
    }, [])



    return (
        <div className="w-[98%] h-auto flex flex-col gap-4">
            <TopDashboard />
            <div className="grid w-full grid-cols-2 gap-4">
                <div className="col-span-1"><MyChart data={dataReceipt} title={"Biểu đồ thống kê nhập kho"} type='column' /></div>
                <div className="col-span-1"><MyChart data={dataDelivery} title={"Biểu đồ thống kê xuất kho"} type='column' /></div>
                <div className="col-span-1"><MyChart data={dataReturn} title={"Biểu đồ thống kê hoàn hàng"} type='column' /></div>
                <div className="col-span-1"><PieChart data={dataPieChart} title={"Biểu đồ thống kê tỉ lệ xuất nhập kho"} /></div>
            </div>
        </div>)
};

export default Dashboard;
