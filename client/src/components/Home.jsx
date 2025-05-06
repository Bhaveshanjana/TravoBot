import { Compass } from "lucide-react";
import Work from "./Work";
import Feature from "./Feature";
import DarkMode from "./Mode";

export default function LandingPage() {
  return (
    <div
      className=" min-h-screen flex flex-col transition-colors duration-300 
        dark:bg-gray-900 dark:text-white bg-gray-50 text-gray-900"
    >
      {/* Navigation */}
      <nav className="sticky top-0 z-10 dark:bg-gray-800 bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Compass className="h-8 w-8  dark:text-blue-400 text-blue-600 " />
            <span className="text-xl font-bold">TravoBot</span>
          </div>

          {/* DarkMode  */}

          <DarkMode />
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-16 pb-16 px-4 md:px-0 mt-20 mx-6 rounded-xl dark:bg-gray-800 bg-blue-50">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Planning Your Dream Trip Today
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Join thousands of happy travelers who have discovered the easiest
            way to plan unforgettable trips.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 ">
            <button className="px-8 py-3 rounded-lg font-medium text-lg bg-white text-blue-600 hover:bg-gray-200 cursor-pointer">
              Get Started for Free
            </button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <Feature />

      {/* How It Works */}
      <Work />

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-2 mt-6 mx-6 rounded-xl">
        <div className="container mx-auto  ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div>
              <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
              <p>
                Email:{" "}
                <a
                  href="mailto:info@travobot.com"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  info@travobot.com
                </a>
              </p>
              <p>
                Phone:{" "}
                <a href="tel:+1234567890" className="hover:underline">
                  +1 (234) 567-890
                </a>
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Address</h3>
              <p>TravoBot HQ</p>
              <p>123 Travel Street</p>
              <p>Adventure City, Earth 00000</p>
            </div>
          </div>
          <div className="mt-6 text-sm text-center text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} TravoBot. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
