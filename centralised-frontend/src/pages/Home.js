import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import "./Home.css";

const photos = [
  require("../assets/home-media/hero-gathering.webp"),
  require("../assets/home-media/hero-stage.webp"),
  require("../assets/home-media/alumination-stage.webp"),
];

const sarcCalendar = "https://gymkhana.iitb.ac.in/instiapp//org/sarc";

const aluminationEvents = [
  {
    name: "Group Mentoring",
    start_time: "2026-10-25T10:00:00+05:30",
    end_time: "2026-10-25T17:00:00+05:30",
    venue: "Lecture Hall Complex",
    url: "https://gymkhana.iitb.ac.in/instiapp//event/group-mentoring-82fb9bc6",
  },
  {
    name: "Innovation Expo",
    start_time: "2026-10-25T11:00:00+05:30",
    end_time: "2026-10-25T17:00:00+05:30",
    venue: "Lecture Hall Complex",
    url: "https://gymkhana.iitb.ac.in/instiapp//event/innovation-expo-9b3ae6df",
  },
  {
    name: "Workshops",
    start_time: "2026-10-25T11:00:00+05:30",
    end_time: "2026-10-25T13:00:00+05:30",
    venue: "Lecture Hall Complex",
    url: "https://gymkhana.iitb.ac.in/instiapp//event/workshops-b7eb411f",
  },
];

const dateParts = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  day: "numeric",
  month: "short",
});
const eventTime = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

function eventDateParts(value) {
  const parts = dateParts.formatToParts(new Date(value));
  return {
    day: parts.find((part) => part.type === "day")?.value,
    month: parts.find((part) => part.type === "month")?.value.toUpperCase(),
  };
}

const programs = [
  {
    name: "Alumni Student Mentorship Program",
    short: "ASMP",
    description:
      "Yearlong one-to-one mentorship pairs students with alumni for guidance on their next steps.",
    href: "/initiatives",
    image: require("../assets/home-media/mentorship.webp"),
    alt: "A student in conversation with an alumnus",
  },
  {
    name: "Industrial Learning Program",
    short: "ILP",
    description:
      "Alumni-led projects and internships in summer and winter take learning beyond the classroom.",
    href: "/initiatives",
    image: require("../assets/home-media/learning.webp"),
    alt: "Students discussing work around a table",
  },
];

function ArrowLink({ to, children, className = "" }) {
  const external = /^https?:\/\//.test(to);
  const Target = external ? "a" : Link;
  return (
    <Target
      className={`home-arrow-link ${className}`}
      {...(external ? { href: to, target: "_blank", rel: "noreferrer" } : { to })}
    >
      <span>{children}</span>
      <span className="home-arrow" aria-hidden="true">
        ↗
      </span>
    </Target>
  );
}

