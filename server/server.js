// server/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.YOUTUBE_API_KEY;

app.use(cors());

if (!API_KEY) {
  console.error("❌ Missing YOUTUBE_API_KEY in .env");
  process.exit(1);
}

app.get("/videos", async (req, res) => {
  const query = req.query.q || "movie trailers";
  const pageToken = req.query.pageToken || "";

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        query
      )}&type=video&maxResults=10&pageToken=${pageToken}&key=${API_KEY}`
    );

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch videos",
      details: err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
