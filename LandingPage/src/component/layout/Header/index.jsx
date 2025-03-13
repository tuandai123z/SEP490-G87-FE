import { motion } from 'framer-motion';
import { FaFacebookF } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { MdMailOutline } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';
import { FaPhoneAlt } from 'react-icons/fa';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const headerRef = useRef();
  const [isSticky, setIsSticky] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }

    const handleScroll = () => {
      if (window.scrollY > headerHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headerHeight]);

  return (
    <div className="w-full" ref={headerRef}>
      <div className="flex items-center justify-center w-full bg-primary_header h-9">
        <div className="w-[80%] flex justify-between items-center">
          <div className="flex gap-2">
            <FaFacebookF className="text-gray-500 text-md" />
            <FaInstagram className="text-gray-500 text-md" />
            <FaTwitter className="text-gray-500 text-md" />
            <MdMailOutline className="text-gray-500 text-md" />
          </div>
          <div className="flex text-sm font-normal text-gray-500 cursor-pointer">
            <a className="p-2 relative after:absolute after:right-0 after:top-[50%] after:w-[0.5px] after:h-3 after:translate-y-[-50%] after:bg-gray-400">
              Liên hệ
            </a>
            <a className="p-2 relative after:absolute after:right-0 after:top-[50%] after:w-[0.5px] after:h-3 after:translate-y-[-50%] after:bg-gray-400">
              Chính sách chung
            </a>
            <a className="p-2 ">Thanh toán và giao nhận</a>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full h-24">
        <div className="w-[80%] flex justify-between">
          <a className="w-[20%] h-[64px] flex justify-start items-center text-[28px] font-bold uppercase text-[#446084] no-underline text-center leading-tight px-2 overflow-hidden cursor-pointer" onClick={() => navigate('/')}>
            Thiết bị điện hải phòng
          </a>
          <div className="w-[20%] flex justify-center items-center">
            <FaPhoneAlt className="text-red size-[26px] uppercase mr-2" />
            <span className="text-2xl text-red">0888 637 937</span>
          </div>
        </div>
      </div>
      <div className={`w-full flex justify-center items-center h-[55px] bg-[#446084] `}>
        <div className="w-[80%] flex items-center">
          <ul className="flex gap-4 text-white">
            <li className="mr-3 cursor-pointer">
              <a
                className="pb-[6px] pt-[6px] transition-all duration-200 ease-in-out hover:border-b-2  opacity-80 hover:opacity-100 "
                onClick={() => navigate('/')}
              >
                Trang chủ
              </a>
            </li>
            <li className="mr-3 cursor-pointer">
              <a className="pb-[6px] pt-[6px] transition-all duration-200 ease-in-out hover:border-b-2  opacity-80 hover:opacity-100 ">
                Giới thiệu
              </a>
            </li>
            <li className="mr-3 cursor-pointer" onClick={() => navigate('/cua-hang')}>
              <a className="pb-[6px] pt-[6px] transition-all duration-200 ease-in-out hover:border-b-2  opacity-80 hover:opacity-100 ">
                Sản phẩm thiết bị điện
              </a>
            </li>
            <li className="mr-3 cursor-pointer">
              <a className="pb-[6px] pt-[6px] transition-all duration-200 ease-in-out hover:border-b-2  opacity-80 hover:opacity-100 ">
                Đại lí phân phối
              </a>
            </li>
            <li className="mr-3 cursor-pointer">
              <a className="pb-[6px] pt-[6px] transition-all duration-200 ease-in-out hover:border-b-2  opacity-80 hover:opacity-100 ">
                Tin tức
              </a>
            </li>
            <li className="mr-3 cursor-pointer">
              <a className="pb-[6px] pt-[6px] transition-all duration-200 ease-in-out hover:border-b-2  opacity-80 hover:opacity-100 ">
                Liên hệ
              </a>
            </li>
          </ul>
        </div>
      </div>
      <motion.div
        className={`w-full flex justify-center items-center h-[55px] bg-[#446084] text-white fixed top-0 z-50 shadow-lg`}
        initial={{ y: -headerHeight, opacity: 0 }}
        animate={isSticky ? { y: 0, opacity: 1 } : { y: -headerHeight, opacity: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div
          className={`w-full flex justify-center items-center h-[55px] bg-[#446084] text-white ${isSticky ? 'fixed top-0 translate-y-0 shadow-lg' : ''}`}
        >
          <div className="w-[80%] flex items-center">
            <ul className="flex gap-4">
              <li className="mr-3 cursor-pointer">
                <a
                  className="pb-[6px] pt-[6px] transition-all duration-200 ease-in-out hover:border-b-2  opacity-80 hover:opacity-100 "
                  onClick={() => navigate('/')}
                >
                  Trang chủ
                </a>
              </li>
              <li className="mr-3 cursor-pointer">
                <a className="pb-[6px] pt-[6px] transition-all duration-200 ease-in-out hover:border-b-2  opacity-80 hover:opacity-100 ">
                  Giới thiệu
                </a>
              </li>
              <li className="mr-3 cursor-pointer" onClick={() => navigate('/cua-hang')}>
                <a className="pb-[6px] pt-[6px] transition-all duration-200 ease-in-out hover:border-b-2  opacity-80 hover:opacity-100 ">
                  Sản phẩm thiết bị điện
                </a>
              </li>
              <li className="mr-3 cursor-pointer">
                <a className="pb-[6px] pt-[6px] transition-all duration-200 ease-in-out hover:border-b-2  opacity-80 hover:opacity-100 ">
                  Đại lí phân phối
                </a>
              </li>
              <li className="mr-3 cursor-pointer">
                <a className="pb-[6px] pt-[6px] transition-all duration-200 ease-in-out hover:border-b-2  opacity-80 hover:opacity-100 ">
                  Tin tức
                </a>
              </li>
              <li className="mr-3 cursor-pointer">
                <a className="pb-[6px] pt-[6px] transition-all duration-200 ease-in-out hover:border-b-2  opacity-80 hover:opacity-100 ">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Header;
