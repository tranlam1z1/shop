import React from "react";
import { add, remove } from "../redux/Slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

const Product = ({ item }) => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const addToCart = () => {
    dispatch(add(item));
    enqueueSnackbar(`Thêm thành công vào giở hàng!`, {
      variant: "success",
      autoHideDuration: 3000,
    });
  };

  const removeFromCart = () => {
    dispatch(remove(item._id));
    enqueueSnackbar(`Xóa sản phẩm thành công!`, {
      variant: "warning",
      autoHideDuration: 3000,
    });
  };

  const formattedPrice = item?.sellPrice?.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  });

  return (
    <div className="group hover:scale-110 transition duration-300 ease-in flex flex-col items-center border-2 border-green-700 gap-3 p-4 h-[350px] mt-10 ml-5 rounded-xl">
      <div className="h-[180px]">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div>
        <h1 className="w-48 mt-3 text-gray-700 font-semibold text-lg">
          {item.name}
        </h1>
      </div>
      <div className="flex items-center justify-between w-full mt-5">
        {cart.some((p) => p._id === item._id) ? (
          <button
            className="group-hover:bg-red-700 group-hover:text-white transition duration-300 ease-in text-red-700 border-2 border-red-700 rounded-lg font-semibold p-3"
            onClick={removeFromCart}
          >
            Xóa
          </button>
        ) : (
          <button
            className="group-hover:bg-green-700 group-hover:text-white transition duration-300 ease-in text-green-700 border-2 border-green-700 rounded-lg font-semibold p-3"
            onClick={addToCart}
          >
            Mua hàng
          </button>
        )}
        <p>{formattedPrice}</p>
      </div>
    </div>
  );
};

export default Product;
