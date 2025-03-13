import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [typeLogin, setTypeLogin] = useState(true);
  const navigate = useNavigate();

  const handleChangeTypeLogin = type => {
    setTypeLogin(type);
  };

  const handleLogin = () => {
    toast.success('login');
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row items-start">
      <div className="relative w-full md:w-1/2 h-1/2 md:h-full flex flex-col">
        <img className="w-full h-full object-cover" src="https://i.pinimg.com/736x/71/c1/4f/71c14fa9241a6a2a545b45eea59ed972.jpg" alt="" />
      </div>
      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#f5f5f5] flex flex-col p-8 md:p-20 gap-10 items-center">
        <h1
          className="text-xl text-[#060606] font-semibold"
          onClick={() => {
            navigate('/');
          }}
        >
          <img
            src={'https://i.pinimg.com/736x/4d/93/19/4d93191e73132d699835167521c5edad.jpg'}
            alt=""
            className="w-28 max-w-[500px] cursor-pointer rounded-full"
          />
        </h1>

        <div className="w-full flex flex-col ">
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-3xl font-semibold mb-2">Đăng nhập</h3>
            <p className="text-base mb-2 text-blue-500">
              Xin chào! {typeLogin ? 'Đăng nhập với tư cách quản trị viên hệ thống' : 'Đăng nhập với tư cách nhân viên'}
            </p>
          </div>
          <div className="flex w-full justify-around ">
            <div
              className={`border-b-2 pb-1 cursor-pointer transition duration-500 ease-in-out ${
                typeLogin ? 'border-blue-700' : 'border-black'
              }`}
              onClick={() => handleChangeTypeLogin(true)}
            >
              <h3 className="font-semibold">Quản trị viên</h3>
            </div>
            <div
              className={`border-b-2 pb-1 cursor-pointer transition duration-500 ease-in-out ${
                !typeLogin ? 'border-blue-700' : 'border-black'
              }`}
              onClick={() => handleChangeTypeLogin(false)}
            >
              <h3 className="font-semibold">Nhân viên</h3>
            </div>
          </div>

          <div className="w-full flex flex-col mt-4">
            <input
              type="text"
              placeholder={'Tên đăng nhập'}
              className={`w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none  focus:outline-none`}
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              className={`w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-non`}
            />
          </div>
          <div className="w-full flex flex-col my-4">
            <button
              className="w-full text-white my-2 font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center cursor-pointer"
              onClick={() => handleLogin()}
            >
              Đăng nhập
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
