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

const audiences = {
  students: {
    tab: "I’m a student",
    intro: "Guidance, stories and people to learn from while you’re on campus.",
    links: [
      {
        label: "Find guidance",
        title: "Get a mentor",
        note: "Yearlong one-to-one pairing with an alumnus.",
        to: "/initiatives",
      },
      {
        label: "Learn from experience",
        title: "Alumni advice",
        note: "What alumni wish they had known at your stage.",
        to: "/alumni-advice",
      },
      {
        label: "Read more",
        title: "Stories & blogs",
        note: "Experiences shared by the SARC community.",
        to: "/blogs",
      },
    ],
  },
  alumni: {
    tab: "I’m an alumnus",
    intro: "Come back, meet fellow alumni and help the next batch find its way.",
    links: [
      {
        label: "Give back",
        title: "Mentor a student",
        note: "Share your journey through ASMP and ILP.",
        to: "/initiatives",
      },
      {
        label: "Reconnect",
        title: "Meet alumni",
        note: "See who is part of the SARC network.",
        to: "/alum",
      },
      {
        label: "Stay involved",
        title: "Reach the team",
        note: "Tell us how you would like to take part.",
        to: "/contact",
      },
    ],
  },
};

// Figures are the ones already published on SARC's About page (/aboutUs).
// Update them here if SARC's numbers change.
const stats = [
  { value: 70000, label: "alumni in the network" },
  { value: 14000, label: "students on campus" },
  { value: 50, label: "events and counting" },
];

