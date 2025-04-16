import React from "react";
import {
  FaBoxOpen,
  FaClipboardList,
  FaCube,
  FaGlobe,
  FaListAlt,
  FaUsers
} from "react-icons/fa";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { MdDashboard, MdInventory } from "react-icons/md";
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const dataUser = useSelector(state => state.user);
  const navigate = useNavigate();

  const handleNavigate = (url) => {
    navigate(url);
  };

  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="bg-primary px-[25px] h-full w-[15%] fixed top-0 left-0">
      <div className="flex items-center justify-center px-2 py-4">
        <img
          src="/logoThietBi.png"
          alt="Thiết Bị"
          className="cursor-pointer h-fit"
        />
      </div>
      <div
        className={`flex items-center gap-[15px] py-[20px]  transition ease-in-out duration-300 rounded-full pl-4 cursor-pointer  ${currentPath === "/admin/dashboard" ? "bg-white" : ""}`}
        onClick={() => handleNavigate("/admin/dashboard")}
      >
        <MdDashboard
          className={`${currentPath === "/admin/dashboard" ? "text-primary" : "text-white"}`}
        />
        <p
          className={`text-[18px] leading-[20px] font-bold ${currentPath === "/admin/dashboard" ? "text-primary" : "text-white"}`}
        >
          Dashboard
        </p>
      </div>
      <div className="pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]">
        <p className="text-[15px] font-bold leading-[16px] text-white/[0.4] pb-2">
          QUẢN LÝ
        </p>
        <div
          className={`flex items-center justify-between gap-[10px] py-[15px] cursor-pointer transition ease-in-out duration-300 rounded-full pl-4 
    ${currentPath === "/admin/management/products" ? "bg-white" : ""}`}
          onClick={() => handleNavigate("/admin/management/products")}
        >
          <div className="flex items-center gap-[10px]">
            <FaCube
              className={`${currentPath === "/admin/management/products" ? "text-primary" : "text-white"}`}
            />
            <p
              className={`text-[16px] leading-[20px] font-normal ${currentPath === "/admin/management/products" ? "text-primary" : "text-white"}`}
            >
              Thiết bị
            </p>
          </div>
        </div>
        <div
          className={`flex items-center justify-between gap-[10px] py-[15px] cursor-pointer transition ease-in-out duration-300 rounded-full pl-4 
            ${currentPath === "/admin/management/units" ? "bg-white" : ""}`}
          onClick={() => handleNavigate("/admin/management/units")}
        >
          <div className="flex items-center gap-[10px]">
            <FaClipboardList  className={`${currentPath === "/admin/management/units" ? "text-primary" : "text-white"}`} />
            <p  className={`text-[16px] leading-[20px] font-normal  ${currentPath === "/admin/management/units" ? "text-primary" : "text-white"}`}>
              Đơn vị tính
            </p>
          </div>
        </div>
        {dataUser?.role === 'ADMIN' && (
          <div
            className={`flex items-center justify-between gap-[10px] py-[15px] cursor-pointer transition ease-in-out duration-300 rounded-full pl-4 
          ${currentPath === "/admin/management/staffs" ? "bg-white" : ""}`}
            onClick={() => handleNavigate("/admin/management/staffs")}
          >
            <div className="flex items-center gap-[10px]">
              <FaUsers className={`${currentPath === "/admin/management/staffs" ? "text-primary" : "text-white"}`} />
              <p className={`text-[16px] leading-[20px] font-normal  ${currentPath === "/admin/management/staffs" ? "text-primary" : "text-white"}`}>
                Nhân viên
              </p>
            </div>
          </div>
        )}
        <div
          className={`flex items-center justify-between gap-[10px] py-[15px] cursor-pointer transition ease-in-out duration-300 rounded-full pl-4 
          ${currentPath === "/inventory/supplier" ? "bg-white" : ""}`}
          onClick={() => handleNavigate("/inventory/supplier")}
        >
          <div className="flex items-center gap-[10px]">
            <FaBoxOpen  className={`${currentPath === "/inventory/supplier" ? "text-primary" : "text-white"}`} />
            <p className={`text-[16px] leading-[20px] font-normal  ${currentPath === "/inventory/supplier" ? "text-primary" : "text-white"}`}>
              Nhà cung cấp
            </p>
          </div>
        </div>
        <div
          className={`flex items-center justify-between gap-[10px] py-[15px] cursor-pointer transition ease-in-out duration-300 rounded-full pl-4 
            ${currentPath === "/admin/management/branch" ? "bg-white" : ""}`}
          onClick={() => handleNavigate("/admin/management/branch")}
        >
          <div className="flex items-center gap-[10px]">
            <FaGlobe  className={`${currentPath === "/admin/management/branch" ? "text-primary" : "text-white"}`} />
            <p className={`text-[16px] leading-[20px] font-normal  ${currentPath === "/admin/management/branch" ? "text-primary" : "text-white"}`}>
              Thương hiệu
            </p>
          </div>
        </div>
        <div
          className={`flex items-center justify-between gap-[10px] py-[15px] cursor-pointer transition ease-in-out duration-300 rounded-full pl-4 
          ${currentPath === "/admin/management/category" ? "bg-white" : ""}`}
          onClick={() => handleNavigate("/admin/management/category")}
        >
          <div className="flex items-center gap-[10px]">
            <FaListAlt  className={`${currentPath === "/admin/management/category" ? "text-primary" : "text-white"}`} />
            <p className={`text-[15px] leading-[20px] font-normal ${currentPath === "/admin/management/category" ? "text-primary" : "text-white"}`}>
              Danh mục sản phẩm
            </p>
          </div>
        </div>
      </div>

      <div className="pt-[15px] ">
        <p className="text-[10px] font-extranorfont-normal leading-[16px] text-white/[0.4]"></p>
        <div
          className={`flex items-center justify-between gap-[10px] py-[15px] cursor-pointer transition ease-in-out duration-300 rounded-full pl-4 
          ${currentPath === "/inventory/statistic" ? "bg-white" : ""}`}
          onClick={() => handleNavigate("/inventory/statistic")}
        >
          <div className="flex items-center gap-[10px]">
            <MdInventory  className={`${currentPath === "/inventory/statistic" ? "text-primary" : "text-white"}`} />
            <p className="text-[16px] leading-[20px] font-normal text-white">
              Kho
            </p>
          </div>
          <FaArrowRightToBracket  color="white" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
