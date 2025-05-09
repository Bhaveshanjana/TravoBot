import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";
import { GoogleGenAI } from "@google/genai";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.use(cors());
app.use(bodyParser.json());

// Function for making trip using ai
app.post("/api/plan-trip", async (req, res) => {
  const { destination, travelers, budget, days } = req.body;

  if (!destination || !travelers || !budget || !days) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const prompt = `
      Generate Travel plan for location ${destination} for ${travelers} person's 
      for ${days} with a budget of $${budget}.give me hotels option's list with hotel's name, hotel address, price, rating and description also suggest itinerary with place name,place details,ticket pricing,rating, time travel of each location for ${days} with each day plan with best time to visit.Give me a trip plan in the following Respond ONLY with a raw JSON object. Do not wrap it in markdown or code block formatting also give exactly — always include trip_details as an object with fields: location, duration, travelers, budget. hotel_options as an array in that array an object with fields: hotel_name, hotel_address, price_per_night, rating, description, itinerary as an array in that array an object with fields: day_1 as per user entered days,theme, plan as an array in that array an object with fields:place_name,place_details,ticket_pricing,time_travel,best_time_to_visit,rating,notes
    `;

    const result = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    const response = result.candidates[0].content.parts[0].text;
    res.status(200).json(response);
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ error: "Failed to generate trip plan" });
  }
});

const GOOGLE_API_URL = "https://places.googleapis.com/v1/places:searchText";
const API_KEY = process.env.GOOGLE_API_KEY;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// Function for getting actual image of trip's
app.post("/search-places", async (req, res) => {
  const { textQuery } = req.body;

  if (!textQuery) {
    return res.status(400).json({ error: "Query is required" });
  }
  const responses = [];
  try {
    for (const query of textQuery) {
      const apiRes = await axios.post(
        "https://places.googleapis.com/v1/places:searchText",
        { textQuery: query },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": process.env.GOOGLE_API_KEY,
            "X-Goog-FieldMask":
              "places.displayName,places.formattedAddress,places.photos",
          },
        }
      );

      responses.push({
        query,
        place: apiRes.data.places?.[0] || null,
      });

      // Wait 300ms before next request
      await delay(300);
    }

    res.status(200).json(responses);
  } catch (error) {
    console.error("Error fetching Google Places data:", error.message);
    res.status(500).json({ error: "Failed to fetch place data" });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
