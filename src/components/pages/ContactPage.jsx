// src/components/pages/ContactPage.jsx
const ContactPage = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="flex flex-col items-center justify-center min-h-screen">
        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold dark:text-white">Contact Us</h1>
        </div>

        {/* Form */}
        <form
          action="https://formspree.io/f/xnjglzkb"
          method="POST"
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-80 flex flex-col gap-4"
        >
          <label className="dark:text-gray-200">
            Your email:
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              className="w-full border dark:border-gray-600 p-2 rounded dark:bg-gray-700 dark:text-white mt-1"
              required
            />
          </label>
          <label className="dark:text-gray-200">
            Your message:
            <textarea
              name="Message"
              placeholder="Enter Your Message"
              rows="4"
              className="w-full border dark:border-gray-600 p-2 rounded resize-none dark:bg-gray-700 dark:text-white mt-1"
              required
            />
          </label>
          <button
            type="submit"
            className="bg-red-600 text-white p-2 rounded hover:bg-black transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;