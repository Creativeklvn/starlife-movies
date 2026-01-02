import React from "react";
import { Link } from "react-router-dom";
import starImg from "../assets/star.png";
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={starImg} alt="Star" className="star" />
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/trending">Trending</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
}
