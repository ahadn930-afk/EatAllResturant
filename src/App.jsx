import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import ProtectedRoute from "./components/layouts/ProtectedRoute";
import HomePage from "./components/pages/HomePage";
import AboutPage from "./components/pages/AboutPage";
import ContactPage from "./components/pages/ContactPage";
import SigninPage from "./components/pages/SigninPage";
import SignupPage from "./components/pages/SignupPage";
import PageNotFound from "./components/pages/pagenotfound";
import CreateItemPage from "./components/pages/createitempage";
import ViewAllItemsPage from "./components/pages/viewallitemspage";
import ViewSingleItemPage from "./components/pages/viewsingleitempage";
import EditItemPage from "./components/pages/edititempage";
import AdminDashboardPage from "./components/pages/AdminDashboardPage";
import UserDashboardPage from "./components/pages/UserDashboardPage";
import ChatPage from "./components/pages/ChatPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/auth/login" element={<SigninPage />} />
        <Route path="/auth/register" element={<SignupPage />} />
        <Route path="/menu" element={<ViewAllItemsPage />} />
        <Route path="/menu/:id" element={<ViewSingleItemPage />} />

        {/* Admin Only Routes */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/menu/create" element={
          <ProtectedRoute requiredRole="admin">
            <CreateItemPage />
          </ProtectedRoute>
        } />
        <Route path="/menu/edit/:id" element={
          <ProtectedRoute requiredRole="admin">
            <EditItemPage />
          </ProtectedRoute>
        } />

        {/* Authenticated User Routes */}
        <Route path="/user/dashboard" element={
          <ProtectedRoute>
            <UserDashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/chat" element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        } />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;