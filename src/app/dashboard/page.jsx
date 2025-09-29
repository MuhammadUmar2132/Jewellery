"use client";
import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("home");
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ id: "", title: "", price: "", image: "" });

  // Load products from localStorage when component mounts
  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  // Save products to localStorage whenever products state changes
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // handle file upload (convert image to Base64)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result }); // store Base64
      };
      reader.readAsDataURL(file);
    }
  };

  // add product
  const handleAdd = () => {
    if (!form.id || !form.title || !form.price) {
      alert("All fields required!");
      return;
    }
    setProducts([...products, form]);
    setForm({ id: "", title: "", price: "", image: "" });
  };

  // update product
  const handleUpdate = () => {
    setProducts(
      products.map((p) =>
        p.id === form.id ? { ...form } : p
      )
    );
    setForm({ id: "", title: "", price: "", image: "" });
  };

  // delete product
  const handleDelete = () => {
    setProducts(products.filter((p) => p.id !== form.id));
    setForm({ id: "", title: "", price: "", image: "" });
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <ul>
          <li
            className={`p-2 rounded cursor-pointer ${
              activePage === "home" ? "bg-gray-700" : ""
            }`}
            onClick={() => setActivePage("home")}
          >
            Home
          </li>
          <li
            className={`p-2 rounded cursor-pointer ${
              activePage === "products" ? "bg-gray-700" : ""
            }`}
            onClick={() => setActivePage("products")}
          >
            Products
          </li>
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">
        {activePage === "home" && (
          <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>
        )}

        {activePage === "products" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Manage Products</h1>

            {/* Form */}
            <div className="grid grid-cols-4 gap-4 mb-4">
              <input
                type="text"
                name="id"
                value={form.id}
                onChange={handleChange}
                placeholder="ID"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
                className="border p-2 rounded"
              />
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
                className="border p-2 rounded"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="border p-2 rounded"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={handleAdd}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Add
              </button>
              <button
                onClick={handleUpdate}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>

            {/* Product Table */}
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">ID</th>
                  <th className="border px-4 py-2">Title</th>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2">Image</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={i} className="text-center">
                    <td className="border px-4 py-2">{p.id}</td>
                    <td className="border px-4 py-2">{p.title}</td>
                    <td className="border px-4 py-2">${p.price}</td>
                    <td className="border px-4 py-2">
                      {p.image && (
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-16 h-16 object-cover mx-auto rounded"
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
