import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import Banner from '../../component/Banner';
import Footer from '../../component/layout/Footer';
import FooterWidget from '../../component/layout/FooterWidget';
import Header from '../../component/layout/Header';
import SliderEquipment from '../../component/SliderEquipment';

const LandingPage = () => {
  const [listData, setListData] = useState('');
  const ref = useRef(false);

  const getListData = () => {
    axios
      .get('/products/get-list-products-category')
      .then(res => {
        const data = res.data;
        setListData(data);
      })
      .catch(err => {
        if (err.response) {
          const errorRes = err.response.data;
          toast.error(errorRes.message);
        } else if (err.request) {
          toast.error("Yêu cầu không thành công");
        } else {
          toast.error(err.message);
        }
      })

  }

  useEffect(() => {
    if (ref.current) return;
    ref.current = true;
    getListData();
  }, [])

  return (
    <div className="flex flex-col">
      <Header />
      <Banner />
      {listData && listData?.map((products) => {
        return <SliderEquipment items={products?.products} title={products?.category?.name} />
      })}
      <FooterWidget />
      <Footer />
    </div>
  );
};

export default LandingPage;
