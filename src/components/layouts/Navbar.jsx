import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../firebase/authservice";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/auth/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="flex items-center justify-between w-full h-12 bg-red-600 text-white p-2">
      <button className="bg-red-600 p-2 list-none rounded hover:bg-gray-800">
        <Link to="/">
          <li>Eat All</li>
        </Link>
      </button>

      <div className="flex gap-10 list-none">
        <Link to="/"><li className="hover:text-black">Home</li></Link>
        <Link to="/about"><li className="hover:text-black">About</li></Link>
        <Link to="/contact"><li className="hover:text-black">Contact Us</li></Link>
        <Link to="/menu"><li className="hover:text-black">Menu</li></Link>
        {user && <Link to="/menu/create"><li className="hover:text-black">Add Item</li></Link>}
      </div>

      <div className="flex gap-5 list-none items-center">
        {user ? (
          <>
            <span className="text-sm font-medium">
              👋 {user.displayName || user.email}
            </span>
            <button onClick={handleLogout}
              className="bg-white text-red-600 px-3 py-1 rounded font-medium hover:bg-gray-200 transition text-sm">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/auth/login"><li className="hover:text-black">Sign In</li></Link>
            <Link to="/auth/register"><li className="hover:text-black">Sign Up</li></Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;