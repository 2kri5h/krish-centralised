import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import "./Initiatives.css";

// Content adapted from pages/Initiatives.js. Add entries here, independently
// of the presentation. Every entry is rendered as an initiative card.
export const initiativesData = [
  { id: "asmp", category: "Mentorship", short: "ASMP", title: "Alumni Student Mentorship Program", description: "A yearlong connection between students and experienced alumni. Through one-on-one mentorship, students gain perspective, confidence, and guidance as they work towards their ambitions.", note: "One-on-one guidance. A lasting connection.", href: "https://asmp.sarc-iitb.org" },
  { id: "ilp", category: "Industry experience", short: "ILP", title: "Industrial Learning Program", description: "An opportunity to learn beyond the classroom through alumni-led internships and projects. Held in summer and winter, ILP brings students closer to real-world challenges and experienced professionals.", note: "Real-world projects. Firsthand experience.", href: "https://ilp.sarc-iitb.org" },
  { id: "alumination", category: "Our flagship fest", title: "Alumination", description: "The SARC student-alumni fest brings together inspiring stories, interactive sessions, and opportunities to connect. Explore new perspectives through events including Beyond the Horizon, Trailblazers, and UnEngineering.", href: "https://alumination.sarc-iitb.org" },
  { id: "transverse", category: "Shared perspectives", title: "Transverse Mentoring", description: "A space for mentoring conversations, exchanging perspectives, and learning from one another across different experiences." },
  { id: "seekout", category: "Conversations & discovery", title: "Seekout", description: "Explore questions, exchange ideas, and discover perspectives from the wider student-alumni community." },
  { id: "class-song", category: "Campus memories", title: "Class Song", description: "Celebrating the memories, friendships, and shared experiences that make a batch's time at IIT Bombay its own." },
  { id: "exam-series", category: "Learning & preparation", title: "Exam Series", description: "A space for students to exchange preparation experiences and insights as they navigate their academic journeys." },
  { id: "mock-interviews", category: "Career preparation", title: "Mock Interviews", description: "Alumni conduct simulated interviews and share practical feedback, helping students build confidence, improve communication, and present their strengths." },
  { id: "ask-the-alum", category: "Alumni insights", title: "Ask the Alum", description: "Interactive online conversations where students can ask alumni about career choices, industry experiences, and personal growth." },
  { id: "sam", category: "Community", title: "Student Alumni Meet", description: "Interactive sessions and networking opportunities that connect current students with alumni to discuss career paths, industry trends, and life after graduation." },
  { id: "asis", category: "Knowledge sharing", title: "Alumni Student Interaction Series", description: "Talks, panel discussions, and question-and-answer sessions with distinguished alumni offer insights into diverse careers and personal growth." },
  { id: "hostel-meet", category: "Campus community", title: "Hostel Alumni Meet", description: "Current residents and hostel alumni share stories and advice while celebrating the traditions that connect generations." },
  { id: "campus-visit", category: "Returning to campus", title: "Alumni Campus Visit", description: "Guided campus visits and interactions with current students welcome alumni back to IIT Bombay." },
  { id: "website", category: "Digital connections", title: "Alumni Website", description: "A central hub for alumni information, events, resources, and opportunities to stay engaged with IIT Bombay." },
  { id: "social", category: "Community updates", title: "Alumni Social Media", description: "Stay connected through community news, alumni stories, event announcements, and campus memories." },
  { id: "reunions", category: "Shared memories", title: "Alumni Reunions", description: "Milestone batch gatherings bring alumni back together to reconnect with classmates and revisit their campus journeys." },
  { id: "valedictory", category: "A new beginning", title: "Institute Valedictory Function", description: "A farewell celebrating students' journeys at IIT Bombay, honouring achievements and shared memories as they become alumni." },
];



function InitiativeCard({ item, index, reduced }) {
  return (
    <motion.article
      className="ini-card"
      aria-labelledby={`initiative-${item.id}`}
      initial={reduced ? false : { opacity: 0, y: -32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="ini-card-top"><p className="ini-category">{item.category}</p></div>
      <h3 id={`initiative-${item.id}`}>{item.title}</h3>
      <p className="ini-description">{item.description}</p>
      {item.href && <a className="ini-card-link" href={item.href}>Explore {item.short || item.title}</a>}
    </motion.article>
  );
}

export default function Initiatives() {
  const reduced = useReducedMotion();
  const page = useRef(null);
  const hero = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: hero,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, 55]);
  const decorationY = useTransform(heroProgress, [0, 1], [0, 110]);
  const decorationScale = useTransform(heroProgress, [0, 1], [1, 1.12]);
  const { scrollYProgress } = useScroll({ target: page, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  function explore(event) {
    event.preventDefault();
    const section = document.getElementById("ini-programs");
    section?.scrollIntoView({ behavior: reduced ? "instant" : "smooth" });
    section?.focus({ preventScroll: true });
  }
  return (
    <main className="sarc-initiatives" ref={page}>
      {!reduced && <motion.div className="ini-scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />}
      <header className="ini-hero" ref={hero}>
        <motion.div className="ini-hero-decoration" style={reduced ? undefined : { y: decorationY, scale: decorationScale }} aria-hidden="true"><span /><span /><span /></motion.div>
        <motion.div className="ini-container ini-hero-content" style={reduced ? undefined : { y: heroY }} initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0 : 0.7 }}>
          <h1>Our <span>Initiatives</span></h1>
          <p className="ini-hero-subtitle">Connecting students. Inspiring possibilities.</p>
          <p className="ini-hero-description">Explore the programs and experiences that bring students and alumni together through mentorship, learning, and lifelong connections.</p>
          <a className="ini-explore" href="#ini-programs" onClick={explore}>Explore our initiatives</a>
        </motion.div>
      </header>
      <section className="ini-container ini-programs" id="ini-programs" aria-labelledby="ini-programs-heading" tabIndex={-1}>
        <motion.div className="ini-section-heading" initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reduced ? 0 : 0.65 }}>
          <h2 id="ini-programs-heading">Opportunities for every journey</h2>
        </motion.div>
        <div className="ini-grid">
          {initiativesData.map((item, index) => <InitiativeCard key={item.id} item={item} index={index} reduced={reduced} />)}
        </div>
      </section>
    </main>
  );
}
