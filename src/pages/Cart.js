import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import QrModal from "../components/QrModal";
import { v4 as uuidv4 } from 'uuid';

const Cart = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { cart } = useSelector((state) => state);

  const total = cart.reduce((acc, product) => {
    return acc + (product.userQuantity * product.sellPrice)
  }, 0).toFixed(3);
  const totalP = cart.reduce((acc, product) => {
    return acc + (product.userQuantity * (product.importPrice));
  }, 0).toFixed(3);
  // const discountTotal = total * (percentVoucher / 100);
  // const totalEnd = total - discountTotal;
  const totalProf = total - totalP;

  const [postData, setPostData] = useState({
    customerName: '',
    customerPhone: '',
    customerAddress: '',
    receiverName: '',
    receiverPhone: '',
    totalProfit: totalProf,
    total: total,
    status: false,
    voucher: '',
    note: '',
    listCart: cart,
    shippingType: 'Giao hàng tận nơi'
  });

  useEffect(() => {
    setPostData({ ...postData, total: Number(total), listCart: cart, totalProfit: totalProf });
  }, [cart]);

  const handleChangeData = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  useEffect(() => {
    const total = cart.reduce((acc, curr) => acc + curr.sellPrice * curr.userQuantity, 0);
    const totalProfit = cart.reduce((acc, curr) => total - (acc + curr.importPrice * curr.userQuantity), 0);
    setTotalAmount(total);
  }, [cart]);



  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    openPopup();
  };

  const formattedTotalAmount = totalAmount?.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  });

  return (
    <>
      {cart.length > 0 ? (
        <>

          <form onSubmit={handleSubmit} className="min-h-[80vh] grid md:grid-cols-2 max-w-6xl gap-5 mx-auto">
            <div className=" w-full">
              <div className="text-xl font-semibold py-16">Thông tin giao hàng</div>
              <div className="text-md font-semibold pb-4">Thông tin người nhận</div>
              <div className="border border-gray-200"></div>

              <div className='grid md:grid-cols-2'>
                <div className="form-group my-2 mr-2">
                  <label htmlFor="exampleInputEmail1">Họ và tên<sup className='text-red-600'>*</sup></label>
                  <input onChange={handleChangeData} required name='customerName' type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="" />
                </div>
                <div className="form-group my-2 ml-2">
                  <label htmlFor="exampleInputPassword1">Số điện thoại<sup className='text-red-600'>*</sup></label>
                  <input onChange={handleChangeData} required name='customerPhone' type="text" className="form-control" id="exampleInputPassword1" placeholder="" />
                </div>
              </div>
              <div className="form-group my-2">
                <label htmlFor='address'>Địa chỉ nhận hàng<sup className='text-red-600'>*</sup></label>
                <input onChange={handleChangeData} required name='customerAddress' type="text" className="form-control" id="address" placeholder="" />
              </div>
              <div className="form-group  my-2">
                <label htmlFor="notex">Ghi chú đơn hàng</label>
                <textarea onChange={handleChangeData} name='note' className="form-control" id="notex" rows="3"></textarea>
              </div>

            </div>
            <div>
              <div className="flex flex-col justify-center items-between p-2">
                {cart.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </div>
              <div>
                <div className="flex flex-col justify-center items-end p-5 space-y-5 mt-14">
                  <h1 className="font-semibold text-lg text-green-700">CHI TIẾT ĐƠN HÀNG</h1>
                  <p>
                    <span className="text-gray-700 font-semibold">Tổng số lượng</span> :{" "}
                    {cart.reduce((acc, item) => acc + item.userQuantity, 0)}
                  </p>
                  <p>
                    <span className="text-gray-700 font-semibold">Thành tiền</span> : {formattedTotalAmount}
                  </p>
                  <button
                    type="submit"
                    className="bg-green-700 hover:bg-purple-50 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-green-700 font-bold hover:text-green-700 p-3"
                  >
                    Thanh toán
                  </button>
                </div>
              </div>
            </div>

          </form>

          {showSuccess && (
            <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg text-xl font-semibold transition-opacity duration-300">
              Thanh toán thành công!
            </div>
          )}
        </>
      ) : (
        <>
          <div className="min-h-[80vh] flex flex-col items-center justify-center">
            <h1 className="text-gray-700 font-semibold text-xl mb-2">Chưa có sản phẩm nào được thêm!</h1>
            <Link to={"/"}>
              <button className="bg-green-700 hover:bg-purple-50 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-green-700 font-bold hover:text-green-700 p-3">
                Quay lại Bếp
              </button>
            </Link>
          </div>
        </>
      )}
      <QrModal
        show={showPopup}
        setShow={setShowPopup}
        total={totalAmount}
        uuid={uuidv4()}
        postData={postData}
      />
    </>
  );
};

export default Cart;