export default function Home() {
  const [events, setEvents] = useState(aluminationEvents);
  const [now, setNow] = useState(() => Date.now());
  const currentEvents = events
    .filter((event) => now <= Date.parse(event.end_time))
    .sort((a, b) => Date.parse(a.start_time) - Date.parse(b.start_time))
    .slice(0, 3);
  const [activePhoto, setActivePhoto] = useState(0);
  const [paused, setPaused] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const menuButton = useRef(null);

  useEffect(() => {
    const clock = window.setInterval(() => setNow(Date.now()), 60 * 1000);
    const endpoint = process.env.REACT_APP_SARC_EVENTS_URL ||
      (process.env.NODE_ENV === "production" ? "/api/sarc-events/" : null);
    if (!endpoint) return () => window.clearInterval(clock);

    let active = true;
    const refresh = async () => {
      try {
        const response = await fetch(endpoint, { cache: "no-store" });
        if (!response.ok) return;
        const result = await response.json();
        if (active && Array.isArray(result.events)) setEvents(result.events);
      } catch (_error) {
        // Keep the dated local fallback when the live feed is unavailable.
      }
    };
    refresh();
    const poll = window.setInterval(refresh, 15 * 60 * 1000);
    return () => {
      active = false;
      window.clearInterval(clock);
      window.clearInterval(poll);
    };
  }, []);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (event) => setReducedMotion(event.matches);
    motion.addEventListener("change", onChange);
    return () => motion.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      duration: 1.05,
      smoothWheel: true,
      syncTouch: false,
      respectReducedMotion: true,
    });
    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    if (reducedMotion || paused) return undefined;
    const timer = window.setInterval(() => {
      if (!document.hidden)
        setActivePhoto((current) => (current + 1) % photos.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="sarc-home">
      <a className="home-skip" href="#main">
        Skip to content
      </a>
      <header className="home-header home-container">
        <Link
          className="home-brand"
          to="/"
          aria-label="SARC, IIT Bombay home"
          onClick={closeMenu}
        >
          <span className="home-logo" aria-hidden="true" />
        </Link>
        <nav className="home-desktop-nav" aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#programs">Programs</a>
          <a href={sarcCalendar} target="_blank" rel="noreferrer">Events</a>
          <Link to="/gallery">Gallery</Link>
          <Link className="home-nav-contact" to="/contact">
            Get in touch <span aria-hidden="true">↗</span>
          </Link>
        </nav>
        <button
          ref={menuButton}
          className="home-menu-button"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="home-mobile-nav"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
      </header>
      <nav
        className={`home-mobile-nav ${menuOpen ? "is-open" : ""}`}
        id="home-mobile-nav"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <a href="#about" onClick={closeMenu}>
          About
        </a>
        <a href="#programs" onClick={closeMenu}>
          Programs
        </a>
        <a href={sarcCalendar} target="_blank" rel="noreferrer" onClick={closeMenu}>
          Events
        </a>
        <Link to="/gallery" onClick={closeMenu}>
          Gallery
        </Link>
        <Link to="/contact" onClick={closeMenu}>
          Get in touch
        </Link>
      </nav>

      <main id="main">
        <section className="home-hero" aria-labelledby="home-title">
          <div className="home-hero-photos" aria-hidden="true">
            {photos.map((photo, index) =>
              index === 0 ? (
                <picture key={photo}>
                  <source
                    media="(max-width: 700px)"
                    srcSet={require("../assets/home-media/hero-gathering-mobile.webp")}
                  />
                  <img
                    className={index === activePhoto ? "is-active" : ""}
                    src={photo}
                    alt=""
                    fetchpriority="high"
                  />
                </picture>
              ) : (
                <img
                  key={photo}
                  className={index === activePhoto ? "is-active" : ""}
                  src={photo}
                  alt=""
                />
              ),
            )}
          </div>
          <div className="home-hero-shade" />
          <div className="home-hero-content home-container">
            <p className="home-hero-overline">
              The student and alumni community at IIT Bombay
            </p>
            <h1 id="home-title">
              Connections
              <br />
              that stay.
            </h1>
            <p className="home-hero-description">
              Mentorship, events and initiatives that bring students and alumni
              together.
            </p>
            <ArrowLink to="/initiatives" className="home-hero-cta">
              Explore our initiatives
            </ArrowLink>
          </div>
          <div className="home-hero-bottom home-container">
            <span>
              Student Alumni Relations Cell{" "}
              <span className="home-hero-divider">/</span> IIT Bombay
            </span>
            <div className="home-photo-controls" aria-label="Hero photographs">
              {photos.map((photo, index) => (
                <button
                  key={photo}
                  type="button"
                  onClick={() => setActivePhoto(index)}
                  aria-label={`Show photograph ${index + 1}`}
                  aria-current={index === activePhoto ? "true" : undefined}
                >
                  {String(index + 1).padStart(2, "0")}
                </button>
              ))}
              <button
                className="home-pause"
                type="button"
                onClick={() => setPaused(!paused)}
                aria-label={paused ? "Play photographs" : "Pause photographs"}
              >
                {paused ? "▶" : "Ⅱ"}
              </button>
            </div>
          </div>
        </section>

        <nav className="home-pathways home-container" aria-label="Explore SARC">
          <ArrowLink to="/initiatives">
            <small>Find guidance</small>
            <strong>For students</strong>
          </ArrowLink>
          <ArrowLink to="/contact">
            <small>Stay involved</small>
            <strong>For alumni</strong>
          </ArrowLink>
          <ArrowLink to={sarcCalendar}>
            <small>Come together</small>
            <strong>Events</strong>
          </ArrowLink>
        </nav>

        <section
          className="home-about home-container"
          id="about"
          aria-labelledby="home-about-title"
        >
          <div className="home-about-copy">
            <h2 id="home-about-title">
              A bridge between campus life and everything that comes after.
            </h2>
            <p>
              SARC is a student-run team working with the Dean Alumni and
              Corporate Relations office at IIT Bombay. We create opportunities
              for students and alumni to share experience, build relationships
              and return to campus life.
            </p>
            <ArrowLink to="/contact">Meet the team</ArrowLink>
          </div>
          <figure className="home-about-figure">
            <img
              src={require("../assets/home-media/conversation.webp")}
              alt="An alumnus and student speaking across a table"
              loading="lazy"
            />
            <figcaption>
              Conversations across generations at IIT Bombay.
            </figcaption>
          </figure>
        </section>

        <section
          className="home-programs"
          id="programs"
          aria-labelledby="home-programs-title"
        >
          <div className="home-container">
            <div className="home-section-intro">
              <h2 id="home-programs-title">Ways to connect.</h2>
              <p>
                From conversations at Alumination to yearlong guidance, find
                your way into the SARC community.
              </p>
            </div>
            <div className="home-events-layout">
              <div className="home-events-current">
                <div className="home-events-heading">
                  <h3>Upcoming events</h3>
                </div>
                {currentEvents.length > 0 ? (
                  <div className="home-events-list">
                    {currentEvents.map((event) => (
                      <a
                        className="home-event-item"
                        href={event.url}
                        target="_blank"
                        rel="noreferrer"
                        key={event.name}
                      >
                        <time dateTime={event.start_time}>
                          <strong>{eventDateParts(event.start_time).day}</strong>
                          <span>{eventDateParts(event.start_time).month}</span>
                        </time>
                        <span className="home-event-details">
                          <strong>{event.name}</strong>
                          <small>
                            {eventTime.format(new Date(event.start_time))} – {eventTime.format(new Date(event.end_time))}
                            {event.venue ? ` · ${event.venue}` : ""}
                          </small>
                        </span>
                        <span className="home-event-arrow" aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="home-events-empty">
                    No new dates are listed here right now. Explore the
                    initiatives that keep students and alumni connected.
                  </p>
                )}
                <Link className="home-events-more" to="/initiatives">
                  Explore more events <span aria-hidden="true">↗</span>
                </Link>
              </div>
              <a
                className="home-event-feature"
                href={sarcCalendar}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={require("../assets/home-media/alumination-conversation.webp")}
                  alt="Speakers in conversation at Alumination"
                  loading="lazy"
                />
                <div>
                  <span>Student–alumni festival</span>
                  <h3>Alumination</h3>
                  <p>Mentoring, talks and workshops bring students and alumni together on campus.</p>
                  <strong>Explore SARC events <span aria-hidden="true">↗</span></strong>
                </div>
              </a>
            </div>
            <div className="home-program-list">
              {programs.map((program) => (
                <Link
                  className="home-program"
                  to={program.href}
                  key={program.short}
                >
                  <div className="home-program-image">
                    <img src={program.image} alt={program.alt} loading="lazy" />
                  </div>
                  <div className="home-program-title">
                    <small>{program.short}</small>
                    <h3>{program.name}</h3>
                  </div>
                  <p>{program.description}</p>
                  <span className="home-program-arrow" aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
            <ArrowLink className="home-all-programs" to="/initiatives">
              Explore all initiatives
            </ArrowLink>
          </div>
        </section>

        <section className="home-gallery" aria-labelledby="home-gallery-title">
          <div className="home-container home-gallery-layout">
            <div className="home-gallery-copy">
              <h2 id="home-gallery-title">The moments we make together.</h2>
              <p>
                Talks, reunions and the conversations in between. A look at the
                people who keep the connection alive.
              </p>
              <ArrowLink to="/gallery">View the gallery</ArrowLink>
            </div>
            <div className="home-gallery-images">
              <img
                src={require("../assets/home-media/campus-gathering.webp")}
                alt="Students gathered together on campus"
                loading="lazy"
              />
              <img
                src={require("../assets/home-media/alumination-stage.webp")}
                alt="Students and alumni together on the Alumination stage"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section
          className="home-close home-container"
          aria-labelledby="home-close-title"
        >
          <h2 id="home-close-title">
            There is always a way back to the conversation.
          </h2>
          <ArrowLink to="/contact">Get in touch with SARC</ArrowLink>
        </section>
      </main>
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
            <a href={sarcCalendar} target="_blank" rel="noreferrer">Events</a>
            <Link to="/gallery">Gallery</Link>
            <Link to="/contact">Contact</Link>
          </nav>
          <div className="home-footer-social">
            <a
              href="https://www.instagram.com/sarc_iitb/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram ↗
            </a>
            <a
              href="https://acr.iitbombay.org/"
              target="_blank"
              rel="noreferrer"
            >
              Dean ACR Office ↗
            </a>
          </div>
        </div>
        <div className="home-container home-footer-bottom">
          <span>© {new Date().getFullYear()} SARC, IIT Bombay</span>
          <a href="#main">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}
