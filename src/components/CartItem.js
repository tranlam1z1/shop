import React from "react";
import { Delete } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { remove, increaseQuantity, decreaseQuantity } from "../redux/Slices/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const removeItemFromCart = () => {
    dispatch(remove(item.id));
    enqueueSnackbar(`Item removed from your cart!`, {
      variant: "warning",
      autoHideDuration: 3000,
    });
  };

  const increaseItemQuantity = () => {
    dispatch(increaseQuantity(item.id));
  };

  const decreaseItemQuantity = () => {
    if (item.quantity > 1) {
      dispatch(decreaseQuantity(item.id));
    } else {
      removeItemFromCart();
    }
  };

  return (
    <div className="flex items-center p-5 justify-between bg-violet-200 mt-2 mb-2 rounded-xl">
      <div className="flex p-3">
        <img src={item.image} className="h-28 rounded-lg" alt="" />
        <div className="ml-10 self-start space-y-5">
          <h1 className="text-xl text-purple-700 font-semibold">{item.title}</h1>
          <p>Giá: {item.price} VNĐ</p>
          <p>Tổng tiền: {(item.price * item.quantity)} VNĐ</p>
          <div className="flex items-center">
            <button onClick={decreaseItemQuantity} className="bg-gray-300 hover:bg-gray-400 rounded-full px-2 py-1">
              -
            </button>
            <span className="mx-2">{item.quantity}</span>
            <button onClick={increaseItemQuantity} className="bg-gray-300 hover:bg-gray-400 rounded-full px-2 py-1">
              +
            </button>
          </div>
        </div>
      </div>
      <div
        onClick={removeItemFromCart}
        className="bg-purple-300 hover:bg-purple-400 transition-transform duration-300 cursor-pointer rounded-full p-3 mr-3"
      >
        <Delete className="text-gray-800" />
      </div>
    </div>
  );
};

export default CartItem;
