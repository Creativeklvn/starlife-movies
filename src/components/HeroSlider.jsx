import { useEffect, useState } from "react";
import "../styles.css";

export default function HeroSlider({ onLoaded }) {
  const [videos, setVideos] = useState([]);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    if (!backendUrl) {
      console.error("❌ VITE_BACKEND_URL is not defined");
      setError("Backend not configured");
      onLoaded && onLoaded(); // 🔔 notify App
      return;
    }

    fetch(
      `${backendUrl}/videos?q=${encodeURIComponent(
        "trending movie trailers"
      )}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!data?.items) return;

        const videosData = data.items
          .filter((item) => item.id?.videoId)
          .map((item) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail:
              item.snippet.thumbnails?.maxres?.url ||
              item.snippet.thumbnails?.high?.url ||
              item.snippet.thumbnails?.medium?.url,
          }));

        setVideos(videosData);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load videos");
      })
      .finally(() => {
        onLoaded && onLoaded(); // 🔥 CRITICAL LINE
      });
  }, [onLoaded]);

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

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <>
      {videos.length > 0 && (
        <section className="hero-slider">
          <div className="hero-slide">
            {!isPlaying ? (
              <div
                className="thumbnail-wrapper"
                onClick={() => setIsPlaying(true)}
              >
                <img
                  src={videos[index].thumbnail}
                  alt={videos[index].title}
                  className="hero-thumbnail"
                />
                <div className="play-button">▶</div>
              </div>
            ) : (
              <iframe
                className="hero-video"
                src={`https://www.youtube.com/embed/${videos[index].id}?autoplay=1&rel=0`}
                title={videos[index].title}
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
      )}
    </>
  );
}
