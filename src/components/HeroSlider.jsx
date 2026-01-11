import { useEffect, useState } from "react";
import "../styles.css";

export default function HeroSlider({ videos }) {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

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

  if (videos.length === 0) return null;

  return (
    <section className="hero-slider">
      <div className="hero-slide">
        {!isPlaying ? (
          <div className="thumbnail-wrapper" onClick={() => setIsPlaying(true)}>
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
  );
}
