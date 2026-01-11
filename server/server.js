import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const cache = new Map();
const CACHE_TTL = 1000 * 60 * 60 * 12; // 12 hours

const FALLBACK_VIDEOS = {
  hero: [{ id: "dQw4w9WgXcQ", title: "Rick Astley - Never Gonna Give You Up", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" }],
  trending: [{ id: "3JZ_D3ELwOQ", title: "Sample Trailer 1", thumbnail: "https://img.youtube.com/vi/3JZ_D3ELwOQ/maxresdefault.jpg" }],
  action: [{ id: "L_jWHffIx5E", title: "Sample Action Trailer", thumbnail: "https://img.youtube.com/vi/L_jWHffIx5E/maxresdefault.jpg" }],
  cartoon: [{ id: "VbfpW0pbvaU", title: "Sample Cartoon Trailer", thumbnail: "https://img.youtube.com/vi/VbfpW0pbvaU/maxresdefault.jpg" }],
  african: [{ id: "9bZkp7q19f0", title: "Sample African Trailer", thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg" }],
  tvseries: [{ id: "hY7m5jjJ9mM", title: "Sample TV Series Trailer", thumbnail: "https://img.youtube.com/vi/hY7m5jjJ9mM/maxresdefault.jpg" }]
};

const QUERIES = {
  hero: "trending movie trailers",
  trending: "latest movie trailers",
  action: "action movie trailers",
  cartoon: "cartoon movie trailers",
  african: "african movie trailers",
  tvseries: "trending TV series",
};

app.get("/homepage", async (req, res) => {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "YouTube API key missing" });

    const cached = cache.get("homepage");
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return res.json(cached.data);
    }

    const results = await Promise.all(
      Object.entries(QUERIES).map(async ([key, query]) => {
        try {
          const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=8&q=${encodeURIComponent(query)}&key=${apiKey}`;
          const response = await fetch(url);
          const data = await response.json();

          if (data?.error?.errors?.[0]?.reason === "quotaExceeded" || !data.items) {
            return [key, FALLBACK_VIDEOS[key] || []];
          }

          const items =
            data.items
              .filter((item) => item.id?.videoId)
              .map((item) => ({
                id: item.id.videoId,
                title: item.snippet.title,
                thumbnail:
                  item.snippet.thumbnails?.maxres?.url ||
                  item.snippet.thumbnails?.high?.url ||
                  item.snippet.thumbnails?.medium?.url,
              })) || [];

          return [key, items.length > 0 ? items : (FALLBACK_VIDEOS[key] || [])];
        } catch (err) {
          console.error(err);
          return [key, FALLBACK_VIDEOS[key] || []];
        }
      })
    );

    const homepageData = Object.fromEntries(results);
    cache.set("homepage", { data: homepageData, timestamp: Date.now() });

    res.json(homepageData);
  } catch (err) {
    console.error(err);
    res.json(FALLBACK_VIDEOS);
  }
});

app.listen(process.env.PORT || 5000, () => console.log("Server running"));
