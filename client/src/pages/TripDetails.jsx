import { useLocation } from "react-router-dom";
import axios from "axios";

function TripDetails() {
  const location = useLocation();
  const trip = location.state?.trip;
  let clean = trip;

  // Remove Markdown code block markers even with extra newlines
  clean = clean.replace(/^\s*```json\s*/i, "").replace(/\s*```$/, "");

  // parse the cleaned JSON string
  const newtrip = JSON.parse(clean);

  if (!trip) return <p>No trip data found.</p>;

  // function for getting image from backend and convert into url
  const photos = async () => {
    const data = {
      textQuery: newtrip.trip_details?.location,
    };
    const PHOTO_REF_URL =
      "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=360&maxWidthPx=360&key=" +
      import.meta.env.VITE_GOOGLE_API_KEY;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/search-places`,
        data
      );
      // console.log(res.data.places[0].photos[3].name);
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        res.data.places[0].photos[3].name
      );
      console.log(PhotoUrl);
    } catch (error) {
      console.log(error);
    }
  };
  photos();
  return (
    <>
      <div style={{ padding: "20px" }}>
        <h2>Trip to {newtrip.trip_details?.location}</h2>
        <p>Duration: {newtrip.trip_details?.duration}</p>
        <p>Travelers: {newtrip.trip_details?.travelers}</p>
        <p>Budget: {newtrip.trip_details?.budget}</p>

        <h3>Hotel Options:</h3>
        <ul>
          {newtrip.hotel_options?.map((hotel, i) => (
            <li key={i}>
              <h4>{hotel.hotel_name}</h4>
              <p>{hotel.hotel_address}</p>
              <p>${hotel.price_per_night} per night</p>
              <p>Rating: {hotel.rating}</p>
              <p>{hotel.description}</p>
            </li>
          ))}
        </ul>

        <h3>Itinerary:</h3>
        {newtrip.itinerary?.map((dayObj, i) => {
          const [dayKey] = Object.keys(dayObj);
          const dayPlan = dayObj[dayKey];
          return (
            <div key={i}>
              <h4>
                {dayKey.replace("_", " ").toUpperCase()}: {dayPlan.theme}
              </h4>
              <ul>
                {dayPlan.plan.map((place, j) => (
                  <li key={j}>
                    <h5>{place.place_name}</h5>
                    <p>{place.place_details}</p>
                    <p>Ticket: ${place.ticket_pricing}</p>
                    <p>Rating: {place.rating}</p>
                    <p>Time: {place.time_travel}</p>
                    <p>Best Time: {place.best_time_to_visit}</p>
                    <p>Notes: {place.notes}</p>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default TripDetails;
