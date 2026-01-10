import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

// 🔥 SIMPLE IN-MEMORY CACHE
const cache = new Map();
const CACHE_TTL = 1000 * 60 * 30; // 30 minutes

app.get("/videos", async (req, res) => {
  try {
    const q = req.query.q;
    if (!q) return res.status(400).json({ error: "Missing query" });

    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "YouTube API key missing" });
    }

    // ✅ Return cached result if exists
    const cached = cache.get(q);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return res.json(cached.data);
    }

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=8&q=${encodeURIComponent(
      q
    )}&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      return res.status(403).json({
        error: "YouTube quota exceeded or API error",
        details: data.error,
      });
    }

    // ✅ Save to cache
    cache.set(q, {
      data,
      timestamp: Date.now(),
    });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running");
});
