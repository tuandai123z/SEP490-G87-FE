import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../component/layout/Footer';
import FooterWidget from '../../component/layout/FooterWidget';
import Header from '../../component/layout/Header';
import SliderEquipment from '../../component/SliderEquipment';
import { scrollToTop } from '../../utils/helper';

const Detail = () => {
  const navigate = useNavigate();

  useEffect(() => {
    scrollToTop();
  }, []);
  const items = [
    {
      id: '1',
      name: 'Cảm biến nhiệt độ',
      category: 'AUTONICS',
      url: 'https://thietbidienhaiphong.com/wp-content/uploads/2015/03/download-3-247x184.jpg',
      price: 2000000,
    },
    {
      id: '1',
      name: 'Cảm biến nhiệt độ',
      category: 'AUTONICS',
      url: 'https://thietbidienhaiphong.com/wp-content/uploads/2015/03/download-3-247x184.jpg',
      price: 2000000,
    },
    {
      id: '1',
      name: 'Cảm biến nhiệt độ',
      category: 'AUTONICS',
      url: 'https://thietbidienhaiphong.com/wp-content/uploads/2015/03/download-3-247x184.jpg',
      price: 2000000,
    },
    {
      id: '1',
      name: 'Cảm biến nhiệt độ',
      category: 'AUTONICS',
      url: 'https://thietbidienhaiphong.com/wp-content/uploads/2015/03/download-3-247x184.jpg',
      price: 2000000,
    },
    {
      id: '1',
      name: 'Cảm biến nhiệt độ',
      category: 'AUTONICS',
      url: 'https://thietbidienhaiphong.com/wp-content/uploads/2015/03/download-3-247x184.jpg',
      price: 2000000,
    },
    {
      id: '1',
      name: 'Cảm biến nhiệt độ',
      category: 'AUTONICS',
      url: 'https://thietbidienhaiphong.com/wp-content/uploads/2015/03/download-3-247x184.jpg',
      price: 2000000,
    },
    {
      id: '1',
      name: 'Cảm biến nhiệt độ',
      category: 'AUTONICS',
      url: 'https://thietbidienhaiphong.com/wp-content/uploads/2015/03/download-3-247x184.jpg',
      price: 2000000,
    },
    {
      id: '1',
      name: 'Cảm biến nhiệt độ',
      category: 'AUTONICS',
      url: 'https://thietbidienhaiphong.com/wp-content/uploads/2015/03/download-3-247x184.jpg',
      price: 2000000,
    },
  ];

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center w-full gap-6 py-10">
        <div className="w-[80%] grid grid-cols-2 gap-4 pt-8">
          <div className="col-span-1 px-4">
            <img src="https://thietbidienhaiphong.com/wp-content/uploads/2015/03/download-3-247x184.jpg" alt="" className="w-full" />
          </div>
          <div className="flex flex-col col-span-1 gap-4 px-4 pt-3 pb-8">
            <div className="flex items-center text-[#777]">
              <a onClick={() => navigate('/')} className="uppercase cursor-pointer hover:text-black">
                Trang chủ /
              </a>
            </div>
            <h2 className="mb-5 text-4xl font-bold">Cầu dao hộp</h2>
            <div className="block h-[3px] max-w-[30px] bg-slate-300"></div>
            {/* <hr /> */}
            <div className="border-t-[1px] border-[#ddd] text-[#777] text-xs py-4">
              <span>Danh mục: </span>
            </div>
          </div>
        </div>
        <SliderEquipment items={items} title={'Sản phẩm tương tự'} />
      </div>

      <FooterWidget />
      <Footer />
    </div>
  );
};

export default Detail;
