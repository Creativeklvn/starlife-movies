import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HeroSlider from "./components/HeroSlider";
import MovieRow from "./components/MovieRow";
import Footer from "./components/Footer";
import About from "./components/About";

import "./styles.css";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [homepageData, setHomepageData] = useState({});

  useEffect(() => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    if (!backendUrl) {
      console.error("❌ VITE_BACKEND_URL is not defined");
      setLoading(false);
      return;
    }

    fetch(`${backendUrl}/homepage`)
      .then((res) => res.json())
      .then((data) => setHomepageData(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />

      {loading && (
        <div className="app-loader">
          <div className="loader-circle"></div>
        </div>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSlider videos={homepageData.hero || []} />
              <MovieRow title="Trending Movie Trailers 🔥" videos={homepageData.trending || []} />
              <MovieRow title="Action Movie Trailers 🔥" videos={homepageData.action || []} />
              <MovieRow title="Cartoon Movie Trailers 🔥" videos={homepageData.cartoon || []} />
              <MovieRow title="African Movie Trailers 🔥" videos={homepageData.african || []} />
              <MovieRow title="Trending TV Series 🔥" videos={homepageData.tvseries || []} />
            </>
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>

      <Footer />
    </>
  );
}
