import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-white py-10">
      <div className="container mx-auto flex flex-col items-center gap-8">
        {/* Logo / Title */}
        <h1 className="text-3xl font-bold tracking-wide">Eflyer</h1>

        {/* Newsletter */}
        <div className="flex w-full max-w-md">
          <input
            type="email"
            placeholder="Your Email"
            className="flex-1 px-4 py-2 rounded-l-lg text-gray-900 outline-none"
          />
          <button className="px-5 py-2 text-amber-600 rounded-r-lg font-medium">
            Subscribe
          </button>
        </div>

        {/* Menu */}
        <ul className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <li>
            <a href="#" className="hover:text-emerald-400 transition">
              Best Sellers
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-emerald-400 transition">
              Gift Ideas
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-emerald-400 transition">
              New Releases
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-emerald-400 transition">
              Today's Deals
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-emerald-400 transition">
              Customer Service
            </a>
          </li>
        </ul>

        {/* Contact */}
        <p className="text-sm">
          Help Line Number:{" "}
          <a href="#" className="text-white hover:underline">
            +1 1800 1200 1200
          </a>
        </p>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-600 mt-10 pt-4 text-center text-xs text-gray-300">
        © 2025 All Rights Reserved. Design by{" "}
        <a
          href="https://html.design"
          className="text-white hover:underline"
        >
          Free HTML Templates
        </a>
      </div>
    </footer>
  );
};

export default Footer;
