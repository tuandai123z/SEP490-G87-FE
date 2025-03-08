import axios from 'axios';
import { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';
import './App.css';
import Page404 from './components/layouts/Page404/Page404';
import { publicRoutes } from './routes';
import { defaultBaseUrl } from './utils/axiosInstant';
axios.defaults.baseURL = defaultBaseUrl;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes?.map((route, index) => {
          const Page = route.component;
          let Layout = Fragment;
          if (route.layout) {
            Layout = route.layout;
          }
          return (
            <Route
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
              key={index}
            />
          );
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
