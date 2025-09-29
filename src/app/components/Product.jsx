"use client";
import React, { useState, useEffect } from "react";

const Product = () => {
  const itemsPerPage = 3;

  // --- Hardcoded demo categories ---
  const fashionProducts = [
    { id: 1, name: "Man T-Shirt", price: "30$", img: "https://themewagon.github.io/eflyer/images/tshirt-img.png" },
    { id: 2, name: "Man Dress Shirt", price: "50$", img: "https://themewagon.github.io/eflyer/images/dress-shirt-img.png" },
    { id: 3, name: "Man Jeans", price: "40$", img: "https://themewagon.github.io/eflyer/images/women-clothes-img.png" },
  ];

  const electronicsProducts = [
    { id: 1, name: "Smartphone", price: "400$", img: "https://themewagon.github.io/eflyer/images/mobile-img.png" },
    { id: 2, name: "Laptop", price: "800$", img: "https://themewagon.github.io/eflyer/images/laptop-img.png" },
    { id: 3, name: "Computer", price: "120$", img: "https://themewagon.github.io/eflyer/images/computer-img.png" },
  ];

  const jewelryProducts = [
    { id: 1, name: "Jumkas", price: "700$", img: "https://themewagon.github.io/eflyer/images/jhumka-img.png" },
    { id: 2, name: "Necklaces", price: "150$", img: "https://themewagon.github.io/eflyer/images/neklesh-img.png" },
    { id: 3, name: "Kangans", price: "1200$", img: "https://themewagon.github.io/eflyer/images/kangan-img.png" },
  ];

  // --- Dashboard Products (from localStorage) ---
  const [dashboardProducts, setDashboardProducts] = useState([]);
  const [dashboardCurrent, setDashboardCurrent] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("products");
    if (stored) {
      setDashboardProducts(JSON.parse(stored));
    }
  }, []);

  const nextDashboard = () => {
    if (dashboardCurrent + itemsPerPage < dashboardProducts.length) {
      setDashboardCurrent(dashboardCurrent + itemsPerPage);
    }
  };
  const prevDashboard = () => {
    if (dashboardCurrent - itemsPerPage >= 0) {
      setDashboardCurrent(dashboardCurrent - itemsPerPage);
    }
  };

  // --- Reusable UI ---
  const renderSlider = (products, current, prev, next, title) => (
    <div className="mt-12">
      <h1 className="text-2xl font-bold text-center mb-6">{title}</h1>
      <div className="flex justify-center items-center relative">
        <div className="flex gap-6 overflow-hidden">
          {products.slice(current, current + itemsPerPage).map((product, idx) => (
            <div
              key={idx}
              className="h-[350px] w-[300px] bg-white p-4 rounded-xl shadow-md flex-shrink-0"
            >
              <h2 className="text-center font-semibold">{product.title || product.name}</h2>
              <p className="text-center text-gray-600">{product.price}</p>
              {product.image || product.img ? (
                <img
                  className="mx-auto my-2 h-[200px] object-contain"
                  src={product.image || product.img}
                  alt={product.title || product.name}
                />
              ) : (
                <div className="h-[200px] flex items-center justify-center text-gray-400">No Image</div>
              )}
              <div className="flex justify-between px-4 mt-2">
                <button className="text-amber-700 hover:text-amber-900 font-medium">
                  Buy Now
                </button>
                <p className="text-gray-700 hover:text-amber-800 cursor-pointer">
                  See More
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={prev}
          disabled={current === 0}
          className="p-4 bg-gray-800 hover:bg-amber-600 mx-2 text-white disabled:opacity-50"
        >
          {"<"}
        </button>
        <button
          onClick={next}
          disabled={current + itemsPerPage >= products.length}
          className="p-4 bg-gray-800 hover:bg-amber-600 mx-2 text-white disabled:opacity-50"
        >
          {">"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      {/* Dashboard Products Slider */}
      {dashboardProducts.length > 0 &&
        renderSlider(dashboardProducts, dashboardCurrent, prevDashboard, nextDashboard, "Custom Products (From Dashboard)")}

      {/* Fashion Slider */}
      {renderSlider(fashionProducts, 0, () => {}, () => {}, "Man & Woman Fashion")}

      {/* Electronics Slider */}
      {renderSlider(electronicsProducts, 0, () => {}, () => {}, "Electronics")}

      {/* Jewelry Slider */}
      {renderSlider(jewelryProducts, 0, () => {}, () => {}, "Jewelry & Accessories")}
    </div>
  );
};

export default Product;
