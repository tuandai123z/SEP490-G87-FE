import DefaultLayout from '../layouts/DefaultLayout';
import InventoryLayout from '../layouts/InventoryLayout';
import Dashboard from '../pages/Dashboard';
import GeneralSetting from '../pages/GeneralSetting';
import BranchManagement from '../pages/GeneralSetting/BranchManagement';
import CategoryManagement from '../pages/GeneralSetting/CategoryManagement';
import Inventory from '../pages/Inventory';
import InventoryStatistic from '../pages/Inventory/InventoryStatistic';
import Supplier from '../pages/Inventory/Supplier';
import Login from '../pages/Login';
import ProductsManagement from '../pages/ProductsManagement';
import StaffManagement from '../pages/StaffManagement';
import UserProfile from '../pages/UserProfile';
import OrderManagement from '../pages/Inventory/OrderMangement';
import CreateOrder from '../pages/Inventory/CreateOrder';
import EditOrder from '../pages/Inventory/CreateOrder/EditOrder';
import ViewOrder from '../pages/Inventory/CreateOrder/ViewOrder';
import ReceptionManagement from '../pages/Inventory/InventoryReceipt/ReceptionManagement';
import CreateReception from '../pages/Inventory/InventoryReceipt/CreateReception';
import InventoryReceptDetail from '../pages/Inventory/InventoryReceipt/InventoryReceptDetail';
import EditReception from '../pages/Inventory/InventoryReceipt/EditReception';
import CreateOrderSale from '../pages/Inventory/OrderSale/CreateOrderSale';
import OrderSaleManagement from '../pages/Inventory/OrderSale/OrderSaleManagement';
import EditOrderSale from '../pages/Inventory/OrderSale/EditOrderSale';
import ViewOrderSale from '../pages/Inventory/OrderSale/ViewOrderSale';
import ExportManagement from '../pages/Inventory/InventoryExport/ExportManagement';
import CreateExportDelivery from '../pages/Inventory/InventoryExport/CreateExport';
import EditExportDelivery from '../pages/Inventory/InventoryExport/EditExport';
import CreateReturnForm from '../pages/Inventory/InventoryReturn/CreateReturnFrom';
import ReturnManagement from '../pages/Inventory/InventoryReturn/ReturnManagement';
import EditReturnForm from '../pages/Inventory/InventoryReturn/EditReturn';

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
  { path: '/inventory/order/view/:slug', component: ViewOrder, layout: InventoryLayout },
  { path: '/inventory/reception/management', component: ReceptionManagement, layout: InventoryLayout },
  { path: '/inventory/reception/create', component: CreateReception, layout: InventoryLayout },
  { path: '/inventory/reception/edit/:slug', component: EditReception, layout: InventoryLayout },
  { path: '/inventory/reception/detail/:slug', component: InventoryReceptDetail, layout: InventoryLayout },
  { path: '/inventory/orderSale/create', component: CreateOrderSale, layout: InventoryLayout },
  { path: '/inventory/orderSale/management', component: OrderSaleManagement, layout: InventoryLayout },
  { path: '/inventory/orderSale/edit/:slug', component: EditOrderSale, layout: InventoryLayout },
  { path: '/inventory/orderSale/view/:slug', component: ViewOrderSale, layout: InventoryLayout },
  { path: '/inventory/export/management', component: ExportManagement, layout: InventoryLayout },
  { path: '/inventory/export/create', component: CreateExportDelivery, layout: InventoryLayout },
  { path: '/inventory/export/edit/:slug', component: EditExportDelivery, layout: InventoryLayout },
  { path: '/inventory/return/management', component: ReturnManagement, layout: InventoryLayout },
  { path: '/inventory/return/create', component: CreateReturnForm, layout: InventoryLayout },
  { path: '/inventory/return/edit/:slug', component: EditReturnForm, layout: InventoryLayout },
  { path: '/inventory/supplier', component: Supplier, layout: DefaultLayout },
  { path: '/profile', component: UserProfile },
];

export { publicRoutes };