function CountUp({ value, reducedMotion }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(reducedMotion ? value : 0);

  useEffect(() => {
    if (reducedMotion) {
      setShown(value);
      return undefined;
    }
    const node = ref.current;
    let frame;
    const run = () => {
      const start = performance.now();
      const duration = 1600;
      const tick = (time) => {
        const t = Math.min((time - start) / duration, 1);
        setShown(Math.round(value * (1 - Math.pow(1 - t, 3))));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };
    if (!("IntersectionObserver" in window)) {
      setShown(value);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        run();
      },
      { threshold: 0.6 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, reducedMotion]);

  return (
    <span ref={ref} aria-label={`${value.toLocaleString("en-IN")}+`}>
      <span aria-hidden="true">{shown.toLocaleString("en-IN")}+</span>
    </span>
  );
}

// Quotes are taken word for word from SARC's alumni advice page (/alumni-advice).
const voices = [
  {
    quote:
      "Try to find your passion — what you love thinking about and doing. If you can find a career doing something you are already passionate about, the finances will flow, along with a better balance in life.",
    author: "Neha Gupta",
    batch: "2004",
  },
  {
    quote:
      "Look for mentors who are in a place you would like to be, doing what you would like to do. Seek their counsel.",
    author: "Anonymous",
    batch: "1983",
  },
  {
    quote:
      "Keep re-inventing yourself through self-education, because industries change quickly.",
    author: "Rahul Sharma",
    batch: "1973",
  },
];

function Reveal({ children, delay = 0, className = "", reducedMotion }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(reducedMotion || !("IntersectionObserver" in window));

  useEffect(() => {
    if (seen) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setSeen(true);
        observer.disconnect();
      },
      { threshold: 0.25 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [seen]);

  return (
    <div
      ref={ref}
      className={`home-reveal ${seen ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const teaserPhotos = [
  {
    src: require("../assets/home-media/campus-gathering.webp"),
    alt: "Students gathered together on campus",
  },
  {
    src: require("../assets/home-media/alumination-stage.webp"),
    alt: "Students and alumni together on the Alumination stage",
  },
  {
    src: require("../assets/home-media/mentorship.webp"),
    alt: "A student in conversation with an alumna",
  },
  {
    src: require("../assets/home-media/learning.webp"),
    alt: "Students discussing work around a table",
  },
];

function GalleryTeaser() {
  return (
    <div className="home-teaser">
      {teaserPhotos.map((photo, index) => (
        <Link
          key={photo.src}
          to="/gallery"
          className="home-teaser-card"
          aria-label={`Open the gallery: ${photo.alt}`}
          style={{ transitionDelay: `${index * 40}ms` }}
        >
          <img src={photo.src} alt="" loading="lazy" />
        </Link>
      ))}
      <Link to="/gallery" className="home-teaser-card is-more">
        <span>
          See all photos
        </span>
      </Link>
    </div>
  );
}

function ArrowLink({ to, children, className = "", style }) {
  const external = /^https?:\/\//.test(to);
  const Target = external ? "a" : Link;
  return (
    <Target
      className={`home-arrow-link ${className}`}
      style={style}
      {...(external ? { href: to, target: "_blank", rel: "noreferrer" } : { to })}
    >
      <span>{children}</span>
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
  const pastEvents = events
    .filter((event) => now > Date.parse(event.end_time))
    .sort((a, b) => Date.parse(b.start_time) - Date.parse(a.start_time))
    .slice(0, 3);
  const [activePhoto, setActivePhoto] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [audience, setAudience] = useState("students");

  const onAudienceKey = (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    const keys = Object.keys(audiences);
    const next = keys[(keys.indexOf(audience) + 1) % keys.length];
    setAudience(next);
    document.getElementById(`audience-tab-${next}`)?.focus();
    event.preventDefault();
  };

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



  return (
    <div className="sarc-home">
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
              {[["Connections"], ["that", "stay."]].map((line, lineIndex) => (
                <span className="home-hero-line" key={line.join(" ")}>
                  {line.map((word, wordIndex) => (
                    <span className="home-hero-word" key={word}>
                      <span
                        style={{
                          animationDelay: `${0.15 + (lineIndex * 2 + wordIndex) * 0.12}s`,
                        }}
                      >
                        {word}
                      </span>
                    </span>
                  ))}
                </span>
              ))}
            </h1>
            <p className="home-hero-description">
              Mentorship, events and initiatives that bring students and alumni
              together.
            </p>
            <div className="home-hero-actions">
              {Object.entries(audiences).map(([key, item]) => (
                <a
                  key={key}
                  href="#audience"
                  className={`home-arrow-link home-hero-cta ${key === "alumni" ? "is-outline" : ""}`}
                  onClick={() => setAudience(key)}
                >
                  <span>{item.tab}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="home-hero-bottom home-container">
            <span>
              Student Alumni Relations Cell{" "}
              <span className="home-hero-divider">/</span> IIT Bombay
            </span>
            <div className="home-photo-controls" aria-label="Hero photographs">
              {[
                { label: "Previous photograph", glyph: "←", step: -1 },
                { label: "Next photograph", glyph: "→", step: 1 },
              ].map((control) => (
                <button
                  key={control.label}
                  type="button"
                  aria-label={control.label}
                  onClick={() => {
                    // Using the arrows hands control to the visitor, so autoplay stops.
                    setPaused(true);
                    setActivePhoto(
                      (current) =>
                        (current + control.step + photos.length) % photos.length,
                    );
                  }}
                >
                  <span aria-hidden="true">{control.glyph}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section
          className="home-audience home-container"
          id="audience"
          aria-label="Explore SARC"
        >
          <div className="home-audience-head">
            <p className="home-audience-prompt">What brings you here?</p>
            <div
              className="home-audience-tabs"
              role="tablist"
              aria-label="Choose your path"
              onKeyDown={onAudienceKey}
            >
              {Object.entries(audiences).map(([key, item]) => (
                <button
                  key={key}
                  id={`audience-tab-${key}`}
                  type="button"
                  role="tab"
                  aria-selected={audience === key}
                  aria-controls="audience-panel"
                  tabIndex={audience === key ? 0 : -1}
                  onClick={() => setAudience(key)}
                >
                  {item.tab}
                </button>
              ))}
            </div>
          </div>
          <div
            className="home-audience-panel"
            id="audience-panel"
            role="tabpanel"
            aria-labelledby={`audience-tab-${audience}`}
            key={audience}
          >
            <p className="home-audience-intro">{audiences[audience].intro}</p>
            <div className="home-pathways">
              {audiences[audience].links.map((link, index) => (
                <ArrowLink
                  key={link.to + link.title}
                  to={link.to}
                  style={{ animationDelay: `${0.08 + index * 0.09}s` }}
                >
                  <span>
                    <small>{link.label}</small>
                    <strong>{link.title}</strong>
                    <span className="home-path-note">{link.note}</span>
                  </span>
                </ArrowLink>
              ))}
            </div>
          </div>
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
                      </a>
                    ))}
                  </div>
                ) : (
                  <>
                    <p className="home-events-empty">
                      Nothing is scheduled right now.
                      {pastEvents.length > 0
                        ? " Here is what happened recently."
                        : " Explore the initiatives that keep students and alumni connected."}
                    </p>
                    {pastEvents.length > 0 && (
                      <div className="home-events-list is-past">
                        {pastEvents.map((event) => (
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
                              <small>Recent{event.venue ? ` · ${event.venue}` : ""}</small>
                            </span>
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                )}
                <Link className="home-events-more" to="/initiatives">
                  Explore more events
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
                  <strong>Explore SARC events</strong>
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
                </Link>
              ))}
            </div>
            <ArrowLink className="home-all-programs" to="/initiatives">
              Explore all initiatives
            </ArrowLink>
          </div>
        </section>

        <section className="home-stats home-container" aria-label="SARC in numbers">
          {stats.map((stat) => (
            <div className="home-stat" key={stat.label}>
              <strong>
                <CountUp value={stat.value} reducedMotion={reducedMotion} />
              </strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </section>

        <section
          className="home-voices home-container"
          aria-labelledby="home-voices-title"
        >
          <div className="home-voices-head">
            <h2 id="home-voices-title">Advice that stays with you.</h2>
            <ArrowLink to="/alumni-advice">More alumni advice</ArrowLink>
          </div>
          <div className="home-voices-grid">
            {voices.map((voice, index) => (
              <Reveal key={voice.author} delay={index * 120} reducedMotion={reducedMotion}>
                <figure className="home-voice">
                  <span className="home-voice-mark" aria-hidden="true">
                    “
                  </span>
                  <blockquote>{voice.quote}</blockquote>
                  <figcaption>
                    <strong>{voice.author}</strong>
                    <span>Batch of {voice.batch}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>

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

        <section className="home-gallery" aria-labelledby="home-gallery-title">
          <div className="home-container">
            <div className="home-gallery-copy home-gallery-intro">
              <h2 id="home-gallery-title">The moments we make together.</h2>
              <div>
                <p>
                  Talks, reunions and the conversations in between. A look at
                  the people who keep the connection alive.
                </p>
                <ArrowLink to="/gallery">View the gallery</ArrowLink>
              </div>
            </div>
            <GalleryTeaser />
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
    </div>
  );
}
