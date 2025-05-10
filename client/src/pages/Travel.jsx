import { useState, useEffect } from "react";
import {
  Compass,
  PlaneTakeoff,
  Users,
  User,
  Heart,
  DollarSign,
} from "lucide-react";
import DarkMode from "../components/Mode";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function TripGeneratorForm() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
  const [travelers, setTravelers] = useState("");
  const [formValid, setFormValid] = useState(false);

  const navigate = useNavigate();

  // Popular destinations list
  const popularDestinations = [
    "Paris, France",
    "Tokyo, Japan",
    "New York, USA",
    "Rome, Italy",
    "Bali, Indonesia",
    "London, UK",
    "Sydney, Australia",
    "Barcelona, Spain",
    "Bangkok, Thailand",
    "Cape Town, South Africa",
  ];

  // Form validation
  useEffect(() => {
    if (destination && days && budget && travelers) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [destination, days, budget, travelers]);

  // Getting trip data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.info("Generating trip, please wait...", {
      autoClose: false, 
      closeOnClick: false, 
      draggable: false,
    });
    const newTrip = {
      destination: destination,
      days: days,
      budget: budget,
      travelers: travelers,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/plan-trip`,
        newTrip
      );
      const tripData = res.data;
      toast.dismiss(toastId);
      toast.success("Trip generated successfully !");
      navigate("/trip-detail", { state: { trip: tripData } });
    } catch (error) {
      toast.error("Faild to generate trip");
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900 dark:text-white bg-gray-50 text-gray-900">
      {/* Navigation */}
      <nav className="dark:bg-gray-800 bg-white shadow-md">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-full dark:bg-blue-900/30 bg-red-100">
              <Compass className="h-6 w-6 dark:text-blue-400 text-red-500" />
            </div>
            <span className="text-xl font-bold">TravoBot</span>
          </div>
          <DarkMode />
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="rounded-xl dark:bg-gray-800 bg-white shadow-lg p-6 md:p-8 ">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-2 rounded-full dark:bg-blue-900/30 bg-red-100 ">
              <PlaneTakeoff className="h-6 w-6 dark:text-blue-400 text-red-500" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Tell us your travel preferences{" "}
            </h1>
          </div>

          <p className="mb-8 dark:text-gray-300 text-gray-600">
            Just provide some basic information, and our trip planner will
            generate a customized itinerary based on your preferences.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Destination */}
            <div>
              <label
                htmlFor="destination"
                className="block text-lg font-medium mb-2"
              >
                What is destination of choice?
              </label>
              <div className="relative">
                <select
                  id="destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="cursor-pointer w-full p-3 pr-10 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 bg-white border-gray-300 focus:border-red-500 focus:outline-none focus:ring-2 dark:focus:ring-blue-500/50 focus:ring-red-500/50"
                >
                  <option value="" disabled>
                    Select...
                  </option>
                  {popularDestinations.map((dest) => (
                    <option key={dest} value={dest}>
                      {dest}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Duration */}
            <div>
              <label htmlFor="days" className="block text-lg font-medium mb-2">
                How many days are you planning your trip?
              </label>
              <input
                type="number"
                id="days"
                min="1"
                max="30"
                placeholder="Ex: 3"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 bg-white border-gray-300 focus:border-red-500 focus:outline-none focus:ring-2 dark:focus:ring-blue-500/50 focus:ring-red-500/50"
              />
            </div>

            {/* Budget */}
            <div>
              <h3 className="text-lg font-medium mb-3">What is Your Budget?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div
                  className={`cursor-pointer rounded-xl p-4 border-2 transition-all duration-200 flex flex-col items-center hover:shadow-xl shadow-gray-600 dark:hover:shadow-lg ${
                    budget === "Cheap"
                      ? DarkMode
                        ? "border-blue-500 bg-blue-900/20"
                        : "border-red-500 bg-red-50"
                      : DarkMode
                      ? "border-gray-700 hover:border-gray-600"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setBudget("Cheap")}
                >
                  <div className="mb-3 p-3 rounded-full dark:bg-green-900/30 bg-green-100">
                    <DollarSign className="h-6 w-6 dark:text-green-400 text-green-600" />
                  </div>
                  <h4 className="font-bold">Cheap</h4>
                  <p className="text-sm text-center dark:text-gray-400 text-gray-500">
                    Stay conscious of costs
                  </p>
                </div>

                <div
                  className={`cursor-pointer rounded-xl p-4 border-2 transition-all duration-200 flex flex-col items-center hover:shadow-xl shadow-gray-600 dark:hover:shadow-lg ${
                    budget === "moderate"
                      ? DarkMode
                        ? "border-blue-500 bg-blue-900/20"
                        : "border-red-500 bg-red-50"
                      : DarkMode
                      ? "border-gray-700 hover:border-gray-600"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setBudget("moderate")}
                >
                  <div className="mb-3 p-3 rounded-full dark:bg-yellow-900/30 bg-yellow-600">
                    <div className="h-6 w-6 flex items-center justify-center">
                      <span className="text-xl dark:text-yellow-400 text-yellow-600">
                        💰
                      </span>
                    </div>
                  </div>
                  <h4 className="font-bold">Moderate</h4>
                  <p className="text-sm text-center dark:text-gray-400 text-gray-500">
                    Keep cost on the average side
                  </p>
                </div>

                <div
                  className={`cursor-pointer rounded-xl p-4 border-2 transition-all duration-200 flex flex-col items-center hover:shadow-xl shadow-gray-600 dark:hover:shadow-lg ${
                    budget === "luxury"
                      ? DarkMode
                        ? "border-blue-500 bg-blue-900/20"
                        : "border-red-500 bg-red-50"
                      : DarkMode
                      ? "border-gray-700 hover:border-gray-600"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setBudget("luxury")}
                >
                  <div className="mb-3 p-3 rounded-full dark:bg-purple-900/30 bg-purple-100">
                    <div className="h-6 w-6 flex items-center justify-center">
                      <span className="text-xl dark:text-purple-400 text-purple-600">
                        💎
                      </span>
                    </div>
                  </div>
                  <h4 className="font-bold">Luxury</h4>
                  <p className="text-sm text-center dark:text-gray-400 text-gray-500">
                    Don't worry about cost
                  </p>
                </div>
              </div>
            </div>

            {/* Travelers */}
            <div>
              <h3 className="text-lg font-medium mb-3">
                Who do you plan on traveling with on your next adventure?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div
                  className={`cursor-pointer rounded-xl p-4 border-2 transition-all duration-200 flex flex-col items-center hover:shadow-xl shadow-gray-600 dark:hover:shadow-lg ${
                    travelers === "solo"
                      ? DarkMode
                        ? "border-blue-500 bg-blue-900/20"
                        : "border-red-500 bg-red-50"
                      : DarkMode
                      ? "border-gray-700 hover:border-gray-400"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setTravelers("solo")}
                >
                  <div className="mb-3 p-3 rounded-full dark:bg-blue-900/30 bg-blue-100">
                    <User className="h-6 w-6 dark:text-blue-400 text-blue-600" />
                  </div>
                  <h4 className="font-bold">Just Me</h4>
                  <p className="text-sm text-center dark:text-gray-400 text-gray-500">
                    A solo traveler in exploration
                  </p>
                </div>

                <div
                  className={`cursor-pointer rounded-xl p-4 border-2 transition-all duration-200 flex flex-col items-center hover:shadow-xl shadow-gray-600 dark:hover:shadow-lg ${
                    travelers === "couple"
                      ? DarkMode
                        ? "border-blue-500 bg-blue-900/20"
                        : "border-red-500 bg-red-50"
                      : DarkMode
                      ? "border-gray-700 hover:border-gray-600"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setTravelers("couple")}
                >
                  <div className="mb-3 p-3 rounded-full dark:bg-pink-900/30 bg-pink-100">
                    <Heart className="h-6 w-6 dark:text-pink-400 text-pink-600" />
                  </div>
                  <h4 className="font-bold">A Couple</h4>
                  <p className="text-sm text-center dark:text-gray-400 text-gray-500">
                    Two travelers in tandem
                  </p>
                </div>

                <div
                  className={`cursor-pointer rounded-xl p-4 border-2 transition-all duration-200 flex flex-col items-center hover:shadow-xl shadow-gray-600 dark:hover:shadow-lg ${
                    travelers === "family"
                      ? DarkMode
                        ? "border-blue-500 bg-blue-900/20"
                        : "border-red-500 bg-red-50"
                      : DarkMode
                      ? "border-gray-700 hover:border-gray-600"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setTravelers("family")}
                >
                  <div className="mb-3 p-3 rounded-full dark:bg-green-900/30 bg-green-100">
                    <div className="h-6 w-6 flex items-center justify-center">
                      <span className="text-xl dark:text-green-40 text-green-600">
                        🏠
                      </span>
                    </div>
                  </div>
                  <h4 className="font-bold">Family</h4>
                  <p className="text-sm text-center dark:text-gray-400 text-gray-500">
                    A group of fun loving adventurers
                  </p>
                </div>

                <div
                  className={`cursor-pointer rounded-xl p-4 border-2 transition-all duration-200 flex flex-col items-center hover:shadow-xl shadow-gray-600 dark:hover:shadow-lg ${
                    travelers === "friends"
                      ? DarkMode
                        ? "border-blue-500 bg-blue-900/20"
                        : "border-red-500 bg-red-50"
                      : DarkMode
                      ? "border-gray-700 hover:border-gray-600"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setTravelers("friends")}
                >
                  <div className="mb-3 p-3 rounded-full dark:bg-orange-900/30 bg-orange-100">
                    <Users className="h-6 w-6 dark:text-orange-400 text-orange-600" />
                  </div>
                  <h4 className="font-bold">Friends</h4>
                  <p className="text-sm text-center dark:text-gray-400 text-gray-500">
                    A bunch of thrill seekers
                  </p>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={!formValid}
                className={`w-full sm:w-auto px-6 py-3 rounded-lg font-medium text-white transition-colors sm:float-end -translate-y-7  hover:transition-all duration-200 ${
                  formValid
                    ? DarkMode
                      ? "bg-blue-600 hover:bg-blue-500 cursor-pointer"
                      : "bg-red-500 hover:bg-red-600"
                    : DarkMode
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Generate Trip
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
