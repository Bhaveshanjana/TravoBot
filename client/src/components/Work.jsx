import React from "react";

const Work = () => {
  return (
    <div>
      <section
        id="how-it-works"
        className="py-16 px-4 md:px-0 mx-6 rounded-xl dark:bg-gray-800 bg-gray-100"
      >
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-9">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 dark:bg-blue-900/50 dark:text-blue-400 bg-blue-500 text-white">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Tell Us Your Plan</h3>
              <p className="dark:text-gray-300 text-gray-600">
                Share your destination, dates, interests, and budget.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 dark:bg-blue-900/50 dark:text-blue-400 bg-blue-500 text-white">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                AI Creates Itinerary
              </h3>
              <p className="dark:text-gray-300 text-gray-600">
                Our AI crafts a personalized plan based on your preferences.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 dark:bg-blue-900/50 dark:text-blue-400 bg-blue-500 text-white">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Refine Your Trip</h3>
              <p className="dark:text-gray-300 text-gray-600">
                Fine-tune your itinerary with easy adjustments and feedback.
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 dark:bg-blue-900/50 dark:text-blue-400 bg-blue-500 text-white">
                <span className="text-xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Enjoy Your Trip</h3>
              <p className="dark:text-gray-300 text-gray-600">
                Access your itinerary anytime, anywhere during your travels.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Work;
