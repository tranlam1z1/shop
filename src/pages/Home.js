import React from "react";
import Product from "../components/Product";
import { products, toppings } from "../data";
import Footer from "../components/Footer ";
import Background from "../components/Background";
 

const Home = () => {
  return (
    <>
   <Background/>
   <h1 className="text-3xl font-semibold text-center mb-8">Tất cả sản phẩm</h1>
        <div className="min-h-[80vh] grid sm:grid-cols-2 md:grid-cols-3 space-x-5 space-y-10 lg:grid-cols-3 max-w-6xl mx-auto p-2 text-center">       
        {products.map((item) => {
            return <Product key={item.id} item={item} />;
          })}
        </div>
        <h1 className="text-3xl font-semibold text-center mb-8">Topping</h1>
        <div className="min-h-[80vh] grid sm:grid-cols-2 md:grid-cols-3 space-x-5 space-y-10 lg:grid-cols-3 max-w-6xl mx-auto p-2 text-center">       
        {toppings.map((item) => {
            return <Product key={item.id} item={item} />;
          })}
        </div>
        <div className="text-right mb-8 mr-4 fixed bottom-0 right-0">
        <h2 className="text-xl font-semibold mb-2">Liên hệ</h2>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2">
          <a href="https://www.facebook.com/profile.php?id=61559855210706">Facebook</a>
        </button>
        <br />
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          <a href="tel:0326955912">0326 955 912</a>
        </button>
      </div>
        <br/>
      <Footer />
    </>
  );
};

export default Home;
