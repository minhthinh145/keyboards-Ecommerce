import { BrowserRouter as Router, Route, Routes, Link, data } from "react-router-dom";
import { FiChevronDown, FiFilter } from "react-icons/fi";
import { Hero } from "../Hero.jsx";
import { useEffect, useState } from "react";
import { MdExpandMore } from "react-icons/md";
import {ProductCard} from "../ProductCard.jsx";
import SortDropdown from "../button/SortDropdown.jsx";
import { getProducts } from "../../api/products.js";

export const Products = () => {
  const handleSortChange = (value) => {
    // thực hiện fetch lại danh sách sản phẩm theo value
  };
  const [toggle, setToggle] = useState(false); //state tạm để tes toggle
  const [error , setError] = useState(null); //state tạm để test error
  const [products, setProducts] = useState([]); 
  useEffect( () => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(); 
        setProducts(data); // set lại state products với dữ liệu từ API
      } catch (err){
        setError(err); // nếu có lỗi thì set lại state error
      }
    };
    fetchProducts(); 
  },[]);
  if (error) {
    return <p>{error}</p>;
  }

  // Hiển thị thông báo nếu không có sản phẩm
  if (products.length === 0) {
    return <p>Sản phẩm không tồn tại hoặc đang tải...</p>;
  }


  return (
    
    <div className="bg-white">
      {/* Hero section */}
      <section>
        <Hero />
      </section> 

      {/* Filter & Sort Top Bar */}
      <section className="">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between mt-6">
          {/* Lọc */}
          <div className="flex items-center space-x-2 ">
            <FiFilter className="h-5 w-5 text-gray-700" />
            <h3 className="text-sm font-medium">Lọc</h3>
          </div>

          {/* Sắp xếp */}
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-semibold">Sắp xếp:</h3>
            <SortDropdown onChange={handleSortChange} />
          </div>
          
        </div>
        {/* Divider line */}
        <div className="max-w-7xl mx-auto px-4">
            <div className="hidden md:block  border-b border-black mt-2 " />
        </div>
      </section>

      {/* Main Content: Categories + Product List */}
      <section className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar - Categories */}
        <aside className="hidden md:block col-span-1 space-y-6 sticky top-24 self-start ">
          {/* Top category item: còn hàng */}
          <div className="flex items-center justify-between border-b pb-2">
            <label className="text-sm font-bold">Còn hàng</label>
            <button
                onClick={() => setToggle(!toggle)}
                className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors duration-300 ${
                    toggle ? "bg-green-500" : "bg-gray-300"
                }`}
                >
                <div
                    className={`w-4 h-4 bg-white rounded-full absolute top-0.5 shadow transition-transform duration-300 ease-in-out ${
                    toggle ? "translate-x-5" : "translate-x-0.5"
                    }`}
                />
            </button>
          </div>

          {/* Giả định các mục lọc khác */}
          <div className="space-y-4 text-sm font-medium text-gray-800">
            <div className="border-b pb-2 flex justify-between">
              <span className="text-sm font-bold">Thương hiệu</span>
              <MdExpandMore className="w-5 h-5" />
            </div>
            <div className="border-b pb-2 flex justify-between">
              <span className="text-sm font-bold">Loại sản phẩm</span>
              <MdExpandMore className="w-5 h-5" />
            </div>
            <div className="border-b pb-2 flex justify-between">
              <span className="text-sm font-bold">Kết nối</span>
              <MdExpandMore className="w-5 h-5" />
            </div>
            {/* ... Các item khác tương tự */}
          </div>
        </aside>

        {/* Product List placeholder */}
        <div className="md:col-span-3 grid g</div>rid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Nơi render danh sách sản phẩm */}
          {products.map((product) => (
            <Link to={`/product/${product.id}`} >
              <ProductCard key = {product.id} product={product} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
