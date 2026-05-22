import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase/config";

const AdminDashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalUsers: 0, totalItems: 0, adminCount: 0, userCount: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const usersSnap = await getDocs(collection(db, "users"));
      const itemsSnap = await getDocs(collection(db, "menuItems"));
      const users = usersSnap.docs.map(d => d.data());
      setStats({
        totalUsers: users.length,
        totalItems: itemsSnap.size,
        adminCount: users.filter(u => u.role === "admin").length,
        userCount:  users.filter(u => u.role === "user").length,
      });
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-8">
      <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Welcome, {user?.displayName}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-red-50 dark:bg-gray-800 rounded-xl p-5 border border-red-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Users</p>
          <p className="text-3xl font-bold text-red-600">{stats.totalUsers}</p>
        </div>
        <div className="bg-red-50 dark:bg-gray-800 rounded-xl p-5 border border-red-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Admins</p>
          <p className="text-3xl font-bold text-red-600">{stats.adminCount}</p>
        </div>
        <div className="bg-red-50 dark:bg-gray-800 rounded-xl p-5 border border-red-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Normal Users</p>
          <p className="text-3xl font-bold text-red-600">{stats.userCount}</p>
        </div>
        <div className="bg-red-50 dark:bg-gray-800 rounded-xl p-5 border border-red-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Menu Items</p>
          <p className="text-3xl font-bold text-red-600">{stats.totalItems}</p>
        </div>
      </div>

      <div className="flex gap-4">
        <a href="/menu/create"
          className="bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-black transition font-medium">
          + Add Menu Item
        </a>
        <a href="/menu"
          className="border border-red-600 text-red-600 px-5 py-2.5 rounded-lg hover:bg-red-50 transition font-medium">
          View All Items
        </a>
      </div>
    </div>
  );
};

export default AdminDashboardPage;