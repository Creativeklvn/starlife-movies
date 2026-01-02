import { useEffect, useState } from "react";
import "../styles.css"; // optional styling

export default function HeroSlider() {
  const [videos, setVideos] = useState([]);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/videos?q=trending movie trailers`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.items) return;
        const videosData = data.items.map((item) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail:
            item.snippet.thumbnails.maxres?.url ||
            item.snippet.thumbnails.high?.url,
        }));
        setVideos(videosData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (videos.length === 0 || isPlaying) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % videos.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [videos, isPlaying]);

  const prevSlide = () => {
    setIsPlaying(false);
    setIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const nextSlide = () => {
    setIsPlaying(false);
    setIndex((prev) => (prev + 1) % videos.length);
  };

  if (videos.length === 0) return <p>Loading trailers…</p>;

  const currentVideo = videos[index];

  return (
    <section className="hero-slider">
      <div className="hero-slide">
        {!isPlaying ? (
          <div className="thumbnail-wrapper" onClick={() => setIsPlaying(true)}>
            <img
              src={currentVideo.thumbnail}
              alt={currentVideo.title}
              className="hero-thumbnail"
            />
            <div className="play-button">▶</div>
          </div>
        ) : (
          <iframe
            className="hero-video"
            src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=1&rel=0`}
            title={currentVideo.title}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        )}
      </div>

      <button className="arrow left-arrow" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="arrow right-arrow" onClick={nextSlide}>
        &#10095;
      </button>
    </section>
  );
}
