import React from "react";
import "./Footer.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";
import { PiPhoneCallThin } from "react-icons/pi";
import { FaInstagram, FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h2 className="footer-title">Contact</h2>
        <div className="footer-content">
          {/* Contact Details */}
          <div className="footer-section contacts">
            <div className="contact-item">
              <PiPhoneCallThin style={{ scale: "2" }} />
              <div>
                <p>Overall Co-ordinator</p>
                <strong>123 456 7890</strong>
              </div>
            </div>
            <br />
            <div className="contact-item">
              <PiPhoneCallThin style={{ scale: "2" }} />
              <div>
                <p>SARC Main Office</p>
                <strong>123 456 7890</strong>
              </div>
            </div>
            <br />
            <div className="contact-item">
              <PiPhoneCallThin style={{ scale: "2" }} />
              <div>
                <p>Event Co-ordinator</p>
                <strong>123 456 7890</strong>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="footer-section address">
            <strong>ADDRESS:</strong>
            <br /> <br />
            <p>SARC office, IIT Bombay</p>
            <p>Powai, Mumbai</p>
            <p>Maharashtra - 400076</p>
            <br />
            <a href="https://gmap.link.com" className="map-link">
              <FaMapMarkerAlt className="icon" /> https://gmap.link.com
            </a>
          </div>

          {/* Social Media */}
          <div className="footer-section social">
            <div className="social-item">
              <FaInstagram className="icon" />
              <p>Instagram</p>
            </div>
            <br />
            <div className="social-item">
              <FaGoogle className="icon" />
              <p>Google</p>
            </div>
            <br />
            <div className="social-item">
              <FaFacebook className="icon" />
              <p>Facebook</p>
            </div>
            <br />
            <div className="social-item">
              <FaTwitter className="icon" />
              <p>Twitter / X</p>
            </div>
          </div>
        </div>
        <p className="footer-credit">Made with 💙 by SARC</p>
      </div>
    </footer>
  );
};

export default Footer;
