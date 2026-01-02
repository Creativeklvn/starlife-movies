import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSlider from "./components/HeroSlider";
import MovieRow from "./components/MovieRow";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <HeroSlider />
              <MovieRow
                title="Trending Movie Trailers 🔥"
                query="latest movie trailers"
              />
            </>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}
