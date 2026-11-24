import React from "react";
import { Link } from "react-router-dom";
import { SARC_CALENDAR } from "./SiteHeader";
import "../../pages/Home.css";

// SARC's other websites (carried over from the old navigation menu).
const sarcSites = [
  { name: "ASMP", url: "https://asmp.sarc-iitb.org" },
  { name: "PMP", url: "https://pmp.sarc-iitb.org" },
  { name: "ILP", url: "https://ilpsummer.sarc-iitb.org" },
  { name: "NTP", url: "https://ntp.sarc-iitb.org" },
  { name: "Alumination", url: "https://alumination.sarc-iitb.org" },
  { name: "SARCASM", url: "https://sarcasm.sarc-iitb.org" },
  { name: "Yearbook", url: "https://yearbook.sarc-iitb.org" },
];

export default function SiteFooter() {
  return (
    <div className="sarc-home site-chrome site-footer">
      <footer className="home-footer">
        <div className="home-container home-footer-main">
          <div>
            <span className="home-footer-logo" role="img" aria-label="SARC logo" />
            <p>
              Student Alumni Relations Cell
              <br />
              IIT Bombay, Powai, Mumbai
            </p>
          </div>
          <nav aria-label="Quick links">
            <strong>Quick links</strong>
            <Link to="/">Home</Link>
            <Link to="/initiatives">Initiatives</Link>
            <a href={SARC_CALENDAR} target="_blank" rel="noreferrer">
              Events
            </a>
            <Link to="/gallery">Gallery</Link>
            <Link to="/alumni-advice">Alumni advice</Link>
            <Link to="/contact">Contact</Link>
          </nav>
          <nav aria-label="SARC websites">
            <strong>SARC websites</strong>
            {sarcSites.map((site) => (
              <a key={site.name} href={site.url} target="_blank" rel="noreferrer">
                {site.name}
              </a>
            ))}
          </nav>
          <div className="home-footer-social">
            <a
              href="https://www.instagram.com/sarc_iitb/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://acr.iitbombay.org/"
              target="_blank"
              rel="noreferrer"
            >
              Dean ACR Office
            </a>
          </div>
        </div>
        <div className="home-container home-footer-bottom">
          <span>© {new Date().getFullYear()} SARC, IIT Bombay</span>
          <a href="#top">Back to top</a>
        </div>
      </footer>
    </div>
  );
}
