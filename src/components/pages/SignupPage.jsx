import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, updateUserProfile } from "../../firebase/authservice";
import { saveUserToFirestore } from "../../firebase/firestoreservice";

const SignupPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      const userCredential = await registerUser(form.email, form.password);
      await updateUserProfile(`${form.firstName} ${form.lastName}`);
      await saveUserToFirestore(userCredential.user, {
        name: `${form.firstName} ${form.lastName}`,
      });
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <h1 className="flex justify-center text-3xl font-bold mt-8 dark:text-white">Sign Up Here!</h1>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 px-4">
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input type="text" name="firstName" placeholder=" " value={form.firstName} onChange={handleChange} required
              className="block py-2.5 px-0 w-full text-sm text-gray-900 dark:text-white bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer" />
            <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First Name</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input type="text" name="lastName" placeholder=" " value={form.lastName} onChange={handleChange} required
              className="block py-2.5 px-0 w-full text-sm text-gray-900 dark:text-white bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer" />
            <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last Name</label>
          </div>
        </div>

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

        <div className="relative z-0 w-full mb-5 group">
          <input type="password" name="confirmPassword" placeholder=" " value={form.confirmPassword} onChange={handleChange} required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 dark:text-white bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer" />
          <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password</label>
        </div>

        <button type="submit" disabled={loading}
          className="w-full text-white bg-red-600 hover:bg-black focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2.5 focus:outline-none transition">
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        <a href="/auth/login" className="flex justify-center mt-4 text-indigo-600 dark:text-indigo-400 text-base font-medium hover:underline">
          Already have an account? Sign In
        </a>
      </form>
    </div>
  );
};

export default SignupPage;