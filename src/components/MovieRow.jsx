import { useRef, useState } from "react";
import "../styles.css";

export default function MovieRow({ title, videos }) {
  const [activeVideo, setActiveVideo] = useState(null);
  const rowRef = useRef(null);

  if (!videos || videos.length === 0) return null;

  const scrollLeft = () => rowRef.current?.scrollBy({ left: -400, behavior: "smooth" });
  const scrollRight = () => rowRef.current?.scrollBy({ left: 400, behavior: "smooth" });

  return (
    <div className="movie-row">
      <h2>{title}</h2>
      <div className="row-wrapper">
        <button className="arrow left" onClick={scrollLeft}>❮</button>
        <div className="row-container" ref={rowRef}>
          {videos.map((video) => (
            <div key={video.id} className="movie-card" onClick={() => setActiveVideo(video.id)}>
              <img src={video.thumbnail} alt={video.title} loading="lazy" />
              <p>{video.title}</p>
            </div>
          ))}
        </div>
        <button className="arrow right" onClick={scrollRight}>❯</button>
      </div>

      {activeVideo && (
        <div className="video-modal">
          <div className="video-content">
            <button className="close-btn" onClick={() => setActiveVideo(null)}>✕</button>
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
    </div>
  );
}
