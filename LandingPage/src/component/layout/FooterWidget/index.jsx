import './styles.scss';

const FooterWidget = () => {
  return (
    <div className="flex justify-center w-full py-5 widget-footer">
      <div className="w-[80%] flex pt-2 pb-5">
        <div className="flex items-center flex-1 gap-5 px-4">
          <img
            src="https://thietbivesinhroyal.vn/wp-content/uploads/2018/10/ft-icon-01.png"
            alt=""
            className=" brightness-75 w-[50px] h-[55px]"
          />
          <div className="flex flex-col gap-1">
            <h6 className="text-base font-bold text-black uppercase">Cam kết chất lượng</h6>
            <p className="text-black text-[14px]">Với nhiều năm cung cấp các sản phẩm thiết bị điện, uy tín là trên hết.</p>
          </div>
        </div>
        <div className="flex items-center flex-1 gap-5 px-4">
          <img
            src="https://thietbivesinhroyal.vn/wp-content/uploads/2018/10/ft-icon-02.png"
            alt=""
            className="brightness-75 w-[50px] h-[55px]"
          />
          <div className="flex flex-col gap-1">
            <h6 className="text-base font-bold text-black uppercase">Giao hàng miễn phí</h6>
            <p className="text-black text-[14px]">Chúng tôi có chính sách giao hàng miễn phí với các đơn hàng ở Hải Phòng.</p>
          </div>
        </div>
        <div className="flex items-center flex-1 gap-5 px-4">
          <img
            src="https://thietbivesinhroyal.vn/wp-content/uploads/2018/10/ft-icon-03.png"
            alt=""
            className="brightness-75 w-[50px] h-[55px]"
          />
          <div className="flex flex-col gap-1">
            <h6 className="text-base font-bold text-black uppercase">Tư vấn kỹ thuật sử dụng</h6>
            <p className="text-black text-[14px]">Tư vấn và hướng dẫn các cơ bản về kiến thức sử dụng hiệu quả bền đẹp</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterWidget;
