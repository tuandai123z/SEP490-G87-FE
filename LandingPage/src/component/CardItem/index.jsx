import { useNavigate } from 'react-router-dom';
import { formatVND } from '../../utils/format';

const CardItem = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div className="relative p-4 transition-all duration-300 ease-in-out bg-white border rounded-lg shadow-md w-3/10 group hover:shadow-lg hover:border-black">
      <div className="relative cursor-pointer" onClick={() => navigate(`/cua-hang/${item?.code}`)}>
        <img className="w-full h-40 bg-gray-300 " src={'https://thietbidienhaiphong.com/wp-content/uploads/2015/03/download-3-247x184.jpg'} />

        <button className="absolute uppercase bottom-0 left-0 w-full py-1 font-bold text-white text-sm transition duration-700 translate-y-4 bg-[#446084] opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
          Quick view
        </button>
      </div>

      <div className="mt-3">
        <p className="overflow-hidden text-[0.75em] font-semibold text-gray-500 whitespace-nowrap uppercase">{item?.categoryName}</p>
        <p className="text-[#334862] font-medium">{item?.name}</p>
        <p className="mt-1 font-bold text-[#334862]">
          Giá: <span className="text-red-500">{formatVND(item?.sellingPrice)}</span>
        </p>
      </div>
    </div>
  );
};

export default CardItem;
