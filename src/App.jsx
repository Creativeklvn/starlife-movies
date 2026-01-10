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

  useEffect(() => {
    // simulate initial loading (API, assets, etc.)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // adjust if needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />

      {/* 🔴 GLOBAL LOADER */}
      {loading ? (
        <div className="app-loader">
          <div className="loader-circle"></div>
        </div>
      ) : (
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <HeroSlider />
                <MovieRow title="Trending Movie Trailers 🔥" query="latest movie trailers" />
                <MovieRow title="Action Movie Trailers 🔥" query="action movie trailers" />
                <MovieRow title="Cartoon Movie Trailers 🔥" query="cartoon movie trailers" />
                <MovieRow title="African Movie Trailers 🔥" query="african movie trailers" />
                <MovieRow title="Trending TV Series 🔥" query="trending TV series" />
              </>
            }
          />

          {/* About Page */}
          <Route path="/about" element={<About />} />

          {/* Trending Page */}
          <Route
            path="/trending"
            element={
              <MovieRow
                title="Trending Movie Trailers 🔥"
                query="latest movie trailers"
              />
            }
          />
        </Routes>
      )}

      <Footer />
    </>
  );
}
