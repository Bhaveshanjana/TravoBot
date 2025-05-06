import { ChevronsRight, Compass } from "lucide-react";
import Work from "../components/Work";
import Feature from "../components/Feature";
import DarkMode from "../components/Mode";
import { Link } from "react-router-dom";

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
          <div className="flex justify-center ">
            <Link to={"/Trip"} className="px-8 py-3 rounded-lg font-medium text-sm sm:text-lg  bg-white text-blue-600 hover:bg-gray-200 cursor-pointer flex items-center gap-2 transition-all duration-200">
              Get Started for Free
              <p>
                <ChevronsRight />
              </p>
            </Link>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <Feature />

      {/* How It Work Section */}
      <Work />

      {/* Footer */}
      <footer className="bg-gray-400/10 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-2 mt-6 mb-2 mx-6 rounded-lg shadow-2xl">
        <div className=" text-sm text-center text-gray-800 dark:text-gray-400">
          &copy; {new Date().getFullYear()} TravoBot. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
