import { IoMdArrowBack, IoMdMore } from "react-icons/io";
import { BiSolidDish } from "react-icons/bi"
import { FaMinus, FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../../../../utils/axiosInstant";
import { addToOrderReturn, clearOrderReturn, increaseProductReturn, reduceProductReturn, removeProductReturn } from "../../../../../actions/orderReturnAction";


const AddProduct = ({ onChangeShowAdd, data }) => {
    const [listCategories, setListCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState({});
    const [listProducts, setListProducts] = useState([]);
    const ref = useRef(false);
    const orderReturn = useSelector(state => state.orderReturn);
    const dispatch = useDispatch();

    const handleAddProduct = (product) => {
        const isSastify = orderReturn?.length === 0 ? true : orderReturn?.some(item => (item?.code === product.code && item.quantity < product.quantity));
        if (isSastify) {
            const action = addToOrderReturn(product);
            dispatch(action);
        } else {
            toast.warn('Sản phẩm này đã đạt giới hạn!')
        }
    }

    const handleDecrease = (product) => {
        const action = reduceProductReturn(product);
        dispatch(action);
    }

    const handleIncrease = (product) => {
        const action = increaseProductReturn(product);
        dispatch(action);
    }

    const handleRemove = (product) => {
        const action = removeProductReturn(product);
        dispatch(action);
    }

    const handleClear = () => {
        const action = clearOrderReturn();
        dispatch(action);
    }


    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-primary animate-fadeIn">
            <div className="flex items-center justify-between h-[70px] bg-gray-700 ">
                <div className='px-[15px] py-[30px] flex items-center justify-center border-[#EDEDED]/[0.3] '>
                    <img src={''} alt="" className="items-center inline-block w-10 mr-2 rounded-full" />
                    <h1 className='text-white text-[20px] leading-[24px] font-extrabold cursor-pointer'> Thiết bị điện hải phòng</h1>
                </div>
                <div className={'text-white bg-red-400 px-[15px] flex items-center h-full cursor-pointer'} onClick={onChangeShowAdd}>
                    <span className="flex items-center"><IoMdArrowBack className="mr-2" /> Quay lại (Esc)</span>
                </div>
            </div>
            <div className="flex flex-1 bg-gray-700">
                <div className="flex-row w-full px-1">
                    <div className="flex w-full">
                        <div className="w-[50%] mr-1 h-[40px] bg-slate-200 rounded-sm ">

                        </div>
                        <div className="w-[50%] h-[40px] bg-slate-200 rounded-sm">

                        </div>
                    </div>
                    <div className="w-full flex flex-wrap mt-1 rounded-sm overflow-y-auto no-scrollbar max-h-[79vh]">
                        {data?.map((item, index) => (
                            <div className="w-[16%] mr-1 relative cursor-pointer" key={index} onClick={() => { handleAddProduct(item); }}>
                                <div className="w-full">
                                    <img className="object-cover md:h-[180px] rounded-l-md rounded-t-sm" src={item?.imagePath} alt="" />
                                </div>
                                <div className={`absolute bottom-0 w-full left-0 h-[50px] bg-gray-500/[0.95] rounded-b-sm flex justify-center items-center`}>
                                    <span className="font-medium text-white">{item?.name}</span>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-[18%] bg-white">
                    <div className="w-full h-[40px] bg-slate-200 rounded-sm mb-1 flex">
                        <div className="w-[20%] border-r border-slate-400 flex justify-center items-center"><BiSolidDish /></div>
                        <div className="w-[60%] flex justify-center items-center border-r border-slate-400">
                            <span className="text-sm font-medium">Danh sách thiết bị</span>
                        </div>
                        <div className="w-[20%] flex justify-center items-center"><IoMdMore className="size-8" /></div>
                    </div>
                    <div className="min-h-[85vh] max-h-[85vh] overflow-y-auto no-scrollbar  scrollbar-hide">
                        {orderReturn?.map((d, index) => (
                            <div className="flex-row px-2 py-2 bg-blue-600" key={index}>
                                <div className="w-full ">
                                    <div className="flex justify-between">
                                        <div className="w-[5%] flex justify-center">
                                            <span className="text-[12px] text-white font-medium">{index + 1}.</span>
                                        </div>
                                        <div className="w-[60%] flex-row">
                                            <h2 className="text-[12px] text-white font-medium">{d?.name}</h2>
                                            <span className="text-[12px] text-white font-normal">{d?.brandName}</span>
                                        </div>
                                        <div className="w-[30%] flex items-start">
                                            <span className="text-[12px] text-white font-medium">Số lượng: {d?.quantity}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between w-full my-3">
                                    <div onClick={() => handleDecrease(d)}
                                        className="w-[17%] bg-white shadow-lg flex justify-center items-center py-2 rounded-md cursor-pointer">
                                        <FaMinus className="text-xl font-bold " />
                                    </div>
                                    <div onClick={() => handleIncrease(d)}
                                        className="w-[17%] bg-white shadow-lg flex justify-center items-center py-2 rounded-md cursor-pointer">
                                        <FaPlus className="text-xl font-bold " />
                                    </div>
                                    <div className="w-[17%] flex justify-center items-center py-2 ">
                                        {/* <FaMinus className="text-xl font-bold " /> */}
                                    </div>
                                    <div className="w-[17%] flex justify-center items-center py-2 ">
                                        {/* <FaMinus className="text-xl font-bold " /> */}
                                    </div>
                                    <div onClick={() => handleRemove(d)}
                                        className="w-[17%] bg-white shadow-lg flex justify-center items-center py-2 rounded-md cursor-pointer">
                                        <span className="text-sm font-medium text-red-500 ">Xoá</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="absolute bg-white bottom-2 left-36 w-[70%] rounded-lg p-4">
                    <h3 className="mb-3 font-semibold">Thiết bị đang chọn {orderReturn?.length}</h3>
                    <div className="flex items-center justify-between">
                        <span>Đã chọn {orderReturn?.length} thiết bị</span>
                        <button onClick={onChangeShowAdd} className="px-3 py-2 font-semibold text-white bg-gray-500 rounded-md shadow-md cursor-pointer">Xác nhận</button>
                    </div>
                </div>

            </div>
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes slideIn {
                    from {
                        transform: translateY(-20%);
                    }
                    to {
                        transform: translateY(0);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-in-out;
                }

                .animate-slideIn {
                    animation: slideIn 0.3s ease-in-out;
                }
            `}</style>
        </div>
    )
}

export default AddProduct
