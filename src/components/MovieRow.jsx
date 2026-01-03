import { useEffect, useRef, useState } from "react";
import "../styles.css";

export default function MovieRow({ title, query }) {
  const [videos, setVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const rowRef = useRef(null);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/videos?q=${encodeURIComponent(query)}`
    )
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

  const scrollLeft = () => {
    rowRef.current.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = () => {
    rowRef.current.scrollBy({ left: 400, behavior: "smooth" });
  };

  if (videos.length === 0) return <p>Loading {title}…</p>;

  return (
    <>
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
                <img src={video.thumbnail} alt={video.title} />
                <p>{video.title}</p>
              </div>
            ))}
          </div>

          <button className="arrow right" onClick={scrollRight}>
            ❯
          </button>
        </div>
      </div>

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
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}
