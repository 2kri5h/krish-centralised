import React from "react";
import "./Footer.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";
import { PiPhoneCallThin } from "react-icons/pi";
import { FaInstagram, FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Contact Section */}
          <div className="footer-section">
            <h3>Contact Us</h3>
            <div className="contacts">
              <div className="contact-item">
                {/* <div className="contact-label">Office</div> */}
                {/* <div className="contact-info">
                  <i className="fas fa-phone icon"></i>
                  <span>+91 881382383</span>
                </div> */}
                <span>+91 881382383</span>
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="footer-section">
            <h3>Address</h3>
            <div className="address">
              <p>SARC office, IIT Bombay</p>
              <p>Powai, Mumbai</p>
              <p>Maharashtra - 400076</p>
            </div>
          </div>

          {/* Social Links Section */}
          <div className="footer-section">
            <h3>Connect With Us</h3>
            <div className="social-links">
              <a href="https://www.instagram.com/sarc_iitb/?hl=en" className="social-item" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
                <span>Instagram</span>
              </a>
              <a href="mailto:sarc@iitb.ac.in" className="social-item">
                <i className="far fa-envelope"></i>
                <span>Email</span>
              </a>
              <a href="https://www.facebook.com/SARC.IITB/" className="social-item" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i>
                <span>Facebook</span>
              </a>
              <a href="https://x.com/sarc_iitb" className="social-item" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
                <span>Twitter</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-credit">
          Made with ❤️ by SARC
        </div>
      </div>
    </footer>
  );
};

export default Footer;
