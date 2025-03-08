import { motion, AnimatePresence } from 'framer-motion';
import { IoIosArrowUp } from 'react-icons/io';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../component/layout/Footer';
import Header from '../../component/layout/Header';
import { FaSearch } from 'react-icons/fa';
import CardItem from '../../component/CardItem';
import FooterWidget from '../../component/layout/FooterWidget';

const ShopPageTile = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center w-full">
      <div className="w-[80%] flex items-center px-4 pt-5 justify-between">
        <div className="flex items-center ">
          <a onClick={() => navigate('/')} className="uppercase">
            Trang chủ /
          </a>
        </div>
        <div className="flex items-center gap-4">
          <p>Showing 1-12 of 326 results</p>
          <form class="max-w-sm mx-auto">
            <select
              id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm outline-none focus:shadow-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Thứ tự mặc định</option>
              <option value="US">Thứ tự theo mức độ phổ biến</option>
              <option value="CA">Thứ tự theo điểm đánh giá</option>
              <option value="FR">Mới nhất</option>
              <option value="DE">Thứ tự theo giá: thấp đến cao</option>
              <option value="DE">Thứ tự theo giá: cao xuống thấp</option>
            </select>
          </form>
        </div>
      </div>
    </div>
  );
};

const Categories = ({ isSingle, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <li className="py-[6px] text-[#334862] border-b  border-gray-300 last:border-0 cursor-pointer relative">
        {content}
        <motion.div
          className="absolute right-0 -translate-y-1/2 top-1/2"
          animate={{ rotate: isOpen ? 0 : 180 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <IoIosArrowUp onClick={() => setIsOpen(!isOpen)} />
        </motion.div>
      </li>
      <AnimatePresence>
        {isOpen && (
          <motion.li
            className="text-[#334862] border-b border-gray-300 last:border-0 cursor-pointer overflow-hidden"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {content}
          </motion.li>
        )}
      </AnimatePresence>
    </>
  );
};

const Shop = () => {
  const listCategories = ['Chưa phân loại', 'Công trình', 'Đèn chiếu sáng - trang trí'];

  const items = [
    {
      id: '1',
      name: 'Cảm biến nhiệt độ',
      category: 'AUTONICS',
      url: 'https://thietbidienhaiphong.com/wp-content/uploads/2015/03/download-3-247x184.jpg',
      price: 2000000,
    },
    {
      id: '1',
      name: 'Cảm biến nhiệt độ',
      category: 'AUTONICS',
      url: 'https://thietbidienhaiphong.com/wp-content/uploads/2015/03/download-3-247x184.jpg',
      price: 2000000,
    },
    {
      id: '1',
      name: 'Cảm biến nhiệt độ',
      category: 'AUTONICS',
      url: 'https://thietbidienhaiphong.com/wp-content/uploads/2015/03/download-3-247x184.jpg',
      price: 2000000,
    },
    {
      id: '1',
      name: 'Cảm biến nhiệt độ',
      category: 'AUTONICS',
      url: 'https://thietbidienhaiphong.com/wp-content/uploads/2015/03/download-3-247x184.jpg',
      price: 2000000,
    },
  ];

  return (
    <>
      <Header />
      <ShopPageTile />
      <div className="flex justify-center w-full pb-6">
        <div className="w-[80%] grid grid-cols-4 gap-4 pt-8">
          <div className="flex flex-col col-span-1 gap-4 pb-8">
            <div className="flex">
              <input type="text" className="w-[80%] outline-none h-[40px] border-2 p-3" placeholder="Tìm kiếm..." />
              <span className="w-[40px] h-[40px] flex justify-center items-center bg-[#132d52]">
                <FaSearch className="text-white" />
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-xl font-semibold text-[#777]">Danh mục sản phẩm</span>
              <div className="block h-[3px] max-w-[30px] bg-slate-300"></div>
              <ul>
                {listCategories?.map(category => (
                  <Categories isSingle={true} content={category} />
                ))}
              </ul>
            </div>
          </div>
          <div class="col-span-3 px-4 flex gap-5 flex-wrap">
            {items?.map((item, index) => (
              <CardItem key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
      <FooterWidget />
      <Footer />
    </>
  );
};

export default Shop;
