// src/components/pages/pagenotfound.jsx
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center py-12 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-red-600">404</h1>
        <h2 className="text-4xl font-semibold mt-4 text-gray-900 dark:text-white">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-block mt-6 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-200"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;