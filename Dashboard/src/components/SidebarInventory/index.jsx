import React, { useState } from 'react';
import { FaChevronLeft, FaFileImport, FaClipboardList } from 'react-icons/fa';
import { MdInventory, } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowUp } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';

const Categories = ({ content, Icon, pages }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleNavigate = (url) => {
        navigate(url);
    }

    return (
        <>

            <motion.div
                className="py-[8px] text-[#334862] border-b  border-gray-300 last:border-0 cursor-pointer relative list-none"
                transition={{ duration: 0.3, ease: 'easeOut' }}
            >
                <li className="py-[8px] text-[#334862] flex justify-between items-center border-b  border-gray-300 last:border-0 cursor-pointer relative list-none" onClick={() => setIsOpen(!isOpen)}>
                    <p className="text-[15px] font-bold leading-[16px] text-white">{content}</p>

                    <motion.div
                        className=""
                        animate={{ rotate: isOpen ? 0 : 180 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                        <Icon />
                    </motion.div>
                </li>
            </motion.div>
            <AnimatePresence>
                {isOpen && (
                    pages?.map((p, index) => {
                        return (
                            <motion.li
                                className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer transition ease-in-out duration-300 rounded pl-4 hover:bg-secondary overflow-hidden" onClick={() => handleNavigate(p?.url)}
                                initial={{ opacity: 0, scaleY: 0 }}
                                animate={{ opacity: 1, scaleY: 1 }}
                                exit={{ opacity: 0, scaleY: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                key={index}
                            >
                                <div className="flex items-center gap-[10px]" >
                                    {p?.icon && <p.icon color="white" />}<p className="text-[14px] leading-[20px] font-normal text-white">{p?.content}</p>
                                </div>
                            </motion.li>
                        )
                    })
                )}
            </AnimatePresence>
        </>
    );
};

const SidebarInventory = () => {
    const navigate = useNavigate();
    const listPages = [
        // {
        //     content: "Phiếu nhập kho hoàn hàng",
        //     icon: IoIosArrowUp,
        //     listPage: [
        //         {
        //             content: "Danh sách",
        //             icon: FaClipboardList,
        //             url: '/inventory/receipt-return/management'
        //         },
        //         {
        //             content: "Tạo phiếu",
        //             icon: FaFileImport,
        //             url: '/inventory/receipt-return/create'
        //         }
        //     ]
        // },
        {
            content: "Hoàn hàng",
            icon: IoIosArrowUp,
            listPage: [
                {
                    content: "Danh sách hoàn hàng",
                    icon: FaClipboardList,
                    url: '/inventory/return/management'
                },
                {
                    content: "Tạo phiếu hoàn hàng",
                    icon: FaFileImport,
                    url: '/inventory/return/create'
                }
            ]
        },
        {
            content: "Xuất kho",
            icon: IoIosArrowUp,
            listPage: [
                {
                    content: "Danh sách xuất kho",
                    icon: FaClipboardList,
                    url: '/inventory/export/management'
                },
                {
                    content: "Tạo phiếu xuất kho",
                    icon: FaFileImport,
                    url: '/inventory/export/create'
                }
            ]
        },
        {
            content: "Bán hàng",
            icon: IoIosArrowUp,
            listPage: [
                {
                    content: "Danh sách bán hàng",
                    icon: FaClipboardList,
                    url: '/inventory/orderSale/management'
                },
                {
                    content: "Tạo phiếu bán hàng",
                    icon: FaFileImport,
                    url: '/inventory/orderSale/create'
                }
            ]
        },
        {
            content: "Nhập kho",
            icon: IoIosArrowUp,
            listPage: [
                {
                    content: "Danh sách nhập kho",
                    icon: FaClipboardList,
                    url: '/inventory/reception/management'
                },
                {
                    content: "Nhập kho hàng mới",
                    icon: FaFileImport,
                    url: '/inventory/reception/create'
                },
                {
                    content: "Nhập kho hàng hoàn",
                    icon: FaFileImport,
                    url: '/inventory/receipt-return/create'
                }
            ]
        },
        {
            content: "Mua hàng",
            icon: IoIosArrowUp,
            listPage: [
                {
                    content: "Danh sách mua hàng",
                    icon: FaClipboardList,
                    url: '/inventory/order/management'
                },
                {
                    content: "Tạo phiếu mua hàng",
                    icon: FaFileImport,
                    url: '/inventory/order/create'
                }
            ]
        },
    ]
    const handleNavigate = (url) => {
        navigate(url)
    }

    return (
        <div className="bg-primary px-[25px] h-screen max-w-[15%] fixed top-0 left-0 overflow-y-auto scrollbar-hide hide-scrollbar ">
            <div className="py-4 px-2 flex items-center justify-center border-b-[1px] border-[#EDEDED]/[0.3]">
                <h1 className="text-white text-base uppercase leading-[24px] font-extrabold cursor-pointer">Thiết bị điện hải Phòng</h1>
            </div>
            <div className="flex items-center gap-[15px] py-[20px] border-b-[1px] transition ease-in-out duration-300 rounded pl-4 hover:bg-secondary border-[#EDEDED]/[0.3] cursor-pointer "
                onClick={() => handleNavigate('/inventory/statistic')}>
                <MdInventory color="white" />
                <p className="text-[14px] leading-[20px] font-bold text-white ">Báo cáo kho</p>
            </div>
            {listPages?.map(((page, index) => {
                return (
                    <Categories
                        content={page?.content}
                        Icon={page?.icon}
                        pages={page?.listPage}
                        index={index}
                    />
                )
            }))}

        </div>
    );
};

export default SidebarInventory;
