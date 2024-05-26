import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";

const Cart = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { cart } = useSelector((state) => state);

  useEffect(() => {
    const total = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
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
    setShowSuccess(true);
    setShowPopup(false);

    setTimeout(() => {
      setShowSuccess(false);
      window.location.reload(); // Reload the page to reset it
    }, 1000);
  };

  return (
    <>
      {cart.length > 0 ? (
        <>
          <div className="min-h-[80vh] grid md:grid-cols-2 max-w-6xl mx-auto">
            <div className="flex flex-col justify-center items-between p-2">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            <div>
              <div className="flex flex-col justify-center items-end p-5 space-y-5 mt-14">
                <h1 className="font-semibold text-lg text-purple-800">CHI TIẾT ĐƠN HÀNG</h1>
                <p>
                  <span className="text-gray-700 font-semibold">Tổng số lượng</span> :{" "}
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </p>
                <p>
                  <span className="text-gray-700 font-semibold">Thành tiền</span> : {totalAmount} VNĐ
                </p>
                <button
                  onClick={openPopup}
                  className="bg-purple-700 hover:bg-purple-50 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-purple-600 font-bold hover:text-purple-700 p-3"
                >
                  Thanh toán
                </button>
                {showPopup && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 rounded-lg">
                      <h2 className="text-lg font-semibold mb-3">Thanh toán</h2>
                      <img
                        src={require("../photos/qr-code.jpg")}
                        alt="Payment QR Code"
                        className="w-96 h-96 mx-auto"
                      />
                      <form className="mt-5" onSubmit={handleSubmit}>
                        <div className="mb-4">
                          <label className="block text-gray-700 font-semibold mb-2" htmlFor="cardNumber">
                            Lưu ý: Nhập đúng nội dung chuyển khoản: Số lượng + Sản phẩm + Địa chỉ + Số điện thoại
                          </label>
                          <p>Ví dụ: 2 trachanh tuancuong 0123456789 </p>
                        </div>
                        <div className="flex justify-between">
                          <button
                            onClick={closePopup}
                            className="bg-purple-700 hover:bg-purple-50 rounded-lg text-white transition duration-300 ease-linear border-2 border-purple-600 font-bold hover:text-purple-700 px-4 py-2"
                          >
                            Đóng
                          </button>
                          <button
                            type="submit"
                            className="bg-purple-700 hover:bg-purple-50 rounded-lg text-white transition duration-300 ease-linear border-2 border-purple-600 font-bold hover:text-purple-700 px-4 py-2"
                          >
                            Xác nhận
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {showSuccess && (
  <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg text-xl font-semibold transition-opacity duration-300">
    Thanh toán thành công!
  </div>
)}
        </>
      ) : (
        <>
          <div className="min-h-[80vh] flex flex-col items-center justify-center">
            <h1 className="text-gray-700 font-semibold text-xl mb-2">Your cart is empty!</h1>
            <Link to={"/"}>
              <button className="bg-purple-700 hover:bg-purple-50 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-purple-600 font-bold hover:text-purple-700 p-3">
                Quay lại Bếp
              </button>
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
