import React from "react";
import linkedinIcon from "../assets/li.png";
import instagramIcon from "../assets/instagram.png";
import x from "../assets/x.png";
import logo2 from "../assets/star.png";


export default function Footer() {
  return (
    <footer>
      {/* Footer */}
      <footer className="footer">
        <div className="footer-left">
          <img src={logo2} alt="MyLook footer logo" className="footer-logo" />
        </div>

        <div className="footer-right">
          <h3>Follow us</h3>
          <div className="social-icons">

            <a href="https://www.linkedin.com/in/kelvin-uneze-446a64144?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app">
            <div className="social-icons">
            <img src={linkedinIcon} alt="linkedin" />
            </div>
          </a>

            <a href="https://www.instagram.com/kelvinuneze">
            <div className="social-icons">
            <img src={instagramIcon} alt="instagram" />
            </div>
          </a>

            <a href="https://x.com/creative_klvn">
            <div className="social-icons">
            <img src={x} alt="x" />
                        </div>
          </a>
          </div>
          <p>Send mail to: <br></br>kelvinuneze@gmail.com</p>
          
        </div>
      </footer>
      <div className="footer-righ">
          <span>@ Kelvin Uneze All rights reserved (2025)</span>
        </div>
    
    </footer>
  );
}
