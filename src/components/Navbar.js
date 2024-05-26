import React from "react";
import { ShoppingBasket } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { cart } = useSelector((state) => state);
  return (
    <>
      <nav className="flex items-center justify-between h-20  max-w-6xl mx-auto">
      <Link to={"/"}>
  <div className="ml-5 flex items-center"> {/* Đảm bảo flex container để căn chỉnh hình ảnh và văn bản */}
    <img  src={require("../photos/logo.jpg")} alt="Bếp Sinh Viên Logo" className="h-10 w-10" style={{ borderRadius: "50px" }} /> {/* Thay đổi kích thước theo yêu cầu */}
    <h1 className="bg-gradient-to-br from-green-700 to-green-300 bg-clip-text text-transparent text-xl sm:text-2xl md:text-3xl font-bold logo cursor-pointer tracking-wider ml-2">
      Bep Sinh Vien
    </h1>
  </div>
</Link>

        <div className="flex list-none items-center space-x-6 mr-5 text-gray-700 -tracking-tighterr font-semibold">
          <Link to={"/"}>
            <li className="cursor-pointer hover:text-purple-500 transition duration-300 ease-in">
              Trang chủ
            </li>
          </Link>
          <Link to={"/cart"}>
            <div className="relative">
              <ShoppingBasket className="text-2xl cursor-pointer hover:text-green-700 transition transform duration-200" />

              {cart.length > 0 && (
                <div className="absolute bg-green-700 text-xs w-5 h-5 flex justify-center items-center animate-bounce -top-1 -right-2 rounded-full top- text-white">
                  {cart.length}
                </div>
              )}
            </div>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
