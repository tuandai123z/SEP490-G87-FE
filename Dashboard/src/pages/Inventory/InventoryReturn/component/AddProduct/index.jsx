import { IoMdArrowBack, IoMdMore } from "react-icons/io";
import { FaMinus, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToOrderReturn, changeQuantityProductReturn, clearOrderReturn, increaseProductReturn, reduceProductReturn, removeProductReturn } from "../../../../../actions/orderReturnAction";
import { useState } from "react";
import { useEffect } from "react";


const AddProduct = ({ onChangeShowAdd, data }) => {
    const orderReturn = useSelector(state => state.orderReturn);
    const [filterListProducts, setFilterListProducts] = useState(data);
    const [search, setSearch] = useState('')
    const dispatch = useDispatch();

    const handleAddProduct = (product) => {
        const resultProduct = orderReturn?.filter(p => p.code === product.code);
        const totalQuantity = resultProduct.reduce((sum, product) => sum + Number(product?.currentQuantity), Number(0));
        if (resultProduct?.length > 0) {
            if (totalQuantity === resultProduct[0].quantity) {
                toast.warn(`Số lượng thiết bị ${product?.name} trả hàng đã đạt tối đa`);
                return;
            }
        }

        const newProduct = { ...product, currentQuantity: 1 }
        const action = addToOrderReturn(newProduct);
        dispatch(action);
    }

    const handleDecrease = (product) => {
        const action = reduceProductReturn(product);
        dispatch(action);
    }

    const handleIncrease = (product) => {
        const isSastify = orderReturn?.length === 0 ? true : orderReturn?.some(item => !(item?.code === product.code && product.quantity <= product.currentQuantity));
        if (isSastify) {
            const action = increaseProductReturn(product);
            dispatch(action);
        } else {
            toast.warn('Sản phẩm này đã đạt giới hạn!')
        }
    }

    const handleChangeQuantity = (productDetail, quantity) => {
        if (Number(quantity) <= 0) return
        const resultProduct = orderReturn?.filter(product => product.code === productDetail.code);
        const totalQuantity = resultProduct.reduce((sum, product) => sum + Number(product?.currentQuantity), Number(0));
        if (resultProduct?.length > 0) {
            if (totalQuantity === resultProduct[0].quantity) {
                toast.warn(`Số lượng thiết bị ${productDetail?.name} trả hàng đã đạt tối đa`);
                return;
            }
        }
        const payload = { productDetail: productDetail, quantity: Number(quantity) }
        const action = changeQuantityProductReturn(payload);
        dispatch(action);
    }

    const handleRemove = (product) => {
        const action = removeProductReturn(product);
        dispatch(action);
    }

    useEffect(() => {
        if (search !== '') {
            const filterResult = data?.filter(item => item?.name.toLowerCase().includes(search.toLowerCase()));
            setFilterListProducts(filterResult)
        } else {
            setFilterListProducts(data);
        }
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
            <div className="flex flex-1 bg-white">
                <div className="flex-row w-[70%] px-1 ">
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
                                    <span className="font-medium text-white">{`Hoàn tối đa: ${item?.quantity}`}</span>
                                    <span className={`font-medium ${item?.inventoryQuantity === 0 ? 'text-red' : 'text-green'}`}>{`Còn lại: ${item?.inventoryQuantity}`}</span>
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
                                {orderReturn?.map((d, index) => (
                                    <div className="flex px-2 py-2 bg-blue-300 rounded-md" key={index}>
                                        <div className="w-[60%] ">
                                            <div className="flex justify-between">
                                                <div className="w-[60%] flex-row">
                                                    <h2 className="text-[12px] text-white font-medium">{index + 1}. {d?.name}</h2>
                                                    <span className="text-[12px] text-white font-normal">{d?.statusReturn === 'OLD' ? 'Hàng cũ' : 'Hàng hỏng'}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between w-[40%] ">
                                            <div onClick={() => handleDecrease(d)}
                                                className="w-[17%] bg-white shadow-lg flex justify-center items-center rounded-md cursor-pointer">
                                                <FaMinus className="text-xl font-bold " />
                                            </div>
                                            <div className="w-[20%] bg-white shadow-lg flex justify-center items-center rounded-md cursor-pointer">
                                                <input className="w-full px-2 text-center outline-none" value={d?.currentQuantity} onChange={(e) => handleChangeQuantity(d, e.target.value)} />
                                            </div>
                                            <div onClick={() => handleIncrease(d)}
                                                className="w-[17%] bg-white shadow-lg flex justify-center items-center py-2 rounded-md cursor-pointer">
                                                <FaPlus className="text-xl font-bold " />
                                            </div>
                                            <div onClick={() => handleRemove(d)}
                                                className="w-[17%] bg-white shadow-lg flex justify-center items-center py-2 rounded-md cursor-pointer">
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
                            <h3 className="mb-3 font-semibold">Thiết bị đang chọn {orderReturn?.length}</h3>
                            <span>Đã chọn {orderReturn?.length} thiết bị</span>
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

export default AddProduct
