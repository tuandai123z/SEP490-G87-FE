import Banner from '../../component/Banner';
import Footer from '../../component/layout/Footer';
import FooterWidget from '../../component/layout/FooterWidget';
import Header from '../../component/layout/Header';
import SliderEquipment from '../../component/SliderEquipment';

const LandingPage = () => {
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
  ];

  return (
    <div className="flex flex-col">
      <Header />
      <Banner />
      <SliderEquipment items={items} title={'Ống luồn dây & Phụ kiện'} />
      <SliderEquipment items={items} title={'Ống luồn dây & Phụ kiện'} />
      <FooterWidget />
      <Footer />
    </div>
  );
};

export default LandingPage;
