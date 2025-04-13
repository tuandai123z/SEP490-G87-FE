import axios from 'axios';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';
import './App.css';
import Page404 from './components/layouts/Page404/Page404';
import { adminRoutes, inventoryRoutes, managerRoutes, publicRoutes, saleRoutes } from './routes';
import { defaultBaseUrl } from './utils/axiosInstant';
import { ADMIN_ROLE, INVENTORY_ROLE, MANAGER_ROLE, SALE_ROLE } from './utils/constants';
axios.defaults.baseURL = defaultBaseUrl;

function App() {
  const dataUser = useSelector(state => state.user);
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

        {adminRoutes?.map((route, index) => {
          if (!dataUser || !dataUser?.role?.includes(ADMIN_ROLE)) return;
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

        {inventoryRoutes?.map((route, index) => {
          if (!dataUser || !dataUser?.role?.includes(INVENTORY_ROLE)) return;
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

        {saleRoutes?.map((route, index) => {
          if (!dataUser || !dataUser?.role?.includes(SALE_ROLE)) return;
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

        {managerRoutes?.map((route, index) => {
          if (!dataUser || !dataUser?.role?.includes(MANAGER_ROLE)) return;
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
