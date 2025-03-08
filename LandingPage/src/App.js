import './App.css';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Page404 from './component/layout/Page404/Page404';
import { publicRoutes } from './routes';
import { Bounce, ToastContainer } from 'react-toastify';
import { defaultBaseUrl } from './utils/axiosInstant';
axios.defaults.baseURL = defaultBaseUrl;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          return <Route path={route?.path} element={<Page />} key={index} />;
        })}

        <Route path="*" element={<Page404 />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Bounce}
        theme="light"
        className={'toastContainerDefault'}
      />
    </BrowserRouter>
  );
}

export default App;
