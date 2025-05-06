import { Compass, Calendar, Navigation } from "lucide-react";

const Feature = () => {
  return (
    <div>
      <section
        id="features"
        className="py-16 px-4 md:px-6 dark:bg-gray-900 bg-white transition-colors duration-300"
      >
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Intelligent Travel Planning
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-xl dark:bg-gray-800 bg-blue-50">
              <div className="p-3 rounded-full  dark:bg-blue-900/50 bg-blue-100 inline-block mb-4">
                <Compass className="h-7 w-7 dark:text-blue-400 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Personalized Itineraries
              </h3>
              <p className="dark:text-gray-300 text-gray-600">
                Our AI analyzes your preferences, budget, and travel style to
                create the perfect itinerary tailored just for you.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-xl dark:bg-gray-800 bg-blue-50">
              <div className="p-3 rounded-full dark:bg-blue-900/50 bg-blue-100 inline-block mb-4 ">
                <Calendar className="h-7 w-7 dark:text-blue-400 text-blue-600 " />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Scheduling</h3>
              <p className="dark:text-gray-300 text-gray-600 ">
                Optimize your time with intelligently scheduled activities that
                minimize travel time and maximize experiences.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-xl dark:bg-gray-800 bg-blue-50">
              <div className="p-3 rounded-full dark:bg-blue-900/50 bg-blue-100 inline-block mb-4 ">
                <Navigation className="h-7 w-7 dark:text-blue-400 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Local Insights</h3>
              <p className="dark:text-gray-300 text-gray-600 ">
                Discover hidden gems and authentic experiences with
                recommendations from our AI.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Feature;
