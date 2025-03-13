import './styles.scss';
const Footer = () => {
  return (
    <div className="flex justify-center w-full pt-8 pb-8 footer">
      <div className="w-[80%] flex">
        <div className="flex flex-col flex-1 gap-2 px-4 text-white ">
          <h3 className="text-[#d59c5e] font-normal text-[24px] mb-.5em] ">Công ty</h3>
          <p>CÔNG TY TNHH XÂY DỰNG THƯƠNG MẠ THIẾT BỊ ĐIỆN HẢI PHÒNG</p>
          <p>Người đại diện: Lại Văn Khnh</p>
          <p>Số ĐKKD 0201624632 do sở KHĐT Tp. Hải Phòng cấp ngày 09/03/2015</p>
          <p>Địa chỉ 1: Số 46, Phố chợ Đôn, Nghĩa Xá, Quận Lê Chân, Tp Hải Phòng</p>
          <p>Địa chỉ 2: Vĩnh Niệm, Vĩnh Khiệm, Lê Chân, Hải Phòng </p>
          <p>Điện thoại: 0936.841.799</p>
          <p>Điện thoại: 0899.271.799</p>
          <p>Email: sale@thietbidienhp.com</p>
        </div>
        <div className="flex-1 pl-4 pr-4">
          <h3 className="text-[#d59c5e] font-normal text-[24px] mb-[.5em] ">Thông tin</h3>
          <div className="flex flex-wrap w-full text-white">
            <div className="w-[50%] mt-1 mb-1 h-7">Cách đặt hàng</div>
            <div className="w-[50%] mt-1 mb-1 h-7">Chính sách chung</div>
            <div className="w-[50%] mt-1 mb-1 h-7">Kiểm tra đơn hàng</div>
            <div className="w-[50%] mt-1 mb-1 h-7">Danh mục sản phẩm</div>
            <div className="w-[50%] mt-1 mb-1 h-7">Chính sách bảo mật</div>
            <div className="w-[50%] mt-1 mb-1 h-7">Tài khoản</div>
            <div className="w-[50%] mt-1 mb-1 h-7">Điều khoản sử dụng</div>
            <div className="w-[50%] mt-1 mb-1 h-7">Cửa hàng của chúng tôi</div>
            <div className="w-[50%] mt-1 mb-1 h-7">Liên hệ</div>
          </div>
        </div>
        <div className="flex-1 pl-4 pr-4">
          <h3 className="text-[#d59c5e] font-normal text-[24px] mb-[.5em] ">Đăng ký nhận tin</h3>
          <div className="flex flex-wrap gap-4">
            <input type="text" className="w-full outline-none p-3 h-[38px]" placeholder="Địa chỉ email của bạn" />
            <button className="pr-4 pl-4 h-[38px] bg-[#d26e4b] text-white font-semibold">Đăng ký</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
