import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase/config";

const UserDashboardPage = () => {
  const { user } = useAuth();
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchItems = async () => {
      const snap = await getDocs(collection(db, "menuItems"));
      setTotalItems(snap.size);
    };
    fetchItems();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-8">
      <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Welcome, {user?.displayName}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-red-50 dark:bg-gray-800 rounded-xl p-5 border border-red-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Menu Items</p>
          <p className="text-3xl font-bold text-red-600">{totalItems}</p>
        </div>
        <div className="bg-red-50 dark:bg-gray-800 rounded-xl p-5 border border-red-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">My Email</p>
          <p className="text-lg font-medium text-red-600">{user?.email}</p>
        </div>
      </div>

      <a href="/menu"
        className="bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-black transition font-medium">
        Browse Menu
      </a>
    </div>
  );
};

export default UserDashboardPage;