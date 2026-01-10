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

    // ✅ Serve from cache
    const cached = cache.get(q);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return res.json(cached.data);
    }

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=8&q=${encodeURIComponent(
      q
    )}&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    // ✅ Graceful quota handling
    if (data.error) {
      console.error("YouTube API error:", data.error);

      return res.json({
        items: [],
        quotaExceeded: true,
      });
    }

    // ✅ Cache success response
    cache.set(q, {
      data,
      timestamp: Date.now(),
    });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.json({
      items: [],
      serverError: true,
    });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running");
});
