import Header from '../../components/Header';
import SidebarInventory from '../../components/SidebarInventory';

function InventoryLayout({ children }) {
  return (
    <div className="w-full h-[100vh] flex overflow-auto">
      <SidebarInventory />
      <div className="flex flex-col w-full ml-[15%]">
        <Header />
        <div>{children}</div>
      </div>
    </div>
  );
}

export default InventoryLayout;
