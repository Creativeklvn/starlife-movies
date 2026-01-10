import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSlider from "./components/HeroSlider";
import MovieRow from "./components/MovieRow";
import Footer from "./components/Footer";
import About from "./components/About";

import "./styles.css";

export default function App() {
  const TOTAL_ROWS = 5; // number of MovieRow components
  const [loadedRows, setLoadedRows] = useState(0);

  const handleRowLoaded = () => {
    setLoadedRows((prev) => prev + 1);
  };

  const loading = loadedRows < TOTAL_ROWS;

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
                <HeroSlider />
                <MovieRow title="Trending Movie Trailers 🔥" query="latest movie trailers" onLoaded={handleRowLoaded} />
                <MovieRow title="Action Movie Trailers 🔥" query="action movie trailers" onLoaded={handleRowLoaded} />
                <MovieRow title="Cartoon Movie Trailers 🔥" query="cartoon movie trailers" onLoaded={handleRowLoaded} />
                <MovieRow title="African Movie Trailers 🔥" query="african movie trailers" onLoaded={handleRowLoaded} />
                <MovieRow title="Trending TV Series 🔥" query="trending TV series" onLoaded={handleRowLoaded} />
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
                onLoaded={handleRowLoaded}
              />
            }
          />
        </Routes>
      )}

      <Footer />
    </>
  );
}
