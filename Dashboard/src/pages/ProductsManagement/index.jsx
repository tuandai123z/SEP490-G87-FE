import _, { debounce } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { NumericFormat } from "react-number-format";
import { toast } from "react-toastify";
import Pagination from "../../components/common/Pagination";
import { axiosInstance } from "../../utils/axiosInstant";
import { MISS_FIELD_FORM } from "../../utils/constants";
import { formatVND } from "../../utils/format";
import Loading from '../../components/layouts/Loading'

const ProductsManagement = () => {

    const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
    const [listProducts, setListProducts] = useState();
    const [listBrands, setListBrands] = useState([]);
    const [listCategories, setListCategories] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [brandFilter, setBrandFilter] = useState('');
    const [productName, setProductName] = useState('');
    const [imageBase64, setImageBase64] = useState("");
    const [currentImg, setCurrentImg] = useState('');
    const [isChangeImage, setIsChangeImage] = useState(false);
    const [productDescription, setProductDescription] = useState('');
    const [unit, setUnit] = useState('');
    const [sellingPrice, setSellingPrice] = useState(0);
    const [currentCategoryCode, setCurrentCategoryCode] = useState('');
    const [currentBranchCode, setCurrentBranchCode] = useState('');
    const [currentProduct, setCurrentProduct] = useState('');
    const [query, setQuery] = useState("");
    const [statusModal, setStatusModal] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const ref = useRef(false);
    const size = 6;

    const getListProducts = () => {

        axiosInstance
            .get(`/products/find-all`, {
                params: {
                    ...(query !== '' ? { name: query } : {}),
                    ...(brandFilter !== '' ? { brandCode: brandFilter } : {}),
                    ...(categoryFilter !== '' ? { categoryCode: categoryFilter } : {}),
                    page: currentPage - 1,
                    size: size,
                }
            })
            .then(res => {
                const data = res.data
                setListProducts(data);
                console.log(data);
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
                setIsLoading(false);
            });
    }

    const getListCategoryAndBrand = () => {
        axiosInstance
            .get('/brand/find-all', {
                params: {
                    size: 999,
                    page: currentPage - 1,
                }
            })
            .then(res => {
                const data = res.data
                setListBrands(data.content);
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
        axiosInstance
            .get('/category/find-all', {
                params: {
                    size: 999,
                    page: currentPage - 1,
                }
            })
            .then(res => {
                const data = res.data
                setListCategories(data.content);
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

    const handleCreateOrUpdateProduct = () => {
        if ((productName || '').trim() === '' || (unit || '').trim() === '' || sellingPrice === 0 || (currentBranchCode || '').trim() === '' || (currentBranchCode || '').trim() === '' || !currentImg) {
            toast.warn(MISS_FIELD_FORM);
            return;
        }

        if (!statusModal) {
            const product = {
                productName,
                productDescription,
                imageBase64,
                unit,
                sellingPrice,
                categoryCode: currentCategoryCode,
                brandCode: currentBranchCode
            }
            setIsLoading(true);

            axiosInstance
                .post(`/products/create`, product)
                .then(res => {
                    toast.success("Tạo thiết bị mới thành công");
                    resetState();
                    getListProducts();
                    setIsOpenModalCreate(false);
                    setIsLoading(false);
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
                    setIsLoading(false);
                });
        } else {
            const product = {
                productName,
                productDescription,
                imageBase64,
                unit,
                sellingPrice,
                categoryCode: currentCategoryCode,
                brandCode: currentBranchCode,
                isChangeImage: isChangeImage
            }
            console.log(product);
            setIsLoading(true);
            axiosInstance
                .put(`/products/update/${currentProduct?.code}`, product)
                .then(res => {
                    toast.success(`Cập nhật thiết bị ${productName} thành công`);
                    resetState();
                    getListProducts();
                    setIsOpenModalCreate(false);
                    setIsLoading(false);
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
                    setIsLoading(false);
                });
        }
    }

    const handleFileChange = (event) => {
        if (statusModal) {
            setIsChangeImage(true);
        }
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                const base64Image = reader.result.split(',')[1]; // Remove the data:image/png;base64, part
                setImageBase64(base64Image);
                setCurrentImg(reader.result);
            };
            reader.onerror = (error) => {
                console.error("Error converting file to Base64:", error);
            };
        }
    };

    useEffect(() => {
        if (ref.current) return
        ref.current = true;
        getListProducts();
        getListCategoryAndBrand();
    }, [])

    useEffect(() => {
        getListProducts();
    }, [currentPage, query, brandFilter, categoryFilter])

    const handleOpenModalCreate = () => {
        setStatusModal(false);
        setIsOpenModalCreate(true);
    }

    const handleOpenModalEdit = (product) => {
        setStatusModal(true);
        setIsOpenModalCreate(true);
        setCurrentProduct(product)
        setProductName(product?.name);
        setProductDescription(product?.description);
        setCurrentImg(product?.imagePath)
        setUnit(product?.unit);
        setSellingPrice(product?.sellingPrice);
        setCurrentBranchCode(product?.brandCode);
        setCurrentCategoryCode(product?.categoryCode);
    }

    const handleCloseModalCreate = () => {
        setIsOpenModalCreate(false);
        resetState();
    }

    const handleChangePrice = (value) => {
        if (!isNaN(value) && value >= 0) setSellingPrice(value);
    }

    const resetState = () => {
        setCurrentProduct('');
        setCurrentBranchCode('');
        setCurrentCategoryCode('');
        setProductDescription('');
        setProductName('');
        setImageBase64('');
        setCurrentImg('');
        setUnit('');
        setIsChangeImage(false);
        setSellingPrice(0);
    }

    const handleDebouncedChange = useCallback(
        _.debounce((value) => {
            setIsSearch(prev => !prev);
        }, 500),
        []
    )

    useEffect(() => {
        handleDebouncedChange(query)

        return () => {
            handleDebouncedChange.cancel();
        }
    }, [query])

    useEffect(() => {
        setCurrentPage(1);
    }, [isSearch])


    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (isOpenModalCreate) handleCreateOrUpdateProduct();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                <caption >
                    <div className="flex flex-col gap-2 ">
                        <div className="flex items-center justify-between px-2 py-2 text-lg font-semibold text-left text-gray-900 bg-white rtl:text-right dark:text-white dark:bg-gray-800">
                            <div className="flex flex-col">
                                Danh sách thiết bị điện
                                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Thông tin danh mục sản phẩm thiết bị điện</p>
                            </div>
                            <button className="flex items-center w-[15%] h-10 gap-2 px-4 py-2 text-base text-white bg-blue-500 outline-none" onClick={() => handleOpenModalCreate()}>
                                <FaPlus />
                                Thêm thiết bị
                            </button>
                        </div>
                        <div className="grid w-full grid-cols-2 gap-2 px-2">
                            <div className="flex flex-col col-span-1">
                                <label htmlFor="first_name" className="block w-full pr-2 mb-2 text-sm font-semibold text-left text-gray-900 dark:text-white">Tên thiết bị</label>
                                <input type="text" value={query} onChange={e => setQuery(e.target.value)} id="small-input" className="block w-full p-2 text-xs text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tên thiết bị điện" />
                            </div>
                            <div className="flex flex-col col-span-1">
                                <label htmlFor="first_name" className="block w-full pr-2 mb-2 text-sm font-semibold text-left text-gray-900 dark:text-white">Thương hiệu</label>
                                <select value={brandFilter} onChange={e => setBrandFilter(e.target.value)} id="jobRank" className="block w-full p-2 text-xs text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value={""}>---Chọn thương hiệu---</option>
                                    {listBrands?.map((item, index) => <option value={item.code} key={index}>{item?.name}</option>)}
                                </select>
                            </div>
                            <div className="flex flex-col col-span-1">
                                <label htmlFor="first_name" className="block w-full pr-2 mb-2 text-sm font-semibold text-left text-gray-900 dark:text-white">Danh mục</label>
                                <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} id="jobRank" className="block w-full p-2 text-xs text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value={''}>---Chọn danh mục---</option>
                                    {listCategories?.map((item, index) => {
                                        return (
                                            <option value={item?.code} key={index}>{item?.name}</option>
                                        )
                                    })}
                                </select>
                            </div>


                        </div>

                    </div>
                </caption>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Tên thiết bị
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Hình ảnh
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Giá bán
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Danh mục
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Thương hiệu
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Đơn vị
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Hành động
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {listProducts?.content?.map((item, index) => {
                        return (
                            <tr key={index} className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item?.name}
                                </th>
                                <th scope="row" className="flex justify-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <img src={item?.imagePath} alt={item?.name} className='object-cover rounded-lg h-[50px] w-28' />
                                </th>
                                <td className="px-6 py-4">
                                    {formatVND(item?.sellingPrice)}
                                </td>
                                <td className="px-6 py-4">
                                    {item?.categoryCode}
                                </td>
                                <td className="px-6 py-4">
                                    {item?.brandCode}
                                </td>
                                <td className="px-6 py-4">
                                    {item?.unit}
                                </td>
                                <td className="px-6 py-4">
                                    <a onClick={() => handleOpenModalEdit(item)} className="font-medium text-blue-600 cursor-pointer dark:text-blue-500 hover:underline">Chỉnh sửa</a>
                                </td>
                            </tr>
                        )
                    })}
                    {listProducts?.content?.length === 0 &&
                        <tr className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Không có thông tin thiết bị tương ứng
                            </th>
                            <td className="px-6 py-4">
                            </td>
                            <td className="px-6 py-4">
                            </td>
                            <td className="px-6 py-4">
                            </td>
                            <td className="px-6 py-4">
                            </td>
                            <td className="px-6 py-4">
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
            <Pagination
                totalPages={listProducts?.totalElements}
                size={size}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                content={'thiết bị'}
            />

            {isOpenModalCreate && <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 animate-fadeIn">
                <div className="relative z-50 w-full max-w-2xl max-h-screen overflow-y-auto bg-white rounded-lg shadow-lg">
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-t md:p-5 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {!statusModal ? 'Thêm thiết bị mới' : 'Chỉnh sửa thông tin'}
                        </h3>
                        <button type="button" onClick={handleCloseModalCreate} className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5 ">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="col-span-2 ">
                                <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên thiết bị</label>
                                <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} name="fullName" id="fullName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nhập tên thiết bị" required="" />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label htmlFor="unit" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Đơn vị</label>
                                <input type="text" value={unit} onChange={e => setUnit(e.target.value)} name="unit" id="unit" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nhập đơn vị" required="" />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giá bán</label>
                                <NumericFormat type="text" name="price" id="price"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    value={sellingPrice}
                                    thousandSeparator=","
                                    displayType="input"
                                    placeholder="Giá thiết bị"
                                    suffix=" VNĐ"
                                    onValueChange={(values) => {
                                        const nonNegativeValue = values.floatValue >= 0 ? values.value : "";
                                        handleChangePrice(nonNegativeValue);
                                    }} />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label htmlFor="img" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Hình ảnh</label>
                                <input type="file" accept="image/*" onChange={handleFileChange} name="img" id="img" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nhập đơn vị" required="" />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                {currentImg && (
                                    <img src={currentImg} alt="Uploaded" className="w-full h-[100px] object-cover rounded-lg" />
                                )}
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label htmlFor="jobRank" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Danh mục sản phẩm</label>
                                <select value={currentCategoryCode} onChange={e => setCurrentCategoryCode(e.target.value)} id="jobRank" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option value={''}>---Chọn danh mục---</option>
                                    {listCategories?.map((item, index) => {
                                        return (
                                            <option value={item?.code} key={index}>{item?.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label htmlFor="jobRank" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thương hiệu</label>
                                <select value={currentBranchCode} onChange={e => setCurrentBranchCode(e.target.value)} id="jobRank" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option value={""}>---Chọn thương hiệu---</option>
                                    {listBrands?.map((item, index) => <option value={item.code} key={index}>{item?.name}</option>)}
                                </select>
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Miêu tả</label>
                                <input type="textarea" value={productDescription} onChange={e => setProductDescription(e.target.value)} name="description" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full h-24 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nhập miêu tả" required="" />
                            </div>
                        </div>
                        <button onClick={handleCreateOrUpdateProduct} type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-6">
                            <svg className="w-5 h-5 me-1 -ms-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                            {!statusModal ? 'Thêm thiết bị' : "Lưu"}
                        </button>
                    </div>
                </div>
            </div >}
            {isLoading && <Loading />}
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

export default ProductsManagement