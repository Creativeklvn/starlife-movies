import React from "react";
import facebookIcon from "../assets/facebook.png";
import instagramIcon from "../assets/instagram.png";
import tiktok from "../assets/tiktok.png";
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

            <a href="https://www.facebook.com/people/CK-Kelvin/61574225912359/">
            <div className="social-icons">
            <img src={facebookIcon} alt="facebook" />
            </div>
          </a>

            <a href="https://www.instagram.com/kelvinuneze">
            <div className="social-icons">
            <img src={instagramIcon} alt="instagram" />
            </div>
          </a>

            <a href="https://www.tiktok.com/@creativeklvn">
            <div className="social-icons">
            <img src={tiktok} alt="tiktok" />
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
