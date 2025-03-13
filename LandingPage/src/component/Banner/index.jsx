const Banner = () => {
  return (
    <div className="flex justify-center w-full pt-16 pb-16 gap-7">
      <div className="w-[80%] flex flex-col items-center gap-7">
        <h2 className="text-3xl font-bold text-[#555]">Thiết bị điện Hải Phòng</h2>
        <p className="text-center">
          <strong>CÔNG TY TNHH XÂY DỰNG THƯƠNG MẠI THIẾT BỊ ĐIỆN HẢI PHÒNG </strong>
          là nhà cung cấp cho khách hàng đủ loại sản phẩm thuộc về lĩnh vực thiết bị mạng trung hạ thế, điện công nghiệp, điều khiển tự
          động, điện chiếu sáng … được nhập từ các nước Châu Á, Châu Âu và Châu Mỹ.
        </p>
        <p className="text-center">
          Chúng tôi cung cấp và thi công lắp đặt các thiết bị điện công nghiệp, tự động hoá {'&'} chiếu sáng cho các dự án các khu công
          nghiệp, nhà máy, khách sạn, chiếu sáng công cộng, khu dân cư,…
        </p>
        <p>
          <img src="https://thietbivesinhroyal.vn/wp-content/uploads/2018/10/spt.png" alt="" />
        </p>
      </div>
    </div>
  );
};

export default Banner;
