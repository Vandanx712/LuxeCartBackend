import MainSlider from "../components/sliders/MainSlider";
import Categories from "../components/common/Categories";
import DiscountSlider from "../components/sliders/DiscountSlider";
import CompanyLogoSlider from "../components/sliders/CompanyLogoSlider";
import ProductCard from "../components/common/ProductCard";
import { useState,useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [products,setProducts] = useState([])    

  useEffect(()=>{
    loadHome()
  },[])

  async function loadHome() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/homepage`,{withCredentials:true})
      setProducts(response.data.products)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <MainSlider />
      <div className=" m-10 flex items-center justify-center">
        <h1 className=" text-3xl md:text-5xl font-Monrope bg-gradient-to-tl from-royalpurple to-DeepNavy bg-clip-text text-transparent">Categories</h1>
      </div>
      <Categories />
      <DiscountSlider />
      <div className=" m-10 flex items-center justify-center">
        <h1 className=" text-3xl md:text-5xl font-Monrope bg-gradient-to-tl from-royalpurple to-DeepNavy bg-clip-text text-transparent">Big Brands</h1>
      </div>
      <CompanyLogoSlider />
      <main className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-16">
            <button className="bg-DeepNavy text-offwhite px-12 py-4 rounded-full font-Manrope hover:bg-gold hover:text-CharcoalBlack transition-all duration-300 transform hover:scale-105">
              Load More Products
            </button>
          </div>
        </div>  
      </main>
    </>
  );
};

export default Home;
