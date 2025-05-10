import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  Sun,
  MapPin,
  Clock,
  Calendar,
  Users,
  DollarSign,
  Hotel,
  Star,
  Info,
} from "lucide-react";
import { useEffect, useState } from "react";
import DarkMode from "../components/Mode";
import { Compass } from "lucide-react";
import { toast } from "react-toastify";

function TripDetails() {
  const [imgUrl, setimgUrl] = useState();
  const [darkMode, setDarkMode] = useState();
  const [activeTab, setActiveTab] = useState("details");
  const location = useLocation();
  const trip = location.state?.trip;
  let clean = trip;

  // Remove Markdown code block markers even with extra newlines
  clean = clean.replace(/^\s*```json\s*/i, "").replace(/\s*```$/, "");

  // parse the cleaned JSON string
  const newtrip = JSON.parse(clean);

  if (!trip) return <p>No trip data found.</p>;

  useEffect(() => {
    photos();
  }, []);
  // function for getting image from backend and convert into url
  const photos = async () => {
    const data = {
      textQuery: [
        newtrip.trip_details?.location,
        ...(newtrip.hotel_options?.map((hotel) => hotel.hotel_name) || []),
        ...(newtrip.itinerary?.flatMap(
          (day) => day.plan?.map((place) => place.place_name) || []
        ) || []),
      ],
    };
    const PHOTO_REF_URL =
      "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=360&maxWidthPx=360&key=" +
      import.meta.env.VITE_GOOGLE_API_KEY;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/search-places`,
        data
      );

      const results = res.data;

      const imageResults = Array.isArray(results)
        ? results.map((item) => {
            const place = item.place || {};
            const photos = place.photos || [];

            // Try to get the 4th photo, fallback to 1st
            const photoName = photos[3]?.name || photos[0]?.name || photos[5]?.name;

            const photoUrl = photoName
              ? PHOTO_REF_URL.replace("{NAME}", photoName)
              : null;
            return photoUrl;
          })
        : [];
      setimgUrl(imageResults);
    } catch (error) {
      toast.error("Error fetching images", error);
    }
  };

  return (
    <>
      <div
        className={`min-h-screen transition-colors duration-300 ${
          darkMode ? "dark bg-gray-900" : "bg-gray-50"
        }`}
      >
        {" "}
        <nav className="dark:bg-gray-800 bg-white shadow-md">
          <div className="container mx-auto px-4 py-2 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-full dark:bg-blue-900/30 bg-red-100">
                <Compass className="h-6 w-6 dark:text-blue-400 text-red-500" />
              </div>
              <span className="text-xl font-bold dark:text-white">
                TravoBot
              </span>
            </div>
            <DarkMode />
          </div>
        </nav>
        <div className="container mx-auto px-4 py-8 dark:bg-gray-900 bg-gray-50 mt-5">
          {/* Featured image's */}
          <div className="mb-8">
            {imgUrl && imgUrl[0] && (
              <img
                src={imgUrl[0]}
                alt="Trip destination"
                className="w-full h-64 sm:h-80 md:h-96  rounded-xl shadow-md"
              />
            )}
          </div>

          {/* Tab navigation */}
          <div className="flex mb-6 border-b dark:border-gray-700">
            <button
              onClick={() => setActiveTab("details")}
              className={`py-2 px-4 font-medium text-sm cursor-pointer ${
                activeTab === "details"
                  ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              Trip Details
            </button>
            <button
              onClick={() => setActiveTab("hotels")}
              className={`py-2 px-4 font-medium text-sm cursor-pointer ${
                activeTab === "hotels"
                  ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              Hotel Options
            </button>
            <button
              onClick={() => setActiveTab("itinerary")}
              className={`py-2 px-4 font-medium text-sm cursor-pointer ${
                activeTab === "itinerary"
                  ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              Itinerary
            </button>
          </div>

          {/* Content based on active tab */}
          <div className="transition-all duration-300">
            {/* Trip Details */}
            {activeTab === "details" && (
              <div
                className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6  ${
                  darkMode ? "text-white" : "text-gray-700"
                }`}
              >
                <div className="flex items-center mb-4">
                  <MapPin className="mr-2 text-blue-500" size={24} />
                  <h2 className="text-2xl font-semibold">
                    Trip to {newtrip.trip_details.location}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Calendar className="text-blue-500 mr-3" size={20} />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        Duration
                      </p>
                      <p className="font-medium dark:text-gray-300">
                        {newtrip.trip_details.duration}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Users className="text-blue-500 mr-3" size={20} />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        Travelers
                      </p>
                      <p className="font-medium dark:text-gray-300">
                        {newtrip.trip_details.travelers}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <DollarSign className="text-blue-500 mr-3" size={20} />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        Budget
                      </p>
                      <p className="font-medium dark:text-gray-300">
                        {newtrip.trip_details.budget}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Hotel Options */}
            {activeTab === "hotels" && (
              <div
                className={`space-y-6 ${
                  darkMode ? "text-white" : "text-gray-700"
                }`}
              >
                <h2 className="text-2xl font-semibold flex items-center">
                  <Hotel className="mr-2 text-blue-500" size={24} />
                  Hotel Options
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 cursor-pointer">
                  {newtrip.hotel_options.map((hotel, index) => (
                    <div
                      key={index}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
                    >
                      <div className="h-40 bg-gray-200 dark:bg-gray-700">
                        {imgUrl && imgUrl[index + 1] && (
                          <img
                            src={imgUrl[index + 1]}
                            alt={hotel.hotel_name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2">
                          {hotel.hotel_name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                          {hotel.hotel_address}
                        </p>

                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center">
                            <Star
                              className="text-yellow-500 mr-1"
                              size={16}
                              fill="currentColor"
                            />
                            <span>{hotel.rating}</span>
                          </div>
                          <div className="font-bold text-blue-600 dark:text-blue-400">
                            ${hotel.price_per_night}/night
                          </div>
                        </div>

                        <p className="text-sm">{hotel.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Itinerary */}
            {activeTab === "itinerary" && (
              <div
                className={`space-y-8 ${
                  darkMode ? "text-white" : "text-gray-700"
                }`}
              >
                <h2 className="text-2xl font-semibold flex items-center">
                  <Calendar className="mr-2 text-blue-500" size={24} />
                  <span className="text-gray-700 dark:text-gray-300">
                    Itinerary
                  </span>
                </h2>

                {newtrip.itinerary.map((dayObj, dayIndex) => {
                  const [dayKey] = Object.keys(dayObj);
                  const dayPlan = dayObj[dayKey];

                  return (
                    <div key={dayIndex} className="mb-8">
                      <div className="flex items-center mb-4 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">
                          {dayIndex + 1}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                          {dayKey.replace("_", " ").toUpperCase()}:{" "}
                          {dayPlan.theme}
                        </h3>
                      </div>

                      <div className="space-y-6 pl-4 border-l-2 border-blue-200 dark:border-blue-800">
                        {dayPlan.plan.map((place, placeIndex) => (
                          <div
                            key={placeIndex}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 ml-4 relative"
                          >
                            {/* Timeline dot */}
                            <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-6 top-8 border-4 border-white dark:border-gray-900"></div>

                            <h4 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">
                              <span className="border-b-3 border-cyan-900 ">
                                Place-Name:
                              </span>{" "}
                              {place.place_name}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                              {place.place_details}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                              <div className="flex items-center">
                                <DollarSign
                                  className="text-green-500 mr-2"
                                  size={16}
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                  <span>Ticket: </span>${place.ticket_pricing}
                                </span>
                              </div>

                              <div className="flex items-center">
                                <Star
                                  className="text-yellow-500 mr-2"
                                  size={16}
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                  <span>Rating: </span>
                                  {place.rating}
                                </span>
                              </div>

                              <div className="flex items-center">
                                <Clock
                                  className="text-blue-500 mr-2"
                                  size={16}
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                  <span>Duration: </span>
                                  {place.time_travel}
                                </span>
                              </div>

                              <div className="flex items-center">
                                <Sun
                                  className="text-orange-500 mr-2"
                                  size={16}
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                  <span>Best Time To Visit: </span>
                                  {place.best_time_to_visit}
                                </span>
                              </div>
                            </div>

                            {place.notes && (
                              <div className="mt-4 flex items-start">
                                <Info
                                  className="text-blue-500 mr-2 flex-shrink-0 mt-1"
                                  size={16}
                                />
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                  Notes: {place.notes}
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TripDetails;
