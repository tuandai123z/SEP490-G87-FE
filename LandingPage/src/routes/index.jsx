import BrandProducts from '../pages/BrandProducts';
import Detail from '../pages/Detail';
import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import Shop from '../pages/Shop';

const publicRoutes = [
  { path: '/login', component: Login },
  { path: '/', component: LandingPage },
  { path: '/cua-hang/:slug', component: Detail },
  { path: '/cua-hang', component: Shop },
  { path: '/danh-muc-san-pham/:slug', component: BrandProducts },
];

export { publicRoutes };
