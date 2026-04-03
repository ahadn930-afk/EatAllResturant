// src/components/pages/AboutPage.jsx

const AboutPage = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 min-h-screen">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Welcome to Eat All Restaurant</h2>
          <p className="text-lg mb-4">
            At Eat All, we believe that good food brings people together. 
            Our mission is to serve delicious, high-quality meals that satisfy 
            your cravings and make every dining experience memorable.
          </p>
          <p className="text-lg mb-4">
            Established in 2024, we have been serving the community with 
            authentic flavors, fresh ingredients, and exceptional service.
          </p>
          <h3 className="text-xl font-semibold mt-6 mb-3">Our Values</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Quality ingredients sourced locally</li>
            <li>Exceptional customer service</li>
            <li>Clean and welcoming environment</li>
            <li>Affordable prices for everyone</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;