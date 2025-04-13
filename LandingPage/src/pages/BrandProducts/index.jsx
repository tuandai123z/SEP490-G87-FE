import { motion, AnimatePresence } from 'framer-motion';
import { IoIosArrowUp } from 'react-icons/io';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../../component/layout/Footer';
import Header from '../../component/layout/Header';
import CardItem from '../../component/CardItem';
import FooterWidget from '../../component/layout/FooterWidget';
import axios from 'axios';
import { toast } from 'react-toastify';
import Pagination from '../../component/Pagination';
import { scrollToTop } from '../../utils/helper'
import _ from 'lodash';

const ShopPageTile = ({ products, currentPage, size, slug }) => {
    const navigate = useNavigate();
    const totalElement = products?.totalElements;
    const maxCurrentIndex = (((currentPage - 1) * size) + size) > totalElement ? totalElement : (((currentPage - 1) * size) + size);
    const [category, setCategory] = useState({});

    const getCategoryDetail = () => {
        axios
            .get(`/category/find/${slug}`)
            .then(res => {
                const data = res.data;
                setCategory(data);
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
        getCategoryDetail();
    }, [slug])

    return (
        <div className="flex justify-center w-full">
            <div className="w-[80%] flex items-center px-4 pt-5 justify-between">
                <div className="flex items-center ">
                    <a onClick={() => navigate('/')} className="uppercase transition-all duration-200 cursor-pointer opacity-40 hover:opacity-100">
                        Trang chủ /
                    </a>
                    <a onClick={() => navigate('/cua-hang')} className="pl-3 uppercase transition-all duration-200 cursor-pointer opacity-40 hover:opacity-100">
                        Cửa hàng /
                    </a>
                    <a className="pl-3 font-semibold text-black uppercase">
                        {category?.name}
                    </a>
                </div>
                <div className="flex items-center gap-4">
                    {maxCurrentIndex !== 0 && <p>Showing {`${((currentPage - 1) * size) + 1}-${maxCurrentIndex}`} of {totalElement} results</p>}
                </div>
            </div>
        </div>
    );
};

const Categories = ({ isSingle, content, item, slug }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <li className={`py-[6px] text-[#334862] border-b  border-gray-300 last:border-0 cursor-pointer relative ${slug === item?.code && 'text-black font-semibold'}`} onClick={() => navigate(`/danh-muc-san-pham/${item?.code}`)}>
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

const BrandProducts = () => {
    const [listCategories, setListCategories] = useState([]);
    const [listProducts, setListProducts] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const size = 12;
    const { slug } = useParams();


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
            .get(`/products/category/${slug}`, {
                params: {
                    size: size,
                    page: currentPage - 1,
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
    }, [slug])

    useEffect(() => {
        getListAllProducts();
        scrollToTop();
    }, [currentPage])

    return (
        <>
            <Header />
            <ShopPageTile products={listProducts} currentPage={currentPage} size={size} slug={slug} />
            <div className="flex justify-center w-full pb-6">
                <div className="w-[80%] grid grid-cols-4 gap-4 pt-8">
                    <div className="flex flex-col col-span-1 gap-4 pb-8">
                        <div className="flex flex-col gap-3">
                            <span className="text-xl font-semibold text-[#777]">Danh mục sản phẩm</span>
                            <div className="block h-[3px] max-w-[30px] bg-slate-300"></div>
                            <ul>
                                {listCategories?.map((category, index) => (
                                    <Categories isSingle={true} content={category?.name} key={index} item={category} slug={slug} />
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 col-span-3 gap-5 px-4">
                        {listProducts?.content?.map((item, index) => (
                            <div className='min-w-0 col-span-1' key={index}><CardItem item={item} /></div>
                        ))}
                        {!totalPages && <p >Không tìm thấy sản phẩm nào khớp với lựa chọn của bạn.</p>}
                    </div>
                </div>
            </div>
            {totalPages && <div className='flex justify-center w-full py-6'>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handleChangePage} />
            </div>}
            <FooterWidget />
            <Footer />
        </>
    );
}

export default BrandProducts
