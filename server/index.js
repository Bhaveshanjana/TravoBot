import express from "express";
import dotenv from "dotenv"
import bodyParser from "body-parser";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
dotenv.config()
const PORT = process.env.PORT || 5000;

const GEMINI_API_KEY = "GEMINI_API_KEY";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

app.use(cors());
app.use(bodyParser.json());

app.post("/api/plan-trip", async (req, res) => {
  const { destination, people, budget, days } = req.body;

  if (!destination || !people || !budget || !days) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      Generate Travel plan for location ${destination} for ${people} person(s) 
      for ${days} days with a budget of $${budget}.give me hotels option's list with hotel name, hotel address, price, rating and description also suggest itinerary with place name,place details,ticket pricing,rating, time travel of each location for ${days} with each day plan with best time to visit in JSON formate
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    res.json({ tripPlan: response });
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ error: "Failed to generate trip plan" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
