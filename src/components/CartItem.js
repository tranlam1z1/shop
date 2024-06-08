import React from "react";
import { Delete } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { remove, increaseQuantity, decreaseQuantity } from "../redux/Slices/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const removeItemFromCart = () => {
    dispatch(remove(item._id));
    enqueueSnackbar(`Item removed from your cart!`, {
      variant: "warning",
      autoHideDuration: 3000,
    });
  };

  const increaseItemQuantity = () => {
    dispatch(increaseQuantity(item._id));
  };

  const decreaseItemQuantity = () => {
    if (item.userQuantity > 1) {
      dispatch(decreaseQuantity(item._id));
    } else {
      removeItemFromCart();
    }
  };

  const formattedPrice = item?.sellPrice?.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  });

  const formattedTotalPrice = (item.sellPrice * item.userQuantity).toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  });

  return (
    <div className="flex items-center p-5 justify-between bg-green-200 mt-2 mb-2 rounded-xl">
      <div className="flex p-3">
        <img src={item.image} className="h-28 rounded-lg" alt={item.name} />
        <div className="ml-10 self-start space-y-5">
          <h1 className="text-xl text-green-700 font-semibold">{item.name}</h1>
          <p>Giá: {formattedPrice}</p>
          <p>Tổng tiền: {formattedTotalPrice}</p>
          <div className="flex items-center">
            <button onClick={decreaseItemQuantity} className="bg-gray-300 hover:bg-gray-400 rounded-full px-2 py-1">
              -
            </button>
            <span className="mx-2">{item.userQuantity}</span>
            <button onClick={increaseItemQuantity} className="bg-gray-300 hover:bg-gray-400 rounded-full px-2 py-1">
              +
            </button>
          </div>
        </div>
      </div>
      <div
        onClick={removeItemFromCart}
        className="bg-red-700 hover:bg-red-500 transition-transform duration-300 cursor-pointer rounded-full p-3 mr-3"
      >
        <Delete className="text-white" />
      </div>
    </div>
  );
};

export default CartItem;
