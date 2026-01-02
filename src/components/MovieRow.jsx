import { useEffect, useState } from "react";
import "../styles.css";

export default function MovieRow({ title, query }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/videos?q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.items) return;
        const rowVideos = data.items.map((item) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high?.url,
        }));
        setVideos(rowVideos);
      })
      .catch(console.error);
  }, [query]);

  if (videos.length === 0) return <p>Loading {title}…</p>;

  return (
    <div className="movie-row">
      <h2>{title}</h2>
      <div className="row-container">
        {videos.map((video) => (
          <div key={video.id} className="movie-card">
            <img src={video.thumbnail} alt={video.title} />
            <p>{video.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
