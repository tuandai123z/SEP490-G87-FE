import { useRef } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ModalConfirmCreate from "../../../../components/common/ModalConfirmCreate";
import { axiosInstance } from "../../../../utils/axiosInstant";
import { IoIosAddCircle } from "react-icons/io";
import AddProductSale from "../AddProductSale";
import { formatVND } from "../../../../utils/format";
import validator from "validator";
import { WRONG_FORMAT_PHONE } from "../../../../utils/constants";
import { Select } from "../../../../components/common/Select";
import { clearOrderSale } from "../../../../actions/saleActions";

const CreateOrderSale = () => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenCreateCustomer, setIsOpenCreateCustomer] = useState(false);
  const order = useSelector((state) => state.sale);
  const user = useSelector((state) => state.user);
  const [listProductSale, setListProductSale] = useState(order);
  const [listCustomer, setListCustomer] = useState([]);
  const [currentCustomer, setCurrentCustomer] = useState({});
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberCreate, setPhoneNumberCreate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  // item?.quantity * item?.sellingPrice * (100 - item?.discount) / 100
  const totalCost =
    listProductSale &&
    listProductSale?.reduce(
      (sum, product) =>
        sum +
        Number(
          (product?.quantity *
            product?.sellingPrice *
            (100 - product?.discount)) /
            100
        ),
      Number(0)
    );
  const ref = useRef(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getListCustomer = () => {
    axiosInstance
      .get(`/customer/find-all`, {
        params: {
          phoneNumber: "",
        },
      })
      .then((res) => {
        const data = res.data;
        const result = data?.map((d) => d?.phoneNumber);
        setListCustomer(result);
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
  };

  const getCurrentCustomer = () => {
    if (phoneNumber !== "") {
      axiosInstance
        .get(`/customer/find-all`, {
          params: {
            phoneNumber,
          },
        })
        .then((res) => {
          const data = res.data;
          setCurrentCustomer(data[0]);
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
  };

  const handleCreateOrderSale = () => {
    const listProductOrder = order?.map((product) => {
      const productItem = {
        productCode: product.code,
        quantity: product.quantity,
        discount: parseFloat(product.discount) / 100,
      };
      return productItem;
    });

    const requestData = {
      employeeCode: user.employee_code,
      totalAmount: totalCost,
      products: listProductOrder,
      customerId: currentCustomer?.id,
    };

    axiosInstance
      .post(`/order/create-order`, requestData)
      .then((res) => {
        toast.success("Tạo phiếu bán hàng thành công");
        setIsOpenModal(false);
        const action = clearOrderSale();
        dispatch(action);
        navigate("/inventory/orderSale/management");
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
  };

  const handleOpenModal = () => {
    if (phoneNumber === "") {
      toast.warn("Bạn chưa chọn thông tin khách hàng");
      return;
    }
    if (order?.length === 0) {
      toast.warn("Bạn chưa chọn thiết bị");
      return;
    }
    setIsOpenModal(true);
  };

  useEffect(() => {
    if (ref.current) return;
    ref.current = true;
    getListCustomer();
    const action = clearOrderSale();
    dispatch(action);
  }, []);

  const onChangeShowAdd = () => {
    setIsOpenAdd(!isOpenAdd);
  };

  const handleChangeDiscount = (index, value) => {
    const discount = Number(value) >= 0 ? Number(value) : 0;
    const updatedProducts = [...listProductSale];
    updatedProducts[index].discount = discount;
    setListProductSale(updatedProducts);
  };

  const handleChangePhone = (value) => {
    if (!isNaN(value) && value.length <= 10) {
      setPhoneNumberCreate(value);
    }
  };

  const handleOpenCreateCustomer = () => {
    setIsOpenCreateCustomer(true);
    setPhoneNumberCreate("");
    setAddress("");
    setCustomerName("");
  };

  const handleCreateCustomer = () => {
    if (!validator.isMobilePhone(phoneNumberCreate, "vi-VN")) {
      toast.warn(WRONG_FORMAT_PHONE);
      return;
    }
    if ((customerName || "").trim() === "" || (address || "").trim() === "") {
      toast.warn("Vui lòng điền đầy đủ thông tin!!");
      return;
    }
    const customer = {
      name: customerName,
      address: address,
      phoneNumber: phoneNumberCreate,
    };

    axiosInstance
      .post(`/customer/create`, customer)
      .then((res) => {
        const data = res.data;
        setPhoneNumber(data?.phoneNumber);
        setIsOpenCreateCustomer(false);
        toast.success("Tạo khách hàng mới thành công");
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
  };

  useEffect(() => {
    setListProductSale(order);
  }, [order]);

  useEffect(() => {
    getCurrentCustomer();
  }, [phoneNumber]);

  return (
    <div className="relative overflow-x-auto ">
      <div className="flex items-center w-full h-auto gap-4 px-2 py-4">
        <h3 className="text-xl font-semibold uppercase">Phiếu bán hàng</h3>
      </div>
      <div className="flex w-full gap-4 px-2 mb-2">
        <div className="w-full p-2.5 grid grid-cols-2 gap-4 border-2 border-gray-400 relative">
          <div className="flex flex-col items-start w-full">
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-normal text-gray-900 dark:text-white w-[18%]"
            >
              Số điện thoại
            </label>
            {/* <input type="text" id="first_name" className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /> */}
            <Select
              value={phoneNumber}
              onChange={setPhoneNumber}
              options={listCustomer}
            />
          </div>
          <div className="flex flex-col items-start w-full">
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-normal text-gray-900 dark:text-white w-[18%]"
            >
              Tên khách hàng
            </label>
            <input
              type="text"
              id="first_name"
              value={currentCustomer?.name}
              disabled
              className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col items-start w-full">
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-normal text-gray-900 dark:text-white "
            >
              Địa chỉ
            </label>
            <input
              type="text"
              id="first_name"
              value={currentCustomer?.address}
              disabled
              className="block w-full p-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="flex items-end w-full">
            <button
              className="py-2 px-4 bg-blue-500 font-semibold text-white h-[50%] flex items-center gap-3"
              onClick={() => handleOpenCreateCustomer()}
            >
              <IoIosAddCircle /> Thêm khách hàng
            </button>
          </div>
          <p className="absolute text-gray-900 top-[-16px] bg-white font-semibold">
            Thông tin khách hàng
          </p>
        </div>
      </div>
      <div className="w-full px-2 mb-4">
        <div className="relative overflow-x-auto shadow-md">
          <div className="flex justify-end pb-3">
            <div
              className={`px-4 py-1 uppercase border-t-2 border-l-2 cursor-pointer transition-all duration-100 bg-orange-200 font-medium`}
              onClick={() => onChangeShowAdd()}
            >
              <span>Thêm thiết bị</span>
            </div>
          </div>
          <table className="w-full text-sm text-left text-blue-100 border border-blue-400 rtl:text-right dark:text-blue-100">
            <thead className="text-xs text-white uppercase bg-blue-400 border border-blue-400 dark:text-white">
              <tr>
                <th scope="col" className="px-6 py-3 border border-blue-300">
                  Mã hàng
                </th>
                <th scope="col" className="px-6 py-3 border border-blue-300">
                  Tên hàng
                </th>
                <th scope="col" className="px-6 py-3 border border-blue-300">
                  ĐVT
                </th>
                <th scope="col" className="px-6 py-3 border border-blue-300">
                  Số lượng
                </th>
                <th scope="col" className="px-6 py-3 border border-blue-300">
                  Giá bán
                </th>
                <th scope="col" className="px-6 py-3 border border-blue-300">
                  Chiết khấu
                </th>
                <th scope="col" className="px-6 py-3 border border-blue-300">
                  Thành tiền
                </th>
              </tr>
            </thead>
            <tbody>
              {listProductSale?.map((item, index) => {
                return (
                  <tr
                    className="text-black border border-b border-blue-400"
                    key={index}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-black border border-blue-300 whitespace-nowrap"
                    >
                      {item?.code}
                    </th>
                    <td className="px-6 py-4 border border-blue-300">
                      {item?.name}
                    </td>
                    <td className="px-6 py-4 border border-blue-300">
                      {item?.unitName}
                    </td>
                    <td className="px-6 py-4 border border-blue-300">
                      {item?.quantity}
                    </td>
                    <td className="px-6 py-4 border border-blue-300">
                      {formatVND(item?.sellingPrice)}
                    </td>
                    <td className="relative px-6 py-4 border border-blue-300">
                      <input
                        type="text"
                        value={item?.discount}
                        onChange={(e) =>
                          handleChangeDiscount(index, e.target.value)
                        }
                        className="w-[40px] px-2 py-1 border-none rounded"
                      />
                      <span className="absolute text-gray-500 transform -translate-y-1/2 pointer-events-none left-[66px] top-1/2">
                        %
                      </span>
                    </td>
                    <td className="px-6 py-4 border border-blue-300">
                      {formatVND(
                        (item?.quantity *
                          item?.sellingPrice *
                          (100 - item?.discount)) /
                          100
                      )}
                    </td>
                  </tr>
                );
              })}
              {listProductSale?.length !== 0 && (
                <tr className="text-black border border-b border-blue-400">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-black border border-l-0 border-r-0 border-blue-300 whitespace-nowrap"
                  >
                    Tổng tiền:
                  </th>
                  <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                  <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                  <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                  <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                  <td className="px-6 py-4 border border-l-0 border-r-0 border-blue-300"></td>
                  <td className="px-6 py-4 border border-r-0 border-blue-300">
                    {formatVND(totalCost)}
                  </td>
                </tr>
              )}
              {listProductSale?.length === 0 && (
                <tr className="text-black border border-b border-blue-400">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-black border border-blue-300 whitespace-nowrap"
                  >
                    Chưa có thiết bị nào được chọn
                  </th>
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
      {isOpenAdd && <AddProductSale onChangeShowAdd={onChangeShowAdd} />}
      {isOpenModal && (
        <ModalConfirmCreate
          handleClose={() => setIsOpenModal(false)}
          handleConfirm={handleCreateOrderSale}
          type="tạo"
        />
      )}
      {isOpenCreateCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 animate-fadeIn">
          <div className="relative z-50 w-full max-w-2xl max-h-screen overflow-y-auto bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-t md:p-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Tạo khách hàng mới
              </h3>
              <button
                type="button"
                onClick={() => setIsOpenCreateCustomer(false)}
                className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="crud-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5 ">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="col-span-2 ">
                  <label
                    htmlFor="fullName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    value={phoneNumberCreate}
                    onChange={(e) => handleChangePhone(e.target.value)}
                    name="fullName"
                    id="fullName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Nhập số điện thoại"
                    required=""
                  />
                </div>
                <div className="col-span-2 ">
                  <label
                    htmlFor="unit"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tên khách hàng
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    name="unit"
                    id="unit"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Nhập tên khách hàng"
                    required=""
                  />
                </div>
                <div className="col-span-2 ">
                  <label
                    htmlFor="unit"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    name="unit"
                    id="unit"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Nhập địa chỉ"
                    required=""
                  />
                </div>
              </div>
              <button
                onClick={handleCreateCustomer}
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-6"
              >
                <svg
                  className="w-5 h-5 me-1 -ms-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Tạo
              </button>
            </div>
          </div>
        </div>
      )}
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
      <div className="flex justify-end mb-4">
        <div
          className={`px-4 py-1 text-center w-[150px] uppercase border-t-2 border-l-2 cursor-pointer transition-all duration-100 bg-orange-200 font-medium`}
          onClick={() => handleOpenModal()}
        >
          <span>Tạo phiếu</span>
        </div>
      </div>
    </div>
  );
};

export default CreateOrderSale;
