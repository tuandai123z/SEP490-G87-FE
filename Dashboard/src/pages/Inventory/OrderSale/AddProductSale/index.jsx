import { IoMdArrowBack, IoMdMore } from "react-icons/io";
import { BiSolidDish } from "react-icons/bi"
import { FaMinus, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import { formatVND } from "../../../../utils/format";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../../utils/axiosInstant";
import { toast } from "react-toastify";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToOrderSale, changeQuantityProductSale, clearOrderSale, increaseProductSale, reduceProductSale, removeProductSale } from "../../../../actions/saleActions";


const AddProductSale = ({ onChangeShowAdd }) => {
    const [listCategories, setListCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState({});
    const [listProducts, setListProducts] = useState([]);
    const [filterListProducts, setFilterListProducts] = useState([]);
    const [search, setSearch] = useState('')
    const ref = useRef(false);
    const order = useSelector(state => state.sale);
    const dispatch = useDispatch();

    const getListCategories = () => {
        axiosInstance
            .get(`/category/find-all`, {
                params: {
                    size: 999
                }
            })
            .then(res => {
                const data = res.data.content;
                setListCategories(data);
                setCurrentCategory(data[0])
            })
            .catch((err) => {
                if (err.response) {
                    const errorRes = err.response.data;
                    toast.error(errorRes.message);
                } else if (err.request) {
                    toast.error(err.request);
                } else {
                    toast.error(err.message);
                }
            });
    }

    const getListProducts = () => {
        if (currentCategory?.code) {
            axiosInstance
                .get(`/products/category/${currentCategory?.code}`, {
                    params: {
                        size: 999
                    }
                })
                .then(res => {
                    const data = res.data.content;
                    setListProducts(data);
                    setFilterListProducts(data);
                })
                .catch((err) => {
                    if (err.response) {
                        const errorRes = err.response.data;
                        toast.error(errorRes.message);
                    } else if (err.request) {
                        toast.error(err.request);
                    } else {
                        toast.error(err.message);
                    }
                });
        }
    }

    const handleAddProduct = (product) => {
        const action = addToOrderSale(product);
        dispatch(action);
    }

    const handleDecrease = (product) => {
        const action = reduceProductSale(product);
        dispatch(action);
    }

    const handleIncrease = (product) => {
        const action = increaseProductSale(product);
        dispatch(action);
    }

    const handleRemove = (product) => {
        const action = removeProductSale(product);
        dispatch(action);
    }

    const handleChangeQuantity = (code, quantity) => {
        if (Number(quantity) <= 0) return
        const payload = { code: code, quantity: Number(quantity) }
        const action = changeQuantityProductSale(payload);
        dispatch(action);
    }

    const handleClear = () => {
        const action = clearOrderSale();
        dispatch(action);
    }

    useEffect(() => {
        if (ref.current) return;
        ref.current = true;
        getListCategories();
    }, [])

    useEffect(() => {
        getListProducts();
        setSearch('')
    }, [currentCategory])

    useEffect(() => {
        const filterResult = listProducts?.filter(item => item?.name.toLowerCase().includes(search.toLowerCase()));
        setFilterListProducts(filterResult)
    }, [search])


    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-primary animate-fadeIn">
            <div className="flex items-center justify-between h-[70px] bg-blue-400 ">
                <div className='px-[15px] py-[30px] flex items-center justify-center border-[#EDEDED]/[0.3] '>
                    <img src={''} alt="" className="items-center inline-block w-10 mr-2 rounded-full" />
                    <h1 className='text-white text-[20px] leading-[24px] font-extrabold cursor-pointer uppercase'> Thiết bị điện hải phòng</h1>
                </div>
                <div className={'text-white bg-red-400 px-[15px] flex items-center h-full cursor-pointer'} onClick={onChangeShowAdd}>
                    <span className="flex items-center"><IoMdArrowBack className="mr-2" /> Quay lại (Esc)</span>
                </div>
            </div>
            <div className="flex flex-1 bg-gray-700">
                <div className="w-[15%] bg-white rounded-sm overflow-auto max-h-[100vh] scrollbar-hide flex flex-col border-r-2 border-gray-300">
                    <p className="text-[20px] leading-[20px] font-medium text-blue-500 w-full px-10 py-6">Danh mục</p>
                    {listCategories?.map((cate, index) => (
                        <div onClick={() => setCurrentCategory(cate)}
                            className={`w-full h-[40px] flex px-12 items-center cursor-pointer ${currentCategory?.id === cate?.id ? "text-blue-400" : "text-black"}`} key={index}>
                            <span className="font-medium ">{cate?.name}</span>
                        </div>
                    ))}
                </div>
                <div className="w-[55%] px-1 flex-row bg-white">
                    <div className="flex w-full py-4">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Tìm kiếm sản phẩm..."
                                className="w-full py-2 pl-10 pr-4 border-2 rounded-md outline-none"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                            <FaSearch className="absolute text-blue-400 -translate-y-1/2 pointer-events-none left-3 top-1/2" />

                        </div>
                    </div>
                    <div className="w-full grid grid-cols-4 gap-2 mt-1 rounded-sm overflow-y-auto no-scrollbar max-h-[79vh] ">
                        {filterListProducts?.map((item, index) => (
                            <div className="relative p-3 mr-1 bg-blue-400 rounded-md cursor-pointer" key={index} onClick={() => { handleAddProduct(item); }}>
                                <img className="object-cover  h-[140px] w-full rounded-md" src={item?.imagePath} alt="" />
                                <div className="flex flex-col items-center w-full pt-2">
                                    <span className="font-medium text-white " >{item?.name}</span>
                                    <span className="text-[12px] text-white font-normal">{item?.brandName}</span>

                                </div>

                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-[30%] bg-white py-4 px-3">
                    <div className="min-h-[65vh] max-h-[65vh] p-4 bg-blue-400  rounded-md">
                        <div className="min-h-[60vh] max-h-[60vh] px-4 py-2 bg-white rounded-md overflow-y-auto no-scrollbar  scrollbar-hide">
                            <div className="flex justify-center w-full py-3">
                                <span className="text-xl font-semibold text-blue-400">Danh sách thiết bị</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                {order?.map((d, index) => (
                                    <div className="flex px-2 py-2 bg-blue-300 rounded-md" key={index}>
                                        <div className="w-[60%] ">
                                            <div className="flex justify-between">
                                                <div className="flex-row w-full">
                                                    <h2 className="text-[12px] text-white font-medium">{index + 1}. {d?.name}</h2>
                                                    <span className="text-[12px] text-white font-normal">{d?.brandName}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between w-full gap-2 my-3">
                                            <div onClick={() => handleDecrease(d)}
                                                className="w-[17%] bg-white shadow-lg flex justify-center items-center rounded-md cursor-pointer">
                                                <FaMinus className="text-xl font-bold " />
                                            </div>
                                            <div className="w-[20%] bg-white shadow-lg flex justify-center items-center rounded-md cursor-pointer">
                                                <input className="w-full px-2 text-center outline-none" value={d?.quantity} onChange={(e) => handleChangeQuantity(d?.code, e.target.value)} />
                                            </div>
                                            <div onClick={() => handleIncrease(d)}
                                                className="w-[17%] bg-white shadow-lg flex justify-center items-center rounded-md cursor-pointer">
                                                <FaPlus className="text-xl font-bold " />
                                            </div>
                                            <div onClick={() => handleRemove(d)}
                                                className="w-[17%] bg-white shadow-lg flex justify-center items-center rounded-md cursor-pointer">
                                                <span className="text-sm font-medium text-red-500 "><FaTrash className="text-red-300" /></span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex justify-between  p-4 min-h-[15vh] max-h-[15vh]  bg-blue-400 rounded-lg  bottom-2 left-36 mt-2">
                        <div className="flex flex-col text-white">
                            <h3 className="mb-3 font-semibold">Thiết bị đang chọn {order?.length}</h3>
                            <span>Đã chọn {order?.length} thiết bị</span>
                        </div>
                        <div className="flex items-center "><button onClick={onChangeShowAdd} className="px-3 py-2 h-[50%] font-semibold text-white bg-blue-600 rounded-md shadow-md cursor-pointer">Xác nhận</button></div>
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

export default AddProductSale
