import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import HomePage from "./components/pages/HomePage";
import AboutPage from "./components/pages/AboutPage";
import ContactPage from "./components/pages/ContactPage";
import SigninPage from "./components/pages/SigninPage";
import SignupPage from "./components/pages/SignupPage";
import PageNotFound from "./components/pages/PageNotFound";
import CreateItemPage from "./components/pages/createitempage";
import ViewAllItemsPage from "./components/pages/viewallitemspage";
import ViewSingleItemPage from "./components/pages/viewsingleitempage";
import EditItemPage from "./components/pages/edititempage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/auth/login" element={<SigninPage />} />
        <Route path="/auth/register" element={<SignupPage />} />
        <Route path="/menu" element={<ViewAllItemsPage />} />
        <Route path="/menu/create" element={<CreateItemPage />} />
        <Route path="/menu/:id" element={<ViewSingleItemPage />} />
        <Route path="/menu/edit/:id" element={<EditItemPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;