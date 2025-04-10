import { useRef } from "react";
import { useEffect, useState } from "react"
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { formatVND } from "../../../../utils/format";
import ModalConfirmCreate from "../../../../components/common/ModalConfirmCreate";
import { axiosInstance } from "../../../../utils/axiosInstant";
import AddProduct from "../../CreateOrder/AddProduct";

const today = new Date().toISOString().split('T')[0];

const CreateReceptionReturn = () => {
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [listOrders, setListOrders] = useState([]);
    const [orderDetail, setOrderDetail] = useState({});
    const [currentOrderCode, setCurrentOrderCode] = useState('');
    const [listProducts, setListProducts] = useState([]);
    const totalCost = listProducts && listProducts?.reduce((sum, product) => sum + product?.quantityReturn * (1 - (product?.discount / 100)) * product?.productInformation?.sellingPrice, Number(0));
    const user = useSelector(state => state.user);
    const ref = useRef(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getListReceptReturn = () => {
        axiosInstance
            .get(`/return-form/find-all`, {
                params: {
                    approveStatus: 'APPROVED',
                    size: 999,
                }
            })
            .then(res => {
                const data = res.data;
                setListOrders(data);
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

    const getOrderDetail = () => {
        axiosInstance
            .get(`/return-form/${currentOrderCode}`)
            .then(res => {
                const data = res.data;
                setOrderDetail(data);
                const productOrder = data.returnProducts?.map((item) => ({ ...item, dateOfManufacture: "", dateOfExpiry: "", location: "" }))
                setListProducts(productOrder)
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

    const handleChangeExpireDate = (index, value) => {
        const updatedProducts = [...listProducts];
        updatedProducts[index].dateOfExpiry = value;
        setListProducts(updatedProducts);
    }

    const handleChangeManufactureDate = (index, value) => {
        const updatedProducts = [...listProducts];
        updatedProducts[index].dateOfManufacture = value;
        setListProducts(updatedProducts);
    }

    const handleChangeLocation = (index, value) => {
        const updatedProducts = [...listProducts];
        updatedProducts[index].location = value;
        setListProducts(updatedProducts);
    }

    const handleCreateReceptionReturn = () => {
        const listProductPurchase = listProducts?.map(product => {
            const productItem = {
                productCode: product.productCode,
                dateOfManufacture: product.dateOfManufacture,
                dateOfExpiry: product.dateOfExpiry,
                location: product.location,
                quantityReturn: product.quantityReturn,
                status: product.statusProduct
            }
            return productItem
        })

        const receptionDetail = {
            productReturns: listProductPurchase,
            employeeCode: user?.employee_code,
            totalAmount: totalCost
        }

        axiosInstance
            .post(`/inventory-receipt/${currentOrderCode}/return-form`, receptionDetail)
            .then(res => {
                toast.success("Tạo phiếu nhập kho hoàn hàng thành công!");
                navigate('/inventory/reception/management');
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

        if (!currentOrderCode) {
            toast.warn("Vui lòng chọn phiếu hoàn hàng");
            return;
        }
        let isAvailableDate = listProducts?.length !== 0 && listProducts?.every(product => (
            product.dateOfManufacture < product.dateOfExpiry
        ))


        if (!isAvailableDate) {
            toast.warn("HSD và NSX không hợp lệ!")
            return;
        }

        let allowOpen = listProducts?.length !== 0 && listProducts?.some(product => (
            product.location === ''
        ))
        if (allowOpen) {
            toast.warn("Vui lòng điền đầy đủ thông tin thiết bị")
            return;
        }


        !allowOpen && isAvailableDate && setIsOpenModal(true);
    }

    useEffect(() => {
        currentOrderCode && getOrderDetail();
    }, [currentOrderCode])

    useEffect(() => {
        if (ref.current) return;
        ref.current = true;
        getListReceptReturn();
    }, [])

    const onChangeShowAdd = () => {
        setIsOpenAdd(!isOpenAdd);
    }

    return (
        <div className="relative overflow-x-auto ">
            <div className="flex items-center w-full h-auto gap-4 px-2 py-4">
                <h3 className="text-xl font-semibold uppercase">Tạo phiếu nhập kho hoàn hàng</h3>
            </div>
            <div className="flex w-full gap-4 px-2 mb-2">
                <div className="w-full p-2.5 grid grid-cols-6 gap-4 border-2 border-gray-400 relative">
                    <div className="flex flex-col items-start w-full col-span-3">
                        <label htmlFor="first_name" className="block w-full text-sm font-normal text-gray-900 dark:text-white">Phiếu hoàn hàng<span className="pl-1 text-lg font-semibold text-red">*</span></label>
                        <select id="jobRank" value={currentOrderCode} onChange={e => setCurrentOrderCode(e.target.value)} className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value={""}>---Chọn phiếu hoàn hàng---</option>
                            {listOrders?.content?.map((order, index) => {
                                return <option value={order?.code} key={index}>{order?.returnForm?.code}</option>
                            })}
                        </select>
                    </div>
                    <div className="flex flex-col items-start w-full col-span-3">
                        <label htmlFor="first_name" className="block w-full mb-2 text-sm font-normal text-gray-900 dark:text-white">Khách hàng</label>
                        <input type="text" value={orderDetail?.customer?.name} id="first_name" disabled className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="flex flex-col items-start w-full col-span-3">
                        <label htmlFor="first_name" className="block w-full mb-2 text-sm font-normal text-gray-900 dark:text-white">Số điện thoại</label>
                        <input type="text" value={orderDetail?.customer?.phoneNumber} id="first_name" className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="flex flex-col items-start w-full col-span-3">
                        <label htmlFor="first_name" className="block mb-2 text-sm font-normal text-gray-900 dark:text-white ">Địa chỉ</label>
                        <input type="text" value={orderDetail?.customer?.address} id="first_name" className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
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
                    </div>
                    <table className="w-full text-sm text-left text-blue-100 border border-blue-400 rtl:text-right dark:text-blue-100">
                        <thead className="text-xs text-white uppercase bg-blue-400 border border-blue-400 dark:text-white">
                            <tr>
                                <th scope="col" className="px-6 py-3 border border-blue-300">Mã hàng</th>
                                <th scope="col" className="px-6 py-3 border border-blue-300">Tên hàng</th>
                                <th scope="col" className="px-6 py-3 border border-blue-300">ĐVT</th>
                                <th scope="col" className="px-6 py-3 border border-blue-300">NSX<span className="pl-1 text-lg font-semibold text-red">*</span></th>
                                <th scope="col" className="px-6 py-3 border border-blue-300">HSD<span className="pl-1 text-lg font-semibold text-red">*</span></th>
                                <th scope="col" className="px-6 py-3 border border-blue-300">Vị trí<span className="pl-1 text-lg font-semibold text-red">*</span></th>
                                <th scope="col" className="px-6 py-3 border border-blue-300">Số lượng</th>
                                <th scope="col" className="px-6 py-3 border border-blue-300 ">Giá nhập<span className="pl-1 text-lg font-semibold text-red">*</span></th>
                                <th scope="col" className="px-6 py-3 border border-blue-300">Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listProducts?.map((item, index) => {
                                return (
                                    <tr className="text-black border border-b border-blue-400" key={index}>
                                        <th scope="row" className="px-6 py-4 font-medium text-black border border-blue-300 whitespace-nowrap">
                                            {item?.productInformation?.code}
                                        </th>
                                        <td className="px-6 py-4 border border-blue-300">{item?.productInformation?.name}</td>
                                        <td className="px-6 py-4 border border-blue-300">{item?.productInformation?.unit}</td>
                                        <td className="px-6 py-4 border border-blue-300">
                                            <input
                                                type="date"
                                                value={item?.dateOfManufacture}
                                                onChange={(e) => handleChangeManufactureDate(index, e.target.value)}
                                                className="w-full px-2 py-1 border border-gray-300 rounded"
                                            />
                                        </td>
                                        <td className="px-6 py-4 border border-blue-300">
                                            <input
                                                type="date"
                                                value={item?.dateOfExpiry}
                                                onChange={(e) => handleChangeExpireDate(index, e.target.value)}
                                                className="w-full px-2 py-1 border border-gray-300 rounded"
                                            />
                                        </td>
                                        <td className="px-6 py-4 border border-blue-300">
                                            <input
                                                type="text"
                                                placeholder="Nhập vị trí..."
                                                value={item?.location}
                                                onChange={(e) => handleChangeLocation(index, e.target.value)}
                                                className="w-full px-2 py-1 border border-gray-300 rounded"
                                            />
                                        </td>
                                        <td className="px-6 py-4 border border-blue-300">{item?.quantityReturn}</td>
                                        <td className="px-4 py-4 border border-blue-300">{formatVND((1 - (item?.discount / 100)) * item?.productInformation?.sellingPrice)}</td>
                                        <td className="px-6 py-4 border border-blue-300">{formatVND(item?.quantityReturn * (1 - (item?.discount / 100)) * item?.productInformation?.sellingPrice)}</td>
                                    </tr>
                                )
                            })}
                            {listProducts?.length !== 0 && (
                                <tr className="text-black border border-b border-blue-400" >
                                    <th scope="row" className="px-6 py-4 font-medium text-black border border-l-0 border-r-0 border-blue-300 whitespace-nowrap">Tổng tiền:</th>
                                    <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                    <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                    <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                    <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                    <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                    <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                    <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                                    <td className="px-6 py-4 border border-r-0 border-blue-300">{formatVND(totalCost)}</td>
                                </tr>
                            )}
                            {listProducts?.length === 0 && (
                                <tr className="text-black border border-b border-blue-400" >
                                    <th scope="row" className="px-6 py-4 font-medium text-black border border-blue-300 whitespace-nowrap">Chưa có phiếu nào được chọn</th>
                                    <td className="px-6 py-4 border border-blue-300"></td>
                                    <td className="px-6 py-4 border border-blue-300"></td>
                                    <td className="px-6 py-4 border border-blue-300"></td>
                                    <td className="px-6 py-4 border border-blue-300"></td>
                                    <td className="px-6 py-4 border border-blue-300"></td>
                                    <td className="px-6 py-4 border border-blue-300"></td>
                                    <td className="px-4 py-4 border border-blue-300"></td>
                                    <td className="px-6 py-4 border border-blue-300"></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {isOpenAdd && <AddProduct onChangeShowAdd={onChangeShowAdd} />}
            {isOpenModal && <ModalConfirmCreate
                handleClose={() => setIsOpenModal(false)}
                handleConfirm={handleCreateReceptionReturn}
                type='tạo'
            />}
        </div>
    )
}

export default CreateReceptionReturn
