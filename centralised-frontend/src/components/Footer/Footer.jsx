import React from "react";
import "./Footer.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";
import { PiPhoneCallThin } from "react-icons/pi";
import { FaInstagram, FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="footer" id="contactUs">
      <div className="footer-container">
        <h2 className="footer-title">Contact</h2>
        <div className="footer-content">
          {/* Contact Details */}
          <div className="footer-section contacts">
            <div className="contact-item">
              <PiPhoneCallThin style={{ scale: "2" }} />
              <div>
                <p>Contact Us</p>
                <strong>+91 62631 73987</strong>
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
            <a href="https://www.instagram.com/sarc_iitb/?hl=en" className="social-item">
              <FaInstagram className="icon" />
              <p>Instagram</p>
            </a>
            <br />
            <a href="mailto:sarc@iitb.ac.in" className="social-item">
              <MdEmail  className="icon" />
              <p>Email</p>
            </a>
            <br />
            <div className="social-item">
              <a href="https://www.facebook.com/SARC.IITB/" className="social-item">
                <FaFacebook className="icon" />
                <p>Facebook</p>
              </a>
            </div>
            <br />
            <div className="social-item">
              <a href="https://x.com/sarc_iitb" className="social-item">
                <FaTwitter className="icon" />
                <p>Twitter / X</p>
              </a>
            </div>
          </div>
        </div>
        <p className="footer-credit">Made with 💙 by SARC</p>
      </div>
    </footer>
  );
};

export default Footer;
