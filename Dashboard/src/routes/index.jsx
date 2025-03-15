import DefaultLayout from '../layouts/DefaultLayout';
import InventoryLayout from '../layouts/InventoryLayout';
import Dashboard from '../pages/Dashboard';
import GeneralSetting from '../pages/GeneralSetting';
import BranchManagement from '../pages/GeneralSetting/BranchManagement';
import CategoryManagement from '../pages/GeneralSetting/CategoryManagement';
import Inventory from '../pages/Inventory';
import ExportInventory from '../pages/Inventory/ExportInventory';
import InventoryStatistic from '../pages/Inventory/InventoryStatistic';
import Liquidation from '../pages/Inventory/Liquidation';
import Supplier from '../pages/Inventory/Supplier';
import Login from '../pages/Login';
import ProductsManagement from '../pages/ProductsManagement';
import StaffManagement from '../pages/StaffManagement';
import UserProfile from '../pages/UserProfile';
import OrderManagement from '../pages/Inventory/OrderMangement';
import CreateOrder from '../pages/Inventory/CreateOrder';
import EditOrder from '../pages/Inventory/CreateOrder/EditOrder';

const publicRoutes = [
  { path: '/', component: Login },
  { path: '/admin/dashboard', component: Dashboard, layout: DefaultLayout },
  { path: '/admin/management/staffs', component: StaffManagement, layout: DefaultLayout },
  { path: '/admin/profile', component: UserProfile, layout: DefaultLayout },
  { path: '/admin/management/products', component: ProductsManagement, layout: DefaultLayout },
  { path: '/admin/management/inventory', component: Inventory, layout: DefaultLayout },
  { path: '/admin/management/general', component: GeneralSetting, layout: DefaultLayout },
  { path: '/admin/management/category', component: CategoryManagement, layout: DefaultLayout },
  { path: '/admin/management/branch', component: BranchManagement, layout: DefaultLayout },
  { path: '/inventory', component: Inventory, layout: InventoryLayout },
  { path: '/inventory/statistic', component: InventoryStatistic, layout: InventoryLayout },
  { path: '/inventory/order/edit/:slug', component: EditOrder, layout: InventoryLayout },
  { path: '/inventory/order/create', component: CreateOrder, layout: InventoryLayout },
  { path: '/inventory/order/management', component: OrderManagement, layout: InventoryLayout },
  { path: '/inventory/export', component: ExportInventory, layout: InventoryLayout },
  { path: '/inventory/supplier', component: Supplier, layout: InventoryLayout },
  { path: '/inventory/liquidation', component: Liquidation, layout: InventoryLayout },
  { path: '/profile', component: UserProfile },
];

export { publicRoutes };
