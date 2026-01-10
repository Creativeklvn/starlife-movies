import { useEffect, useRef, useState } from "react";
import "../styles.css";

export default function MovieRow({ title, query, onLoaded }) {
  const [videos, setVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const [error, setError] = useState(null);
  const rowRef = useRef(null);

  useEffect(() => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    if (!backendUrl) {
      console.error("❌ VITE_BACKEND_URL is not defined");
      setError("Backend not configured");
      onLoaded && onLoaded(); // 🔔 still notify
      return;
    }

    fetch(`${backendUrl}/videos?q=${encodeURIComponent(query)}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!data?.items) return;

        const rowVideos = data.items
          .filter((item) => item.id?.videoId)
          .map((item) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail:
              item.snippet.thumbnails?.high?.url ||
              item.snippet.thumbnails?.medium?.url,
          }));

        setVideos(rowVideos);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load videos");
      })
      .finally(() => {
        onLoaded && onLoaded(); // 🔥 KEY LINE
      });
  }, [query, onLoaded]);

  const scrollLeft = () => {
    rowRef.current?.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = () => {
    rowRef.current?.scrollBy({ left: 400, behavior: "smooth" });
  };

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <>
      {videos.length > 0 && (
        <div className="movie-row">
          <h2>{title}</h2>

          <div className="row-wrapper">
            <button className="arrow left" onClick={scrollLeft}>
              ❮
            </button>

            <div className="row-container" ref={rowRef}>
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="movie-card"
                  onClick={() => setActiveVideo(video.id)}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    loading="lazy"
                  />
                  <p>{video.title}</p>
                </div>
              ))}
            </div>

            <button className="arrow right" onClick={scrollRight}>
              ❯
            </button>
          </div>
        </div>
      )}

      {/* MODAL PLAYER */}
      {activeVideo && (
        <div className="video-modal">
          <div className="video-content">
            <button
              className="close-btn"
              onClick={() => setActiveVideo(null)}
            >
              ✕
            </button>

            <iframe
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
              title="YouTube video player"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
