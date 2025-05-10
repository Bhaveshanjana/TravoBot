# 🌍 TravoBot - Powered by Gemini AI

**TravoBot** is a smart, fully responsive travel planning web application that leverages **Gemini AI** to create personalized travel itineraries. Users can input their preferences like destination, budget, number of people, and travel companions. The app then generates a detailed, day-by-day travel plan including hotel suggestions, destination highlights, ticket costs, travel times, safety tips, and more.

## ✨ Features

- 🌐 **AI Integration (Gemini AI)**: Smart travel plan generation based on user preferences.
- 📱 **Responsive Design**: Optimized for mobile, tablet, and desktop.
- 🌗 **Dark/Light Mode Switcher**: Toggle between dark and light themes seamlessly.
- 🧠 **AI-Generated Travel Plan**:
  - Hotel suggestions with names, ratings, and pricing.
  - Per-day itinerary with:
    - Destinations to visit
    - Detailed information about each destination
    - Ticket prices
    - Time taken from hotel to each destination
    - Ratings
    - Best time to visit
    - Safety notes

### 📝 Notes
``Ensure you have a valid API key for both Google Places and Gemini AI.
This is a prototype/demo and should be enhanced with error handling, caching,
and authentication for production use also upgrade with future updates.``

### 💡 Future Improvements

- User authentication & saved itineraries
- Google Search for destination's
- Booking integration (hotels, tickets)
- Multi-language support
- Offline access to itineraries
- Map integration for route planning

### 🧠 How It Works
1. User inputs travel preferences.
2. Gemini AI processes the data and generates a detailed trip.
3. Express.js backend handles API integration and communication with Gemini.
4. Google Places API take "Destination,hotel name for image" in fronted and generate image url.
5. Frontend renders a beautiful, responsive UI for the trip details.

## 🛠 Tech Stack

| Technology    | Description                            |
|---------------|----------------------------------------|
| React         | Frontend framework                     |
| Tailwind CSS  | Styling and layout                     |
| Express.js    | Backend web framework                  |
| Node.js       | Server-side runtime environment        |
| Google Places API | Fetching destination images url    |
| Gemini AI     | Generating trip data                   |


## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Bhaveshanjana/TravoBot
cd TravoBot
 
```
### 2.Set up for Backend & Frontend
```
cd server
npm install

cd client 
npm install
```
### 3. Setup environment variables

```
Setup environment variables using-- 

.env.example

```
### 4. Run the development server

#### In one terminal
- cd client
- npm run dev

#### In another terminal
- cd server
- npx nodemon

---


## 💬 Contact
  For any feedback, suggestions or collaborations: 📧 [bhaveshanjana58@gmail.com]
