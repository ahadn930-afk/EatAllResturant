import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, googleSignIn, resetPassword } from "../../firebase/authservice";
import { saveUserToFirestore } from "../../firebase/firestoreservice";

const SigninPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [resetMsg, setResetMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await loginUser(form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    try {
      const result = await googleSignIn();
      await saveUserToFirestore(result.user);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!form.email) {
      setError("Please enter your email first!");
      return;
    }
    try {
      await resetPassword(form.email);
      setResetMsg("Password reset email sent! Check your inbox.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <h1 className="flex justify-center text-3xl font-bold mt-8 dark:text-white">Sign In Here!</h1>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {resetMsg && <p className="text-green-500 text-center mt-4">{resetMsg}</p>}

      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 px-4">
        <div className="relative z-0 w-full mb-5 group">
          <input type="email" name="email" placeholder=" " value={form.email} onChange={handleChange} required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 dark:text-white bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer" />
          <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email Address</label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input type="password" name="password" placeholder=" " value={form.password} onChange={handleChange} required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 dark:text-white bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer" />
          <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
        </div>

        <button type="submit" disabled={loading}
          className="w-full text-white bg-red-600 hover:bg-black focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2.5 focus:outline-none transition">
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <button type="button" onClick={handleGoogle}
          className="w-full mt-3 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 dark:text-white dark:border-gray-600 font-medium rounded-lg text-sm px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
          Sign In with Google
        </button>

        <p onClick={handleForgotPassword}
          className="text-center mt-4 text-red-500 cursor-pointer hover:underline text-sm">
          Forgot Password?
        </p>

        <a href="/auth/register" className="flex justify-center mt-4 text-indigo-600 dark:text-indigo-400 text-base font-medium hover:underline">
          Don't have an account? Sign Up
        </a>
      </form>
    </div>
  );
};

export default SigninPage;