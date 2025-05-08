import React from "react";
import { useLocation } from "react-router-dom";

function TripDetails() {
  const location = useLocation();
  const trip = location.state?.trip;
  // console.log(trip);
  let clean = trip;

  // Remove Markdown code block markers even with extra newlines
  clean = clean
    .replace(/^\s*```json\s*/i, "") 
    .replace(/\s*```$/, ""); 

  // Now parse the cleaned JSON string
  const newtrip = JSON.parse(clean);
  console.log(newtrip);

  if (!trip) return <p>No trip data found.</p>;

  return (
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
  );
}

export default TripDetails;
