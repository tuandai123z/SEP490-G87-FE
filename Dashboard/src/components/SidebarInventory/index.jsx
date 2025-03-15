import React from 'react';
import { FaChevronLeft, FaFileExport, FaFileImport, FaClipboardList } from 'react-icons/fa';
import { MdInventory, MdManageAccounts } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { FcStatistics } from "react-icons/fc";

const SidebarInventory = () => {
    const navigate = useNavigate();

    const handleNavigate = (url) => {
        navigate(url)
    }

    return (
        <div className="bg-primary px-[25px] h-full w-[15%] fixed top-0 left-0">
            <div className="py-4 px-2 flex items-center justify-center border-b-[1px] border-[#EDEDED]/[0.3]">
                <h1 className="text-white text-base uppercase leading-[24px] font-extrabold cursor-pointer">Thiết bị điện hải Phòng</h1>
            </div>
            <div className="flex items-center gap-[15px] py-[20px] border-b-[1px] transition ease-in-out duration-300 rounded pl-4 hover:bg-secondary border-[#EDEDED]/[0.3] cursor-pointer "
                onClick={() => handleNavigate('/inventory/statistic')}>
                <MdInventory color="white" />
                <p className="text-[14px] leading-[20px] font-bold text-white ">Báo cáo kho</p>
            </div>
            <div className="pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]">
                <p className="text-[10px] font-extrabold leading-[16px] text-white/[0.4]">Quản lý</p>
                <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer transition ease-in-out duration-300 rounded pl-4 hover:bg-secondary" onClick={() => handleNavigate('/inventory/import')}>
                    <div className="flex items-center gap-[10px]" >
                        <FaFileImport color="white" /> <p className="text-[14px] leading-[20px] font-normal text-white">Phiếu mua hàng</p>
                    </div>
                </div>
                <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer transition ease-in-out duration-300 rounded pl-4 hover:bg-secondary" onClick={() => handleNavigate('/inventory/import')}>
                    <div className="flex items-center gap-[10px]" >
                        <FaFileImport color="white" /> <p className="text-[14px] leading-[20px] font-normal text-white">Nhập kho</p>
                    </div>
                </div>
                <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer transition ease-in-out duration-300 rounded pl-4 hover:bg-secondary" onClick={() => handleNavigate('/inventory/export')}>
                    <div className="flex items-center gap-[10px]">
                        <FaFileExport color="white" /> <p className="text-[14px] leading-[20px] font-normal text-white">Xuất kho</p>
                    </div>
                </div>
                <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer transition ease-in-out duration-300 rounded pl-4 hover:bg-secondary" onClick={() => handleNavigate('/inventory/liquidation')}>
                    <div className="flex items-center gap-[10px]">
                        <FcStatistics color="white" /> <p className="text-[14px] leading-[20px] font-normal text-white">Kiểm kê</p>
                    </div>
                </div>
            </div>
            <div className="pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]">
                <p className="text-[10px] font-extrabold leading-[16px] text-white/[0.4]">Phiếu mua hàng</p>
                <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer transition ease-in-out duration-300 rounded pl-4 hover:bg-secondary" onClick={() => handleNavigate('/inventory/order/management')}>
                    <div className="flex items-center gap-[10px]" >
                        <FaClipboardList color="white" /> <p className="text-[14px] leading-[20px] font-normal text-white">Danh sách</p>
                    </div>
                </div>
                <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer transition ease-in-out duration-300 rounded pl-4 hover:bg-secondary" onClick={() => handleNavigate('/inventory/order/create')}>
                    <div className="flex items-center gap-[10px]" >
                        <FaFileImport color="white" /> <p className="text-[14px] leading-[20px] font-normal text-white">Tạo phiếu</p>
                    </div>
                </div>
            </div>
            <div className="pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]">
                <p className="text-[10px] font-extrabold leading-[16px] text-white/[0.4]">Khác</p>
                <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer transition ease-in-out duration-300 rounded pl-4 hover:bg-secondary" onClick={() => handleNavigate('/inventory/supplier')}>
                    <div className="flex items-center gap-[10px]" >
                        <MdManageAccounts color="white" /> <p className="text-[14px] leading-[20px] font-normal text-white">Nhà cung cấp</p>
                    </div>
                </div>
            </div>
            <div className="pt-[15px]">
                <div className="flex items-center justify-center" onClick={() => navigate('/admin/dashboard')}>
                    <div className="h-[40px] w-[40px] bg-[#3C5EC1] rounded-full flex items-center justify-center cursor-pointer">
                        <FaChevronLeft color="white" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SidebarInventory;
