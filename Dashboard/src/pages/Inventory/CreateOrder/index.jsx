import { useRef } from "react";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearOrder } from "../../../actions/orderActions";
import ModalConfirmCreate from "../../../../src/components/common/ModalConfirmCreate";
import { axiosInstance } from "../../../utils/axiosInstant";
import AddProduct from "./AddProduct";


const CreateOrder = () => {
    const [currentSupplierId, setCurrentSupplierId] = useState('');
    const [currentSupplier, setCurrentSupplier] = useState({});
    const [listSuppliers, setListSuppliers] = useState([]);
    const [expectedDateShipped, setExpectedDateShipped] = useState('');
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const dataUser = useSelector(state => state.user);
    const order = useSelector(state => state.order);
    const ref = useRef(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getListSupplier = () => {
        axiosInstance
            .get(`/supplier/find-all`, {
                params: {
                    size: 999,
                }
            })
            .then(res => {
                const data = res.data.content;
                setListSuppliers(data);
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

    const handleCreatePurchase = () => {
        const listProductPurchase = order?.map(product => {
            const productItem = {
                productCode: product.code,
                quantity: product.quantity
            }
            return productItem
        })

        if (currentSupplierId === '' || expectedDateShipped === '' || listProductPurchase?.length === 0) {
            currentSupplierId === '' && toast.warn("Vui lòng chọn nhà cung cấp!");
            expectedDateShipped === '' && toast.warn("Vui lòng chọn ngày giao hàng");
            listProductPurchase?.length === 0 && toast.warn("Vui lòng chọn thiết bị");
            return;
        }


        const purchase = {
            supplierId: currentSupplierId,
            employeeCode: dataUser?.employee_code,
            deliveryDate: expectedDateShipped,
            products: listProductPurchase
        }

        axiosInstance
            .post(`/purchase-order/create`, purchase)
            .then(res => {
                toast.success("Tạo phiếu mua hàng thành công!");
                const action = clearOrder();
                dispatch(action)
                navigate(`/inventory/order/management`);
                setIsOpenAdd(false);
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

    const handleOpenModal = () => {
        const listProductPurchase = order?.map(product => {
            const productItem = {
                productCode: product.code,
                quantity: product.quantity
            }
            return productItem
        })

        if (currentSupplierId === '' || expectedDateShipped === '' || listProductPurchase?.length === 0) {
            currentSupplierId === '' && toast.warn("Vui lòng chọn nhà cung cấp!");
            expectedDateShipped === '' && toast.warn("Vui lòng chọn ngày giao hàng");
            listProductPurchase?.length === 0 && toast.warn("Vui lòng chọn thiết bị");
            return;
        }

        setIsOpenModal(true);
    }

    useEffect(() => {
        if (ref.current) return;
        ref.current = true;
        getListSupplier();
    }, [])

    useEffect(() => {
        if (currentSupplierId !== '') {
            axiosInstance
                .get(`/supplier/${currentSupplierId}`)
                .then(res => {
                    const data = res.data;
                    setCurrentSupplier(data);
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
    }, [currentSupplierId])

    const onChangeShowAdd = () => {
        setIsOpenAdd(!isOpenAdd);
    }



    return (
        <div className="relative overflow-x-auto ">
            <div className="flex items-center w-full h-auto gap-4 px-2 py-4">
                <h3 className="text-xl font-semibold uppercase">Phiếu mua hàng</h3>
                <select id="jobRank" value={currentSupplierId} onChange={e => setCurrentSupplierId(e.target.value)} className="bg-gray-50 w-[20%] border border-gray-300 text-gray-900 text-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                    <option value={""}>---Nhà cung cấp---</option>
                    {listSuppliers?.map((supplier, index) => {
                        return <option value={supplier?.id} key={index}>{supplier?.name}</option>
                    })}
                </select>
            </div>
            <div className="flex w-full gap-4 px-2 mb-2">
                <div className="w-full p-2.5 grid grid-cols-2 gap-4 border-2 border-gray-400 relative">
                    <div className="flex flex-col items-start w-full">
                        <label htmlFor="first_name" className="block mb-2 text-sm font-normal text-gray-900 dark:text-white w-[18%]">Nhà cung cấp</label>
                        <input type="text" value={currentSupplier?.name} id="first_name" disabled className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="flex flex-col items-start w-full">
                        <label htmlFor="first_name" className="block mb-2 text-sm font-normal text-gray-900 dark:text-white w-[18%]">Số điện thoại</label>
                        <input type="text" value={currentSupplier?.phoneNumber} id="first_name" className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="flex flex-col items-start w-full">
                        <label htmlFor="first_name" className="block mb-2 text-sm font-normal text-gray-900 dark:text-white ">Địa chỉ</label>
                        <input type="text" value={currentSupplier?.address} id="first_name" className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="flex flex-col items-start w-full">
                        <label htmlFor="first_name" className="block w-full mb-2 text-sm font-normal text-gray-900 dark:text-white">Ngày giao hàng dự kiến</label>
                        <input type="date" value={expectedDateShipped} onChange={e => { setExpectedDateShipped(e.target.value) }} id="first_name" className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <p className="absolute text-gray-900 top-[-16px] bg-white font-semibold">Thông tin chung</p>
                </div>
            </div>
            <div className="w-full px-2 mb-4">
                <div className="relative overflow-x-auto shadow-md">
                    <div className="flex justify-between">
                        <div className={`px-4 py-1 uppercase border-t-2 border-l-2 cursor-pointer transition-all duration-100 bg-orange-200 font-medium`} onClick={() => handleOpenModal()}>
                            <span>Tạo phiếu</span>
                        </div>
                        <div className={`px-4 py-1 uppercase border-t-2 border-l-2 cursor-pointer transition-all duration-100 bg-orange-200 font-medium`} onClick={() => onChangeShowAdd()}>
                            <span>Thêm thiết bị</span>
                        </div>
                    </div>
                    <table className="w-full text-sm text-left text-blue-100 border border-blue-400 rtl:text-right dark:text-blue-100">
                        <thead className="text-xs text-white uppercase bg-blue-400 border border-blue-400 dark:text-white">
                            <tr>
                                <th scope="col" className="px-6 py-3 border border-blue-300">Mã hàng</th>
                                <th scope="col" className="px-6 py-3 border border-blue-300">Tên hàng</th>
                                <th scope="col" className="px-6 py-3 border border-blue-300">ĐVT</th>
                                <th scope="col" className="px-6 py-3 border border-blue-300">Số lượng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order?.map((item, index) => {
                                return (
                                    <tr className="text-black border border-b border-blue-400" key={index}>
                                        <th scope="row" className="px-6 py-4 font-medium text-black border border-blue-300 whitespace-nowrap">
                                            {item?.code}
                                        </th>
                                        <td className="px-6 py-4 border border-blue-300">{item?.name}</td>
                                        <td className="px-6 py-4 border border-blue-300">{item?.unit}</td>
                                        <td className="px-6 py-4 border border-blue-300">{item?.quantity}</td>

                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            {isOpenAdd && <AddProduct onChangeShowAdd={onChangeShowAdd} />}
            {isOpenModal && <ModalConfirmCreate
                handleClose={() => setIsOpenModal(false)}
                handleConfirm={handleCreatePurchase}
                type='tạo'
            />}
        </div>
    )
}

export default CreateOrder
