import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.use(cors());
app.use(bodyParser.json());

app.post("/api/plan-trip", async (req, res) => {
  const { destination, travelers, budget, days } = req.body;

  if (!destination || !travelers || !budget || !days) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const prompt = `
      Generate Travel plan for location ${destination} for ${travelers} person(s) 
      for ${days} days with a budget of $${budget}.give me hotels option's list with hotel name, hotel address, price, rating and description also suggest itinerary with place name,place details,ticket pricing,rating, time travel of each location for ${days} with each day plan with best time to visit in JSON formate
    `;

    const result = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    const response = await result.candidates[0].content.parts[0].text;
    console.log(response);
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ error: "Failed to generate trip plan" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
