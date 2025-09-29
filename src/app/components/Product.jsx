"use client";
import React, { useState, useEffect } from "react";

const Product = () => {
  const itemsPerPage = 3;
  const maxPages = 2; // ✅ Limit to 2 pages

  // --- Dashboard Products (normal) ---
  const [dashboardProducts, setDashboardProducts] = useState([]);
  const [dashboardCurrent, setDashboardCurrent] = useState(0);

  // --- Featured Products ---
  const [secondSliderProducts, setSecondSliderProducts] = useState([]);
  const [secondSliderCurrent, setSecondSliderCurrent] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("products");
    if (stored) {
      const allProducts = JSON.parse(stored);

      // Separate by flag
      setDashboardProducts(allProducts.filter((p) => !p.isFeatured));
      setSecondSliderProducts(allProducts.filter((p) => p.isFeatured));
    }
  }, []);

  // --- Dashboard navigation ---
  const nextDashboard = () => {
    const maxIndex = (maxPages - 1) * itemsPerPage;
    if (
      dashboardCurrent < maxIndex &&
      dashboardCurrent + itemsPerPage < dashboardProducts.length
    ) {
      setDashboardCurrent(dashboardCurrent + itemsPerPage);
    }
  };

  const prevDashboard = () => {
    if (dashboardCurrent > 0) {
      setDashboardCurrent(dashboardCurrent - itemsPerPage);
    }
  };

  // --- Featured navigation ---
  const nextSecondSlider = () => {
    const maxIndex = (maxPages - 1) * itemsPerPage;
    if (
      secondSliderCurrent < maxIndex &&
      secondSliderCurrent + itemsPerPage < secondSliderProducts.length
    ) {
      setSecondSliderCurrent(secondSliderCurrent + itemsPerPage);
    }
  };

  const prevSecondSlider = () => {
    if (secondSliderCurrent > 0) {
      setSecondSliderCurrent(secondSliderCurrent - itemsPerPage);
    }
  };

  // --- Clear all products ---
  const clearProducts = () => {
    localStorage.removeItem("products");
    setDashboardProducts([]);
    setSecondSliderProducts([]);
    setDashboardCurrent(0);
    setSecondSliderCurrent(0);
  };

  // --- Reusable UI ---
  const renderSlider = (products, current, prevFn, nextFn, title) => (
    <div className="mt-12">
      <h1 className="text-2xl font-bold text-center mb-6">{title}</h1>
      <div className="flex justify-center items-center relative">
        <div className="flex gap-6 overflow-hidden">
          {products.slice(current, current + itemsPerPage).map((product, idx) => (
            <div
              key={idx}
              className="h-[350px] w-[300px] bg-white p-4 rounded-xl shadow-md flex-shrink-0"
            >
              <h2 className="text-center font-semibold">
                {product.title || product.name}
              </h2>
              <p className="text-center text-gray-600">{product.price}</p>
              {product.image || product.img ? (
                <img
                  className="mx-auto my-2 h-[200px] object-contain"
                  src={product.image || product.img}
                  alt={product.title || product.name}
                />
              ) : (
                <div className="h-[200px] flex items-center justify-center text-gray-400">
                  No Image
                </div>
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
          onClick={prevFn}
          disabled={current === 0}
          className="p-4 bg-gray-800 hover:bg-amber-600 mx-2 text-white disabled:opacity-50"
        >
          {"<"}
        </button>
        <button
          onClick={nextFn}
          disabled={
            current + itemsPerPage >= products.length ||
            current >= (maxPages - 1) * itemsPerPage
          }
          className="p-4 bg-gray-800 hover:bg-amber-600 mx-2 text-white disabled:opacity-50"
        >
          {">"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      {/* First Slider - Dashboard Products */}
      {dashboardProducts.length > 0 ? (
        renderSlider(
          dashboardProducts,
          dashboardCurrent,
          prevDashboard,
          nextDashboard,
          "Custom Products (From Dashboard)"
        )
      ) : (
        <p className="text-center text-gray-600">
          No products available in first slider.
        </p>
      )}

      {/* Second Slider - Featured Products */}
      {secondSliderProducts.length > 0 ? (
        renderSlider(
          secondSliderProducts,
          secondSliderCurrent,
          prevSecondSlider,
          nextSecondSlider,
          "Featured Products"
        )
      ) : (
        <p className="text-center text-gray-600">
          
        </p>
      )}

      {(dashboardProducts.length > 0 || secondSliderProducts.length > 0) && (
        <div className="text-center mt-8">
        
        </div>
      )}
    </div>
  );
};

export default Product;
