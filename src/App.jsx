import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSlider from "./components/HeroSlider";
import MovieRow from "./components/MovieRow";
import Footer from "./components/Footer";
import About from "./components/About";

import "./styles.css";

export default function App() {
  const TOTAL_SECTIONS = 6; // ✅ HeroSlider + 5 MovieRows
  const [loadedCount, setLoadedCount] = useState(0);

  const handleLoaded = () => {
    setLoadedCount((prev) => prev + 1);
  };

  const loading = loadedCount < TOTAL_SECTIONS;

  return (
    <>
      <Navbar />

      {/* 🔴 GLOBAL LOADER */}
      {loading && (
        <div className="app-loader">
          <div className="loader-circle"></div>
        </div>
      )}

      {!loading && (
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* ✅ NOW COUNTED */}
                <HeroSlider onLoaded={handleLoaded} />

                <MovieRow
                  title="Trending Movie Trailers 🔥"
                  query="latest movie trailers"
                  onLoaded={handleLoaded}
                />
                <MovieRow
                  title="Action Movie Trailers 🔥"
                  query="action movie trailers"
                  onLoaded={handleLoaded}
                />
                <MovieRow
                  title="Cartoon Movie Trailers 🔥"
                  query="cartoon movie trailers"
                  onLoaded={handleLoaded}
                />
                <MovieRow
                  title="African Movie Trailers 🔥"
                  query="african movie trailers"
                  onLoaded={handleLoaded}
                />
                <MovieRow
                  title="Trending TV Series 🔥"
                  query="trending TV series"
                  onLoaded={handleLoaded}
                />
              </>
            }
          />

          <Route path="/about" element={<About />} />

          <Route
            path="/trending"
            element={
              <MovieRow
                title="Trending Movie Trailers 🔥"
                query="latest movie trailers"
                onLoaded={handleLoaded}
              />
            }
          />
        </Routes>
      )}

      <Footer />
    </>
  );
}
