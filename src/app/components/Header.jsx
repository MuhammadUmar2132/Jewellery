"use client";
import React, { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaUser } from "react-icons/fa";

const Header = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const slides = [
    {
      title: "Get Start",
      subtitle: "Your favorite shopping",
      buttonText: "Buy Now"
    },
    {
      title: "Summer Sale",
      subtitle: "Up to 50% Off",
      buttonText: "Shop Now"
    },
    {
      title: "New Arrivals",
      subtitle: "Latest Trends",
      buttonText: "Explore"
    }
  ];

  const categories = ["Fashion", "Electronics", "Jewelry"];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative w-full">
      {/* Banner Image */}
      <img
        src="https://themewagon.github.io/eflyer/images/banner-bg.png"
        alt="Banner"
        className="w-full h-[600px] object-cover"
      />

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-black shadow-lg z-50 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white">Categories</h2>
            <button
              onClick={toggleSidebar}
              className="text-gray-500 hover:text-gray-300"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            {categories.map((category, index) => (
              <div key={index} className="border-b border-gray-700 pb-4">
                <button className="flex justify-between items-center w-full text-left text-lg font-semibold text-white hover:text-yellow-500 transition duration-200">
                  {category}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navbar Content */}
      <div className="absolute top-0 left-0 w-full">
        {/* Top Links */}
        <div className="w-full flex justify-center">
          <ul className="bg-black bg-opacity-70 h-[40px] px-10 py-2 flex items-center justify-center gap-6 rounded text-white text-sm font-medium mt-4">
            <li className="hover:text-yellow-500 cursor-pointer">Best Seller</li>
            <li className="hover:text-yellow-500 cursor-pointer">Gift Ideas</li>
            <li className="hover:text-yellow-500 cursor-pointer">New Releases</li>
            <li className="hover:text-yellow-500 cursor-pointer">Today's Deals</li>
            <li className="hover:text-yellow-500 cursor-pointer">Customer Service</li>
          </ul>
        </div>

        {/* Search + Options */}
        <div className="w-full flex justify-center mt-4">
          <div className="flex items-center justify-center gap-4 px-6 py-3">
            {/* Toggle Button for Sidebar */}
            <button
              onClick={toggleSidebar}
              className="text-white hover:text-yellow-500 transition duration-200 p-2"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Category Dropdown */}
            <select className="bg-gray-900 text-white rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500">
              <option>All Category</option>
              <option>Action</option>
              <option>Another action</option>
              <option>Something else here</option>
            </select>

            {/* Search Box */}
            <input
              type="search"
              placeholder="Search..."
              className="bg-white rounded px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />

            {/* Language Selector */}
            <select className="bg-white text-black rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500">
              <option>English</option>
              <option>France</option>
            </select>

            {/* Cart Button */}
            <button className="text-white px-4 py-2 rounded transition duration-200 flex items-center gap-2">
              <AiOutlineShoppingCart className="text-lg" />
              Cart
            </button>

            {/* Profile Button */}
            <button className="text-white px-4 py-2 rounded transition duration-200 flex items-center gap-2">
              <FaUser className="text-lg" />
              Profile
            </button>
          </div>
        </div>

        {/* Slider Section */}
        <div className="w-full flex justify-center mt-8">
          <div className="relative w-full max-w-4xl">
            {/* Slider Container */}
            <div className="relative overflow-hidden rounded-lg">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((slide, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="text-center p-8">
                      <h1 className="banner_taital text-5xl font-bold text-white mb-4">
                        {slide.title} <br />
                        <span className="text-yellow-400">{slide.subtitle}</span>
                      </h1>
                      <div className="buynow_bt">
                        <a
                          href="#"
                          className="bg-yellow-500 text-white px-8 py-3 rounded-full hover:bg-yellow-600 transition duration-200 inline-block font-semibold text-lg"
                        >
                          {slide.buttonText}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-80 rounded-full p-2 transition duration-200"
            >
              <svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-80 rounded-full p-2 transition duration-200"
            >
              <svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition duration-200 ${
                    index === currentSlide
                      ? "bg-yellow-500"
                      : "bg-white bg-opacity-50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;