import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Footer from '../../component/layout/Footer';
import FooterWidget from '../../component/layout/FooterWidget';
import Header from '../../component/layout/Header';
import SliderEquipment from '../../component/SliderEquipment';
import { formatVND } from '../../utils/format';
import { scrollToTop } from '../../utils/helper';

const Detail = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [product, setProduct] = useState('');
  const [suggestProducts, setSuggestProducts] = useState([]);
  const ref = useRef(false);

  const getProductDetail = () => {
    axios
      .get(`/products/${slug}`)
      .then(res => {
        const data = res.data;
        setProduct(data);
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
  const getListSuggest = () => {
    if (product?.categoryCode) {
      axios
        .get(`/products/category/${product?.categoryCode}`)
        .then(res => {
          const data = res.data.content;
          setSuggestProducts(data);
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
  }

  useEffect(() => {
    if (ref.current) return;
    ref.current = true;
    scrollToTop();
    getProductDetail();
  }, []);

  useEffect(() => {
    getListSuggest();
    getProductDetail();
  }, [product, slug])


  return (
    <div>
      <Header />
      <div className="flex flex-col items-center w-full gap-6 py-10">
        <div className="w-[80%] grid grid-cols-2 gap-4 pt-8">
          <div className="col-span-1 px-4">
            <img src="https://thietbidienhaiphong.com/wp-content/uploads/2015/03/download-3-247x184.jpg" alt="" className="w-full" />
          </div>
          <div className="flex flex-col col-span-1 gap-4 px-4 pt-3 pb-8">
            <div className="flex items-center text-[#777] gap-2">
              <a onClick={() => navigate('/')} className="uppercase cursor-pointer hover:text-black">
                Trang chủ
              </a>
              /
              <a onClick={() => navigate('/cua-hang')} className="uppercase cursor-pointer hover:text-black">
                Cửa hàng
              </a>
              /
              <a onClick={() => navigate(`/danh-muc-san-pham/${product?.categoryCode}`)} className="uppercase cursor-pointer hover:text-black">
                {product?.categoryName}
              </a>
            </div>
            <h2 className="mb-5 text-4xl font-bold">{product?.name}</h2>
            <span>Giá: {formatVND(product?.sellingPrice)}</span>
            <div className="block h-[3px] max-w-[30px] bg-slate-300"></div>
            {/* <hr /> */}
            <div className="border-t-[1px] border-[#ddd] text-[#777] text-xs py-4">
              <span>Danh mục: {`${product?.brandName}, ${product?.categoryName}`}</span>
            </div>
          </div>
        </div>
        <SliderEquipment items={suggestProducts} title={'Sản phẩm tương tự'} />
      </div>

      <FooterWidget />
      <Footer />
    </div>
  );
};

export default Detail;
