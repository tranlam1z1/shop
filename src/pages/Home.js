import React from "react";
import Product from "../components/Product";
import { products } from "../data";
import Footer from "../components/Footer ";
import Background from "../components/Background";
 

const Home = () => {
  return (
    <>
   <Background/>
   
   <h1 className="text-3xl font-semibold text-center mb-8">Tất cả sản phẩm</h1>
        <div className="min-h-[80vh] grid sm:grid-cols-2 md:grid-cols-3 space-x-5 space-y-10 lg:grid-cols-4 max-w-6xl mx-auto p-2 ">       
        {products.map((item) => {
            return <Product key={item.id} item={item} />;
          })}
        </div>
        <br/>
      <Footer />
    </>
  );
};

export default Home;
