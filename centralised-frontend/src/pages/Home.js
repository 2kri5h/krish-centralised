import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import "./Home.css";

export default function Home() {
  const rootRef = useRef(null);
  useEffect(() => {
    const root = rootRef.current;
    const slides = [...root.querySelectorAll(".hero-image")];
    const buttons = [...root.querySelectorAll("[data-slide]")];
    const pause = root.querySelector(".pause");
    const toggle = root.querySelector(".menu-button");
    const menu = root.querySelector(".mobile-nav");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const lenis =
      !reduced.matches && window.matchMedia("(pointer: fine)").matches
        ? new Lenis({
            autoRaf: true,
            anchors: true,
            duration: 1.05,
            smoothWheel: true,
            syncTouch: false,
          })
        : null;
    let current = 0;
    let stopped = reduced.matches;
    let timer;
    const show = (index) => {
      current = index;
      slides.forEach((slide, n) =>
        slide.classList.toggle("active", n === index),
      );
      buttons.forEach((button, n) =>
        n === index
          ? button.setAttribute("aria-current", "true")
          : button.removeAttribute("aria-current"),
      );
    };
    const sync = () => {
      window.clearInterval(timer);
      pause.textContent = stopped ? "▶" : "Ⅱ";
      pause.setAttribute(
        "aria-label",
        stopped ? "Play slideshow" : "Pause slideshow",
      );
      if (!stopped && !document.hidden)
        timer = window.setInterval(
          () => show((current + 1) % slides.length),
          3500,
        );
    };
    const slideListeners = buttons.map((button, index) => {
      const listener = () => {
        show(index);
        sync();
      };
      button.addEventListener("click", listener);
      return [button, listener];
    });
    const onPause = () => {
      stopped = !stopped;
      sync();
    };
    const onVisibility = () => sync();
    const onMotionChange = () => {
      stopped = reduced.matches;
      sync();
    };
    const closeMenu = () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    };
    const onToggle = () => {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    const onEscape = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    const menuLinks = [...menu.querySelectorAll("a")];
    pause.addEventListener("click", onPause);
    toggle.addEventListener("click", onToggle);
    menuLinks.forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("visibilitychange", onVisibility);
    document.addEventListener("keydown", onEscape);
    reduced.addEventListener("change", onMotionChange);
    const documentaryImages = [
      ...root.querySelectorAll(
        ".about-photo img, .feature-photo img, .gallery-pair img",
      ),
    ];
    let mediaObserver;
    if (!reduced.matches && "IntersectionObserver" in window) {
      documentaryImages.forEach((image) => image.classList.add("media-reveal"));
      mediaObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("media-in");
              mediaObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.18 },
      );
      documentaryImages.forEach((image) => mediaObserver.observe(image));
    }
    sync();
    return () => {
      mediaObserver?.disconnect();
      lenis?.destroy();
      window.clearInterval(timer);
      slideListeners.forEach(([button, listener]) =>
        button.removeEventListener("click", listener),
      );
      pause.removeEventListener("click", onPause);
      toggle.removeEventListener("click", onToggle);
      menuLinks.forEach((link) => link.removeEventListener("click", closeMenu));
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("keydown", onEscape);
      reduced.removeEventListener("change", onMotionChange);
    };
  }, []);
  return (
    <div className="sarc-home" ref={rootRef}>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="nav wrap">
        <a className="brand" href="#main" aria-label="SARC IIT Bombay home">
          <span className="logo" role="img" aria-label="SARC"></span>
          <span className="brand-meta">
            <strong>IIT Bombay</strong>Student Alumni Relations Cell
          </span>
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          <a href="#programs">Programs</a>
          <Link to="/initiatives">Initiatives</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/contact">Team & Contact</Link>
          <a href="#about">About SARC</a>
          <Link className="button" to="/initiatives">
            Explore SARC <i aria-hidden="true">↗</i>
          </Link>
        </nav>
        <button
          className="menu-button"
          aria-label="Open menu"
          aria-expanded="false"
          aria-controls="mobile-nav"
        >
          ≡
        </button>
      </header>
      <nav
        className="mobile-nav"
        id="mobile-nav"
        aria-label="Mobile navigation"
      >
        <a href="#programs">Programs</a>
        <Link to="/initiatives">Initiatives</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/contact">Team & Contact</Link>
        <a href="#about">About SARC</a>
      </nav>
      <main id="main">
        <div className="hero-shell">
          <section className="hero" aria-label="SARC photo gallery">
            <picture>
              <source
                media="(max-width:650px)"
                srcSet={require("../assets/gallery/gallery/3.JPG")}
              />
              <img
                className="hero-image active"
                src={require("../assets/gallery/gallery/12.png")}
                alt="SARC students and alumni gathering"
              />
            </picture>
            <picture>
              <source
                media="(max-width:650px)"
                srcSet={require("../assets/gallery/gallery/12.png")}
              />
              <img
                className="hero-image"
                src={require("../assets/gallery/gallery/3.JPG")}
                alt="SARC students and alumni gathering"
              />
            </picture>
            <img
              className="hero-image"
              src={require("../assets/gallery/gallery/4.png")}
              alt="Audience attending a SARC event"
            />
            <div className="hero-main">
              <p className="school">Student Alumni Relations Cell</p>
              <h1>SARC</h1>
              <p className="hero-sub">
                Mentorship, events and initiatives
                <br />
                for IIT Bombay students and alumni.
              </p>
              <a href="#programs" className="button">
                Explore our initiatives <i aria-hidden="true">↗</i>
              </a>
            </div>
            <div className="hero-caption">
              <p>SARC gatherings & events</p>
              <div className="playback" aria-label="Photo controls">
                <button
                  aria-label="Show photo 1"
                  aria-current="true"
                  data-slide="0"
                >
                  01
                </button>
                <button aria-label="Show photo 2" data-slide="1">
                  02
                </button>
                <button aria-label="Show photo 3" data-slide="2">
                  03
                </button>
                <button className="pause" aria-label="Pause slideshow">
                  Ⅱ
                </button>
              </div>
            </div>
          </section>
          <nav className="routes" aria-label="Quick links">
            <Link className="route" to="/initiatives">
              <div>
                <small>Explore 17 Initiatives</small>
                <strong>Mentorship & Programs</strong>
              </div>
              <span aria-hidden="true">↗</span>
            </Link>
            <Link className="route" to="/gallery">
              <div>
                <small>3D Ring Experience</small>
                <strong>Photo Gallery</strong>
              </div>
              <span aria-hidden="true">↗</span>
            </Link>
            <Link className="route" to="/contact">
              <div>
                <small>Council 2026–2027</small>
                <strong>Team & Contact</strong>
              </div>
              <span aria-hidden="true">↗</span>
            </Link>
          </nav>
        </div>

        {/* 1. Authority Metric Ribbon */}
        <section className="authority-ribbon wrap" aria-label="SARC Reach and Scale">
          <div className="authority-item">
            <span className="authority-num">70,000+</span>
            <span className="authority-label">Alumni in 90+ Countries</span>
          </div>
          <div className="authority-item">
            <span className="authority-num">14,000+</span>
            <span className="authority-label">Students Connected</span>
          </div>
          <div className="authority-item">
            <span className="authority-num">17</span>
            <span className="authority-label">Strategic Initiatives</span>
          </div>
          <div className="authority-item">
            <span className="authority-num">Est. 2008</span>
            <span className="authority-label">Dean ACR · IIT Bombay</span>
          </div>
        </section>

        {/* 2. Main Gateway Grid */}
        <section className="gateway-section wrap" id="initiatives">
          <div className="gateway-grid">
            {/* Left Column: Initiatives Gateway */}
            <div className="gateway-main">
              <div className="gateway-header">
                <span className="gateway-kicker">OUR INITIATIVES</span>
                <h2>Connecting students to world-class alumni.</h2>
                <p>Three core pillars of mentorship, flagship conclaves, and campus traditions.</p>
              </div>

              <div className="gateway-cards">
                {/* Pillar 1: Mentorship */}
                <Link to="/initiatives" className="gateway-card">
                  <div className="gateway-card-top">
                    <span className="gateway-pill pill-mentorship">MENTORSHIP</span>
                  </div>
                  <h3>Mentorship & Career</h3>
                  <ul className="gateway-card-list">
                    <li>ASMP (1-on-1 Alumni Pairings)</li>
                    <li>Industrial Learning Program (ILP)</li>
                    <li>Mock Interview & GD Drive</li>
                  </ul>
                  <div className="gateway-card-img">
                    <img
                      src={require("../assets/gallery/gallery/1.jpg")}
                      alt="Student mentoring interaction"
                    />
                  </div>
                </Link>

                {/* Pillar 2: Summits */}
                <Link to="/initiatives" className="gateway-card">
                  <div className="gateway-card-top">
                    <span className="gateway-pill pill-fest">FLAGSHIP FEST</span>
                  </div>
                  <h3>Alumination & Summits</h3>
                  <ul className="gateway-card-list">
                    <li>Annual Alumination Fest</li>
                    <li>Student Alumni Meet (SAM)</li>
                    <li>Beyond the Horizon Conclave</li>
                  </ul>
                  <div className="gateway-card-img">
                    <img
                      src={require("../assets/gallery/gallery/12.png")}
                      alt="Alumination mainstage"
                    />
                  </div>
                </Link>

                {/* Pillar 3: Traditions */}
                <Link to="/initiatives" className="gateway-card">
                  <div className="gateway-card-top">
                    <span className="gateway-pill pill-heritage">HERITAGE</span>
                  </div>
                  <h3>Campus Traditions</h3>
                  <ul className="gateway-card-list">
                    <li>Hostel Alumni Meets</li>
                    <li>Milestone Batch Reunions</li>
                    <li>Institute Valedictory Function</li>
                  </ul>
                  <div className="gateway-card-img">
                    <img
                      src={require("../assets/gallery/gallery/3.JPG")}
                      alt="Campus batch gathering"
                    />
                  </div>
                </Link>
              </div>

              <div className="gateway-cta-wrapper">
                <Link to="/initiatives" className="gateway-explore-btn">
                  Explore All 17 SARC Initiatives <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Gallery Portal & Events Ledger */}
            <div className="gateway-side">
              {/* Gallery Gateway Portal */}
              <div className="gateway-gallery-portal">
                <div className="gallery-portal-header">
                  <span className="gallery-portal-kicker">MOMENTS OF CONNECTION</span>
                  <h3>Moments Across Decades</h3>
                  <p>A living archive of reunions, conclaves, and campus memories.</p>
                </div>
                
                <div className="gallery-portal-strip">
                  <div className="gallery-thumb">
                    <img src={require("../assets/gallery/gallery/8.JPG")} alt="Alumni panel" />
                  </div>
                  <div className="gallery-thumb">
                    <img src={require("../assets/gallery/gallery/32.JPG")} alt="Alumination lights" />
                  </div>
                  <div className="gallery-thumb">
                    <img src={require("../assets/gallery/gallery/4.png")} alt="Audience" />
                  </div>
                  <div className="gallery-thumb">
                    <img src={require("../assets/gallery/gallery/23.jpeg")} alt="Student mentorship" />
                  </div>
                </div>

                <Link to="/gallery" className="gallery-portal-btn">
                  Launch 3D Ring Gallery <span aria-hidden="true">↗</span>
                </Link>
              </div>

              {/* Events Ledger */}
              <div className="gateway-events-ledger">
                <div className="ledger-header">
                  <h4>Events Ledger</h4>
                  <span className="ledger-sub">2026 Season</span>
                </div>
                <div className="ledger-list">
                  <div className="ledger-item">
                    <div className="ledger-date">
                      <strong>24-25</strong>
                      <span>OCT</span>
                    </div>
                    <div className="ledger-info">
                      <h5>Alumination 2026</h5>
                      <p>Annual Student-Alumni Conclave · LHC & Convocation Hall</p>
                    </div>
                  </div>
                  <div className="ledger-item">
                    <div className="ledger-date">
                      <strong>OCT-NOV</strong>
                      <span>DRIVE</span>
                    </div>
                    <div className="ledger-info">
                      <h5>Placement Mock Interview Drive</h5>
                      <p>Simulated technical & GD rounds with senior alumni</p>
                    </div>
                  </div>
                  <div className="ledger-item">
                    <div className="ledger-date">
                      <strong>ANNUAL</strong>
                      <span>MEET</span>
                    </div>
                    <div className="ledger-info">
                      <h5>Student Alumni Meet (SAM)</h5>
                      <p>Interactive department & hostel networking sessions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. About & Council Anchor */}
        <section className="council-anchor wrap" id="about">
          <div className="council-anchor-box">
            <div className="council-anchor-content">
              <span className="council-kicker">ABOUT SARC</span>
              <h2>Bridging students and alumni under the Dean ACR Office.</h2>
              <p>
                Established in 2008, the Student Alumni Relations Cell fosters lifelong bonds
                between over 70,000 alumni and 14,000 students through year-round mentorship,
                conclaves, and collaborative initiatives.
              </p>
              <div className="council-anchor-links">
                <Link to="/contact" className="anchor-link-btn">
                  Meet the 2026–2027 Team <span aria-hidden="true">↗</span>
                </Link>
                <a href="https://acr.iitbombay.org/" target="_blank" rel="noreferrer" className="anchor-link-text">
                  Dean ACR Office, IIT Bombay <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
            <div className="council-anchor-visual">
              <img
                src={require("../assets/gallery/gallery/5.JPG")}
                alt="SARC student and alumni meeting"
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="footer-top">
          <div>
            <span className="logo" role="img" aria-label="SARC"></span>
            <p className="footer-name">
              Student Alumni Relations Cell · IIT Bombay
            </p>
          </div>
          <div className="footer-links">
            <div>
              <h3>Explore</h3>
              <a href="#programs">Programs</a>
              <Link to="/initiatives">Initiatives</Link>
              <Link to="/gallery">Gallery</Link>
              <Link to="/contact">Team & Contact</Link>
              <a href="https://acr.iitbombay.org/sarc/" target="_blank" rel="noreferrer">About SARC ↗</a>
            </div>
            <div>
              <h3>Visit & connect</h3>
              <p>
                SARC Room, Old SAC
                <br />
                IIT Bombay, Powai
                <br />
                Mumbai, Maharashtra 400076
              </p>
              <a href="https://www.instagram.com/sarc_iitb/">Instagram ↗</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 SARC, IIT Bombay</span>
          <a href="https://acr.iitbombay.org/">Dean ACR Office ↗</a>
        </div>
      </footer>
    </div>
  );
}
