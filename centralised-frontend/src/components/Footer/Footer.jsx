import React from "react";
import "./Footer.css";
import { FaMapMarkerAlt, FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h2 className="footer-title">Student Alumni Relations Cell</h2>
        
        <div className="footer-content">
          {/* Contact Section */}
          <div className="footer-section">
            <h3>Contact Us</h3>
            <div className="contacts">
              <a href="tel:+91 88157 26072" className="contact-item" onClick={(e) => e.stopPropagation()}>
                <MdPhone className="icon" />
                <span>+91 88157 26072</span>
              </a>
              <a href="mailto:sarc@iitb.ac.in" className="contact-item" onClick={(e) => e.stopPropagation()}>
                <MdEmail className="icon" />
                <span>sarc@iitb.ac.in</span>
              </a>
            </div>
          </div>

          {/* Address Section */}
          <div className="footer-section">
            <h3>Our Location</h3>
            <div className="address">
              <p>SARC Office, Student Activity Center</p>
              <p>IIT Bombay, Powai</p>
              <p>Mumbai, Maharashtra - 400076</p>
              <a 
                href="https://maps.app.goo.gl/Ld5YwQRCpbvJsxSS6" 
                target="_blank" 
                rel="noopener noreferrer"
                className="map-link mt-3"
                onClick={(e) => e.stopPropagation()}
              >
                <FaMapMarkerAlt className="icon" />
                <span>View on Google Maps</span>
                <div className="center-body">
                  <div className="loader-shape-3"></div>
                </div>
              </a>
            </div>
          </div>

          {/* Social Links Section */}
          <div className="footer-section">
            <h3>Connect With Us</h3>
            <div className="social-links">
              <a 
                href="https://www.instagram.com/sarc_iitb/" 
                className="social-item" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <FaInstagram className="icon" />
                <span>Instagram</span>
              </a>
              <a 
                href="https://www.facebook.com/SARC.IITB/" 
                className="social-item" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <FaFacebook className="icon" />
                <span>Facebook</span>
              </a>
              <a 
                href="https://twitter.com/sarc_iitb" 
                className="social-item" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <FaTwitter className="icon" />
                <span>Twitter</span>
              </a>
              <a 
                href="https://www.linkedin.com/company/sarc-iit-bombay/" 
                className="social-item" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <FaLinkedin className="icon" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-credit">
          <p>© {new Date().getFullYear()} Student Alumni Relations Cell, IIT Bombay. All rights reserved.</p>
          <p>Made with ❤️ by SARC Tech Team</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
