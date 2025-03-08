import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

function DefaultLayout({ children }) {
  return (
    <div className="w-full h-[100vh] flex overflow-auto">
      <Sidebar />
      <div className="flex flex-col w-full ml-[15%]">
        <Header />
        <div className='p-8 '>{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
