import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import icon
import { useNavigate } from 'react-router-dom';

// Custom nút Previous
const PrevArrow = ({ onClick }) => (
  <button className="absolute z-10 p-2 text-gray-800 transform -translate-y-1/2 -left-8 top-1/2" onClick={onClick}>
    <FaChevronLeft size={24} />
  </button>
);

// Custom nút Next
const NextArrow = ({ onClick }) => (
  <button className="absolute z-10 p-2 text-gray-800 transform -translate-y-1/2 -right-8 top-1/2" onClick={onClick}>
    <FaChevronRight size={24} />
  </button>
);

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};
const SliderEquipment = ({ items, title }) => {
  const navigate = useNavigate();
  if (!items || items.length === 1) return null;

  return (
    <div className="flex justify-center w-full px-4 pb-8 ">
      <div className="w-[80%] relative flex flex-col gap-10">
        <span className="w-full pb-2 border-b-[3px]">
          <h5 className="text-xl font-bold uppercase">{title}</h5>
        </span>
        <Slider {...settings}>
          {items?.map((item, index) => {
            return (
              <div
                key={index}
                className="bg-white h-[400px] text-black pr-3 pl-3 cursor-pointer"
                onClick={() => navigate(`/cua-hang/${item?.code}`)}
              >
                <div className="flex items-center justify-center ">
                  <img src={'https://thietbidienhaiphong.com/wp-content/uploads/2015/03/download-3-247x184.jpg'} alt={items?.name} className="w-full" />
                </div>

                <div className="flex flex-col gap-4 p-4">
                  <p className="overflow-hidden text-[0.75em] font-semibold text- opacity-70 whitespace-nowrap">{item?.categoryName}</p>
                  <p className="text-[#334862] font-medium">{item?.name}</p>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default SliderEquipment;
