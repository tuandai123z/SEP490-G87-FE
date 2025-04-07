import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dataUser = useSelector(state => state.user);
  const routerLadingPage = `http://localhost:4000/`

  const showProfile = () => {
    // alert("helloo")
    setOpen(!open);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    // localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="w-full ">
      <div className="flex items-center justify-between h-[56px] shadow-lg px-[25px] ">
        <div className="flex items-center rounded-[5px]"></div>
        <div className="flex items-center gap-[20px]">
          <div className="flex items-center gap-[25px] border-r-[1px] pr-[25px]"></div>
          <div className="flex items-center gap-[15px] relative" onClick={showProfile}>
            <p className="font-semibold">{dataUser?.username.toUpperCase()}</p>
            <div className="h-[50px] w-[50px] rounded-full bg-[#4E73DF] cursor-pointer flex items-center justify-center relative z-40">
              <img src={'https://cdn1.iconfinder.com/data/icons/avatar-3/512/Manager-512.png'} alt="" className="w-full rounded-full" />
            </div>

            {open && (
              <div className="bg-white border h-[150px] w-[180px] absolute bottom-[-135px] z-20 right-0 pt-[15px] pl-[15px] space-y-[10px]">
                <p className="cursor-pointer hover:text-[blue] font-semibold" onClick={() => navigate('/admin/dashboard')}>
                  Tổng quan
                </p>
                <p className="cursor-pointer hover:text-[blue] font-semibold" onClick={() => navigate('/profile')}>
                  Thông tin
                </p>
                <p className="cursor-pointer hover:text-[blue] font-semibold"onClick={() => {window.location.href = `${routerLadingPage}`}}>
                Website 
                </p>
                <p className="cursor-pointer hover:text-[blue] font-semibold" onClick={() => handleLogout()}>
                  Đăng xuất
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
