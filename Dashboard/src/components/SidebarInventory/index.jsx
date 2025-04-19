import React, { useState } from 'react';
import { FaChevronLeft, FaFileImport, FaClipboardList } from 'react-icons/fa';
import { MdInventory, } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowUp } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';
import { ADMIN_ROLE, INVENTORY_ROLE, MANAGER_ROLE, SALE_ROLE } from '../../utils/constants';
import { useSelector } from 'react-redux';

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
                    <p className="text-[18px] font-bold leading-[16px] text-white">{content}</p>

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
                                    {p?.icon && <p.icon color="white " />}<p className="text-[14px] leading-[20px] font-medium text-white">{p?.content}</p>
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
    const dataUser = useSelector(state => state.user);
    const roleUser = dataUser.role;
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
            ],
            roles: [
                ADMIN_ROLE, SALE_ROLE, MANAGER_ROLE
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
                },
                {
                    content: "Xuất kho hoàn hàng",
                    icon: FaFileImport,
                    url: '/inventory/export-return/create'
                }
            ],
            roles: [
                ADMIN_ROLE, INVENTORY_ROLE, MANAGER_ROLE
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
            ],
            roles: [
                ADMIN_ROLE, SALE_ROLE, MANAGER_ROLE
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
            ],
            roles: [
                ADMIN_ROLE, INVENTORY_ROLE, MANAGER_ROLE
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
            ],
            roles: [
                ADMIN_ROLE, MANAGER_ROLE
            ]
        },
    ]
    const handleNavigate = (url) => {
        if (roleUser !== ADMIN_ROLE && roleUser !== MANAGER_ROLE) return
        navigate(url)
    }

    return (
        <div className="bg-primary px-[25px] h-screen max-w-[15%] fixed top-0 left-0 overflow-y-auto scrollbar-hide hide-scrollbar ">
            <div className="py-4 px-2 flex items-center justify-center border-b-[1px] border-[#EDEDED]/[0.3]">
            <img
          src="/logoThietBi.png"
          alt="Thiết Bị"
                    className="cursor-pointer h-fit"
        />
            </div>
            <div className={`flex items-center gap-[15px] py-[20px] border-b-[1px] rounded pl-4 ${(roleUser === ADMIN_ROLE || roleUser === MANAGER_ROLE) ? ' transition ease-in-out duration-300 hover:bg-secondary border-[#EDEDED]/[0.3] cursor-pointer' : "cursor-default"}`}
                onClick={() => handleNavigate('/inventory/statistic')}>
                <MdInventory color="white" />
                <p className="text-[18px] leading-[20px] font-bold text-white ">Báo cáo kho</p>
            </div>
            {listPages?.map(((page, index) => {
                const isDisplay = page?.roles?.includes(roleUser);
                if (!isDisplay) return
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
