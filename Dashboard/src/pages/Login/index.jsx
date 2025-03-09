import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { saveUser } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const [typeLogin, setTypeLogin] = useState(true);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector(state => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeTypeLogin = type => {
    setTypeLogin(type);
  };

  const handleLogin = () => {
    if (username?.trim() === '' || password?.trim() === '') {
      toast.warn("Vui lòng nhập đầy đủ thông tin đăng nhập")
      return
    }
    const userLogin = {
      username,
      password
    }
    axios.post(`/authenticated/login`, userLogin)
      .then(res => {
        console.log(res);
        const data = res.data;
        const token = data?.token;
        const user = jwtDecode(token);
        localStorage.setItem('token', token);

        const userStorage = {
          username: user.sub,
          role: user.role_code,
          accountId: user.employee_id,
          employee_code: user.employee_code
        };

        const action = saveUser(userStorage);
        dispatch(action);
        toast.success("Đăng nhập thành công!")
        navigate('/admin/dashboard');

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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleLogin();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="flex flex-col items-start w-full h-screen md:flex-row">
      <div className="relative flex flex-col w-full md:w-1/2 h-1/2 md:h-full">
        <img className="object-cover w-full h-full" src="https://i.pinimg.com/736x/71/c1/4f/71c14fa9241a6a2a545b45eea59ed972.jpg" alt="" />
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

        <div className="flex flex-col w-full ">
          <div className="flex flex-col w-full mb-2">
            <h3 className="mb-2 text-3xl font-semibold">Đăng nhập</h3>
            <p className="mb-2 text-base text-blue-500">
              Xin chào! {typeLogin ? 'Đăng nhập với tư cách quản trị viên hệ thống' : 'Đăng nhập với tư cách nhân viên'}
            </p>
          </div>
          <div className="flex justify-around w-full ">
            <div
              className={`border-b-2 pb-1 cursor-pointer transition duration-500 ease-in-out ${typeLogin ? 'border-blue-700' : 'border-black'
                }`}
              onClick={() => handleChangeTypeLogin(true)}
            >
              <h3 className="font-semibold">Quản trị viên</h3>
            </div>
            <div
              className={`border-b-2 pb-1 cursor-pointer transition duration-500 ease-in-out ${!typeLogin ? 'border-blue-700' : 'border-black'
                }`}
              onClick={() => handleChangeTypeLogin(false)}
            >
              <h3 className="font-semibold">Nhân viên</h3>
            </div>
          </div>

          <div className="flex flex-col w-full mt-4">
            <input
              type="text"
              placeholder={'Tên đăng nhập'}
              value={username}
              onChange={e => setUsername(e.target.value)}
              className={`w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none  focus:outline-none`}
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={`w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-non`}
            />
          </div>
          <div className="flex flex-col w-full my-4">
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
