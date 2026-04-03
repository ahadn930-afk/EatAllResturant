// src/components/pages/HomePage.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("all");
  const [showSummary, setShowSummary] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const projectInfo = {
    name: "Eat All Restaurant",
    items: "Menu Items with CRUD Operations",
    status: "Active Development",
    foods: "Burgers, Pizza, Fast Food, Beverages",
    developer: "Eat All Team"
  };

  const initialMenu = [
    { id: 1, name: "Zinger Burger", price: 450, category: "Fast Food", available: true, image: "https://via.placeholder.com/300" },
    { id: 2, name: "Chicken Pizza", price: 800, category: "Italian", available: true, image: "https://via.placeholder.com/300" },
    { id: 3, name: "French Fries", price: 250, category: "Snacks", available: true, image: "https://via.placeholder.com/300" },
    { id: 4, name: "Cold Drink", price: 100, category: "Beverages", available: true, image: "https://via.placeholder.com/300" },
    { id: 5, name: "Beef Burger", price: 550, category: "Fast Food", available: true, image: "https://via.placeholder.com/300" },
    { id: 6, name: "Pasta", price: 600, category: "Italian", available: false, image: "https://via.placeholder.com/300" },
  ];

  useEffect(() => {
    const savedMenu = localStorage.getItem("menuItems");
    if (savedMenu) {
      setMenuItems(JSON.parse(savedMenu));
    } else {
      setMenuItems(initialMenu);
      localStorage.setItem("menuItems", JSON.stringify(initialMenu));
    }
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, filterOption, menuItems]);

  const applyFilters = () => {
    let filtered = [...menuItems];

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (filterOption) {
      case "low-price":
        filtered = filtered.filter(item => item.price < 500);
        break;
      case "high-price":
        filtered = filtered.filter(item => item.price > 500);
        break;
      case "fast-food":
        filtered = filtered.filter(item => item.category === "Fast Food");
        break;
      case "italian":
        filtered = filtered.filter(item => item.category === "Italian");
        break;
      case "available":
        filtered = filtered.filter(item => item.available === true);
        break;
      default:
        break;
    }

    setFilteredItems(filtered);
  };

  const displaySummary = () => {
    setShowSummary(!showSummary);
  };

  const addFoodItem = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      name: e.target["food-name"].value,
      price: parseInt(e.target["food-price"].value),
      category: e.target["food-category"].value,
      available: true,
      image: "https://via.placeholder.com/300"
    };

    const updatedMenu = [...menuItems, newItem];
    setMenuItems(updatedMenu);
    localStorage.setItem("menuItems", JSON.stringify(updatedMenu));
    e.target.reset();
    alert("Food item added successfully!");
  };

  const openModal = (item) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  const updateItem = () => {
    const updatedName = document.getElementById("edit-name").value;
    const updatedPrice = parseInt(document.getElementById("edit-price").value);

    const updatedMenu = menuItems.map(item =>
      item.id === editingItem.id
        ? { ...item, name: updatedName, price: updatedPrice }
        : item
    );

    setMenuItems(updatedMenu);
    localStorage.setItem("menuItems", JSON.stringify(updatedMenu));
    closeModal();
    alert("Item updated successfully!");
  };

  const deleteItem = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const updatedMenu = menuItems.filter(item => item.id !== id);
      setMenuItems(updatedMenu);
      localStorage.setItem("menuItems", JSON.stringify(updatedMenu));
      alert("Item deleted successfully!");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Cart Button */}
      <div className="fixed top-14 right-1 z-50">
        <button className="bg-red-500 text-white px-6 py-3 rounded-full shadow-lg font-bold">
          🛒 Cart (<span id="cart-count">0</span>)
        </button>
      </div>

      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              Welcome to Eat All Restaurant
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              You can order your own choice meal from menu and enjoy your food
            </p>
            <Link
              to="#"
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-red-600 hover:bg-red-700 hover:shadow focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              Order Now
              <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link
              to="#"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Speak to Sales
            </Link>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src="../../../assets/images/eat all logo.png" alt="Mockup" />
          </div>
        </div>
      </section>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-2 my-4 px-4">
        <button type="button" className="text-body bg-neutral-default-medium bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Default</button>
        <button type="button" className="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Secondary</button>
        <button type="button" className="text-body bg-neutral-primary-soft border border-default hover:bg-neutral-secondary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary-soft shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Tertiary</button>
        <button type="button" className="text-white bg-success box-border border border-transparent hover:bg-success-strong focus:ring-4 focus:ring-success-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Success</button>
        <button type="button" className="text-white bg-danger box-border border border-transparent hover:bg-danger-strong focus:ring-4 focus:ring-danger-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Danger</button>
        <button type="button" className="text-white bg-warning box-border border border-transparent hover:bg-warning-strong focus:ring-4 focus:ring-warning-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Warning</button>
        <button type="button" className="text-white bg-dark box-border border border-transparent hover:bg-dark-strong focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Dark</button>
        <button type="button" className="text-heading bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Ghost</button>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto my-10 px-2">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for zinger, pizza..."
            className="w-full p-4 pl-10 rounded-full border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none shadow-sm dark:bg-gray-700 dark:text-white"
          />
          <span className="absolute left-4 top-4 text-gray-400">🔍</span>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <button onClick={() => setFilterOption("all")} className={`px-4 py-2 rounded-full shadow transition ${filterOption === "all" ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-orange-500 hover:text-white"}`}>All</button>
        <button onClick={() => setFilterOption("burgers")} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full shadow hover:bg-orange-500 hover:text-white transition">Burgers</button>
        <button onClick={() => setFilterOption("pizza")} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full shadow hover:bg-orange-500 hover:text-white transition">Pizza</button>
        <button onClick={() => setFilterOption("low-price")} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full shadow hover:bg-orange-500 hover:text-white transition">Cheapest First</button>
      </div>
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <button onClick={() => setFilterOption("top-rated")} className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full shadow hover:bg-yellow-500 hover:text-white transition">⭐ Top Rated</button>
        <button onClick={() => setFilterOption("drinks")} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full shadow hover:bg-orange-500 hover:text-white transition">Beverages</button>
      </div>

      {/* Price Sort Buttons */}
      <div className="flex flex-wrap justify-center gap-4 my-4">
        <button onClick={() => setFilterOption("low-price")} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-500 hover:text-white transition">Price: Low to High</button>
        <button onClick={() => setFilterOption("high-price")} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-500 hover:text-white transition">Price: High to Low</button>
      </div>

      {/* Menu Section */}
      <section className="p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Our Delicious Menu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">Price: Rs. {item.price}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Category: {item.category}</p>
                <p className="text-sm mb-3">Status: <span className={item.available ? "text-green-500 ml-1" : "text-red-500 ml-1"}>{item.available ? "Available" : "Not Available"}</span></p>
                <div className="flex gap-2">
                  <button onClick={() => openModal(item)} className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Edit</button>
                  <button onClick={() => deleteItem(item.id)} className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Summary Section */}
      <div className="m-5 p-5 bg-black text-white rounded">
        <h1 className="flex items-center text-2xl font-bold">Show Project Summary</h1>
        <h2 className="text-xl mt-4">Project Information</h2>
        <p><strong>Project Name:</strong> {projectInfo.name}</p>
        <p><strong>Total Items:</strong> {menuItems.length}</p>
        <p><strong>Status:</strong> {projectInfo.status}</p>
        <p><strong>Food Categories:</strong> {projectInfo.foods}</p>
        <p><strong>Developer:</strong> {projectInfo.developer}</p>

        <button onClick={displaySummary} className="inline-flex items-center justify-center px-3 py-2 mr-2 text-base font-medium text-center text-white rounded-lg bg-red-600 hover:bg-red-700 hover:shadow focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 mt-4">
          Show Project Summary
        </button>

        {showSummary && (
          <div className="mt-4 p-4 bg-gray-800 rounded">
            <h3 className="font-bold text-lg">Project Summary</h3>
            <p>Total Menu Items: {menuItems.length}</p>
            <p>Total Value: Rs. {menuItems.reduce((sum, item) => sum + item.price, 0)}</p>
            <p>Available Items: {menuItems.filter(item => item.available).length}</p>
            <p>Categories: {[...new Set(menuItems.map(item => item.category))].join(", ")}</p>
          </div>
        )}
      </div>

      {/* Search and Filter Dropdown */}
      <div className="max-w-4xl mx-auto mb-8 p-4 bg-gray-100 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-4">
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search food name..." className="flex-1 p-2 border rounded bg-white text-gray-900" />
          <select value={filterOption} onChange={(e) => setFilterOption(e.target.value)} className="p-2 border rounded bg-white text-gray-900">
            <option value="all">All Items</option>
            <option value="low-price">Price: Under Rs. 500</option>
            <option value="high-price">Price: Over Rs. 500</option>
            <option value="fast-food">Category: Fast Food</option>
            <option value="italian">Category: Italian</option>
            <option value="available">Status: Available</option>
          </select>
        </div>
      </div>

      {/* Mini Menu Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {filteredItems.slice(0, 4).map((item) => (
          <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h3 className="font-bold text-lg">{item.name}</h3>
            <p className="text-red-600 font-semibold">Rs. {item.price}</p>
            <p className="text-sm text-gray-500">{item.category}</p>
          </div>
        ))}
      </div>

      {/* Add Food Form */}
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md my-8">
        <h2 className="text-2xl font-bold mb-4 text-black">Add New Food Item</h2>
        <form onSubmit={addFoodItem} className="space-y-4">
          <input type="text" name="food-name" placeholder="Food Name" className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500" required />
          <input type="number" name="food-price" placeholder="Price (Rs.)" className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500" required />
          <select name="food-category" className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500">
            <option value="Fast Food">Fast Food</option>
            <option value="Italian">Italian</option>
            <option value="Snacks">Snacks</option>
            <option value="Sides">Sides</option>
            <option value="Beverages">Beverages</option>
          </select>
          <button type="submit" className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition duration-200">Add to Menu</button>
        </form>
      </div>

      {/* Edit Modal */}
      {showModal && editingItem && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Food Item</h2>
            <input type="hidden" id="edit-id" value={editingItem.id} />
            <input type="text" id="edit-name" defaultValue={editingItem.name} className="w-full p-2 border rounded mb-2 text-gray-900 bg-white" />
            <input type="number" id="edit-price" defaultValue={editingItem.price} className="w-full p-2 border rounded mb-2 text-gray-900 bg-white" />
            <div className="flex justify-end space-x-2 mt-4">
              <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
              <button onClick={updateItem} className="bg-green-600 text-white px-4 py-2 rounded">Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;