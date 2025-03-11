import React from 'react';
import { FaRegSun, FaStickyNote } from 'react-icons/fa';
import { MdDashboard, MdInventory } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { FaArrowRightToBracket } from "react-icons/fa6";

const Sidebar = () => {
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
        onClick={() => handleNavigate('/admin/dashboard')}>
        <MdDashboard color="white" />
        <p className="text-[14px] leading-[20px] font-bold text-white ">Tổng quan</p>
      </div>
      <div className="pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]">
        <p className="text-[10px] font-extrabold leading-[16px] text-white/[0.4]"> Quản lý</p>
        <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer transition ease-in-out duration-300 rounded pl-4 hover:bg-secondary" onClick={() => handleNavigate('/admin/management/products')}>
          <div className="flex items-center gap-[10px]" >
            <FaRegSun color="white" /> <p className="text-[14px] leading-[20px] font-normal text-white">Thiết bị</p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer transition ease-in-out duration-300 rounded pl-4 hover:bg-secondary" onClick={() => handleNavigate('/admin/management/staffs')}>
          <div className="flex items-center gap-[10px]">
            <FaStickyNote color="white" /> <p className="text-[14px] leading-[20px] font-normal text-white">Nhân viên</p>
          </div>
        </div>
      </div>
      <div className="pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]">
        <p className="text-[10px] font-extrabold leading-[16px] text-white/[0.4]"> Tổng quan</p>
        <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer transition ease-in-out duration-300 rounded pl-4 hover:bg-secondary" onClick={() => handleNavigate('/admin/management/general')}>
          <div className="flex items-center gap-[10px]">
            <FaRegSun color="white" /> <p className="text-[14px] leading-[20px] font-normal text-white">Cài đặt chung</p>
          </div>
        </div>
      </div>
      <div className="pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]">
        <p className="text-[10px] font-extrabold leading-[16px] text-white/[0.4]"> </p>
        <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer transition ease-in-out duration-300 rounded pl-4 hover:bg-secondary" onClick={() => handleNavigate('/inventory/statistic')}>
          <div className="flex items-center gap-[10px]">
            <MdInventory color="white" /> <p className="text-[14px] leading-[20px] font-normal text-white">Kho</p>
          </div>
          <FaArrowRightToBracket color='white' className='mr-4' />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
