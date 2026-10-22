import React, { useEffect, useRef } from "react";
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
          <a href="#events">Events</a>
          <a href="#about">About SARC</a>
          <a className="button" href="#programs">
            Explore SARC <i aria-hidden="true">↗</i>
          </a>
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
        <a href="#events">Events</a>
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
            <div className="hero-keyline"></div>
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
            <a className="route" href="https://asmp.sarc-iitb.org/">
              <div>
                <small>Mentorship</small>
                <strong>Alumni Student Mentorship</strong>
              </div>
              <span aria-hidden="true">↗</span>
            </a>
            <a className="route" href="#events">
              <div>
                <small>On campus</small>
                <strong>Upcoming events</strong>
              </div>
              <span aria-hidden="true">↗</span>
            </a>
            <a className="route" href="#programs">
              <div>
                <small>Explore SARC</small>
                <strong>Programs & initiatives</strong>
              </div>
              <span aria-hidden="true">↗</span>
            </a>
          </nav>
        </div>
        <section className="about wrap" id="about">
          <figure className="about-photo">
            <img
              src={require("../assets/gallery/gallery/5.JPG")}
              alt="A student speaking with an alumnus during a SARC interaction"
            />
            <figcaption>
              Student and alumni interaction<span>IIT Bombay</span>
            </figcaption>
          </figure>
          <div className="about-copy">
            <div className="section-label">About SARC</div>
            <h2>
              SARC connects the students to the{" "}
              <span>alumni of IIT Bombay.</span>
            </h2>
            <div className="about-bottom">
              <p>
                A student body working with the Dean ACR Office to bring
                students and alumni together through mentorship, events and
                initiatives throughout the year.
              </p>
              <a className="text-link" href="https://acr.iitbombay.org/sarc/">
                More about SARC <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>
        <section className="programs wrap" id="programs">
          <div className="section-head">
            <h2>
              Programs &<br />
              initiatives.
            </h2>
            <p>
              Explore the official websites for mentorship, career preparation
              and student alumni engagement.
            </p>
          </div>
          <div className="program-grid">
            <a className="feature" href="https://asmp.sarc-iitb.org/">
              <div className="feature-photo">
                <img
                  src={require("../assets/gallery/gallery/1.jpg")}
                  alt="A student in conversation with an alumnus"
                />
                <span className="photo-label">Mentorship · ASMP</span>
              </div>
              <div className="feature-info">
                <div>
                  <h3>
                    Alumni Student
                    <br />
                    Mentorship Program
                  </h3>
                  <p>
                    A continuing dialogue between IIT Bombay students and
                    alumni.
                  </p>
                </div>
                <span className="circle-arrow" aria-hidden="true">
                  ↗
                </span>
              </div>
            </a>
            <div>
              <article className="program-row">
                <div>
                  <small>Career preparation · PMP</small>
                  <h3>
                    Placement
                    <br />
                    Mentoring Program
                  </h3>
                  <p>Alumni guidance for students preparing for placements.</p>
                  <a className="text-link" href="https://pmp.sarc-iitb.org/">
                    Visit PMP <span aria-hidden="true">↗</span>
                  </a>
                </div>
                <img
                  src={require("../assets/gallery/gallery/6.JPG")}
                  alt="Students speaking with alumni at a SARC event"
                />
              </article>
              <article className="program-row">
                <div>
                  <small>Learning · ILP</small>
                  <h3>
                    Industrial
                    <br />
                    Learning Program
                  </h3>
                  <p>Apply academic knowledge to projects shared by alumni.</p>
                  <a
                    className="text-link"
                    href="https://gymkhana.iitb.ac.in/instiapp//org/sarc"
                  >
                    Program details <span aria-hidden="true">↗</span>
                  </a>
                </div>
                <img
                  src={require("../assets/gallery/gallery/23.jpeg")}
                  alt="Students participating in a learning session"
                />
              </article>
            </div>
          </div>
          <div className="directory">
            <span>Also at SARC</span>
            <a href="https://sam-sarc-iitb.vercel.app/">Student Alumni Meet</a>
            <a href="https://ntp.sarc-iitb.org/">Shadow Program</a>
            <a href="https://yearbook.sarc-iitb.org/">Yearbook</a>
            <a href="https://gymkhana.iitb.ac.in/instiapp//org/sarc">
              All initiatives
            </a>
          </div>
        </section>
        <section className="events" id="events">
          <div className="section-head">
            <h2>Events at SARC.</h2>
            <a
              className="text-link"
              href="https://gymkhana.iitb.ac.in/instiapp//org/sarc"
            >
              View the event calendar <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="events-grid">
            <a
              className="event-feature"
              href="https://alumination.sarc-iitb.org/"
            >
              <img
                src={require("../assets/gallery/gallery/32.JPG")}
                alt="Alumination entrance at IIT Bombay"
              />
              <div>
                <h3>Alumination</h3>
                <p>Explore the program, events and schedule.</p>
              </div>
            </a>
            <div>
              <div className="event-list">
                <a
                  className="event-row"
                  href="https://gymkhana.iitb.ac.in/instiapp//org/sarc"
                >
                  <div className="date">
                    <strong>24</strong>
                    <span>OCT 2026</span>
                  </div>
                  <div>
                    <h3>
                      Mock Interview &<br />
                      Group Discussion
                    </h3>
                    <p>24 to 25 October · Lecture Hall Complex</p>
                  </div>
                  <span aria-hidden="true">↗</span>
                </a>
                <a
                  className="event-row"
                  href="https://gymkhana.iitb.ac.in/instiapp//org/sarc"
                >
                  <div className="date">
                    <strong>25</strong>
                    <span>OCT 2026</span>
                  </div>
                  <div>
                    <h3>Group Mentoring</h3>
                    <p>10 am to 5 pm · Lecture Hall Complex</p>
                  </div>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
              <p className="events-note">
                Event details and participation information are available on the
                official event listings.
              </p>
            </div>
          </div>
        </section>
        <section className="gallery wrap">
          <div className="section-head">
            <h2>From the gallery.</h2>
            <a
              className="text-link"
              href="https://alumination.sarc-iitb.org/gallery"
            >
              View the gallery <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="gallery-pair">
            <figure>
              <img
                src={require("../assets/gallery/gallery/8.JPG")}
                alt="Alumni panel discussion with students"
              />
              <figcaption>
                <span>Conversations with alumni</span>
                <span>SARC, IIT Bombay</span>
              </figcaption>
            </figure>
            <figure>
              <img
                src={require("../assets/gallery/gallery/3.JPG")}
                alt="SARC group gathering on stage"
              />
              <figcaption>
                <span>Alumination</span>
                <span>IIT Bombay</span>
              </figcaption>
            </figure>
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
              <a href="#programs">Programs & initiatives</a>
              <a href="#events">Events</a>
              <a href="https://acr.iitbombay.org/sarc/">About SARC</a>
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
