import { motion, AnimatePresence } from 'framer-motion';
import { IoIosArrowUp } from 'react-icons/io';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../component/layout/Footer';
import Header from '../../component/layout/Header';
import { FaSearch } from 'react-icons/fa';
import CardItem from '../../component/CardItem';
import FooterWidget from '../../component/layout/FooterWidget';
import axios from 'axios';
import { toast } from 'react-toastify';
import Pagination from '../../component/Pagination';
import { scrollToTop } from '../../utils/helper'
import _ from 'lodash';

const ShopPageTile = ({ products, currentPage, size }) => {
  const navigate = useNavigate();
  const totalElement = products?.totalElements;
  const maxCurrentIndex = (((currentPage - 1) * size) + size) > totalElement ? totalElement : (((currentPage - 1) * size) + size);

  return (
    <div className="flex justify-center w-full">
      <div className="w-[80%] flex items-center px-4 pt-5 justify-between">
        <div className="flex items-center ">
          <a onClick={() => navigate('/')} className="uppercase transition-all duration-200 cursor-pointer opacity-40 hover:opacity-100">
            Trang chủ / 
          </a>
          <a className="pl-4 font-semibold text-black uppercase">
            Cửa hàng
          </a>
        </div>
        <div className="flex items-center gap-4">
          <p>Showing {`${((currentPage - 1) * size) + 1}-${maxCurrentIndex}`} of {totalElement} results</p>
          <form className="max-w-sm mx-auto">
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm outline-none focus:shadow-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

const Categories = ({ isSingle, content, item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <li className="py-[6px] text-[#334862] border-b  border-gray-300 last:border-0 cursor-pointer relative" onClick={() => navigate(`/danh-muc-san-pham/${item?.code}`)}>
        {content}
        {!isSingle && <motion.div
          className="absolute right-0 -translate-y-1/2 top-1/2"
          animate={{ rotate: isOpen ? 0 : 180 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <IoIosArrowUp onClick={() => setIsOpen(!isOpen)} />
        </motion.div>}
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
  const [listCategories, setListCategories] = useState([]);
  const [listProducts, setListProducts] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const size = 12;

  const handleChangePage = (page) => {
    setCurrentPage(page);
  }

  const getListCategories = () => {
    axios
      .get(`/category/find-all`, {
        params: {
          size: 999,
        }
      })
      .then(res => {
        const data = res.data.content;
        setListCategories(data);
      })
      .catch(err => {
        if (err.response) {
          const errorRes = err.response.data;
          toast.error(errorRes.message);
        } else if (err.request) {
          toast.error("Yêu cầu không thành công");
        } else {
          toast.error(err.message);
        }
      })
  }

  const getListAllProducts = () => {
    axios
      .get(`/products/find-all`, {
        params: {
          size: size,
          page: currentPage - 1,
          name: search
        }
      })
      .then(res => {
        const data = res.data;
        setTotalPages(data?.totalPages);
        setListProducts(data);
      })
      .catch(err => {
        if (err.response) {
          const errorRes = err.response.data;
          toast.error(errorRes.message);
        } else if (err.request) {
          toast.error("Yêu cầu không thành công");
        } else {
          toast.error(err.message);
        }
      })
  }

  useEffect(() => {
    getListCategories();
    getListAllProducts();
  }, [])

  useEffect(() => {
    getListAllProducts();
    scrollToTop();
  }, [currentPage])

  const handleDebouncedChange = useCallback(
    _.debounce((value) => {
      setIsSearch(prev => !prev);
    }, 500),
    []
  )

  useEffect(() => {
    handleDebouncedChange(search)
    return () => {
      handleDebouncedChange.cancel();
    }
  }, [search])

  useEffect(() => {
    setCurrentPage(1);
    getListAllProducts();
  }, [isSearch])


  return (
    <>
      <Header />
      <ShopPageTile products={listProducts} currentPage={currentPage} size={size} />
      <div className="flex justify-center w-full pb-6">
        <div className="w-[80%] grid grid-cols-4 gap-4 pt-8">
          <div className="flex flex-col col-span-1 gap-4 pb-8">
            <div className="flex">
              <input type="text" className="w-[80%] outline-none h-[40px] border-2 p-3" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm kiếm..." />
              <span className="w-[40px] h-[40px] flex justify-center items-center bg-[#132d52] cursor-pointer">
                <FaSearch className="text-white" />
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-xl font-semibold text-[#777]">Danh mục sản phẩm</span>
              <div className="block h-[3px] max-w-[30px] bg-slate-300"></div>
              <ul>
                {listCategories?.map((category, index) => (
                  <Categories isSingle={true} content={category?.name} key={index} item={category} />
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-wrap col-span-3 gap-5 px-4">
            {listProducts?.content?.map((item, index) => (
              <CardItem key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
      <div className='flex justify-center w-full py-6'>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handleChangePage} />
      </div>
      <FooterWidget />
      <Footer />
    </>
  );
};

export default Shop;
