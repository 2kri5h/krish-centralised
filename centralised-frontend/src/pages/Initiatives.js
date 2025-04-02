import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import "./Initiatives.css";

// Real SARC initiatives data based on provided information
const initiatives = [
  {
    id: "asmp",
    title: "ALUMNI STUDENT MENTORSHIP PROGRAM",
    subtitle: "Where Students Aspire, Alumni Inspire",
    description: "A yearlong mentorship initiative, this program connects students with experienced alumni who guide them toward their ambitions. Through one-on-one mentorship, get valuable insights, self-belief, and strategic advice. A journey where students aspire and alumni inspire.",
    color: "#FF6B2B",
    keyPoints: [
      "One-on-one mentorship with experienced alumni",
      "Year-long personalized guidance",
      "Strategic career advice and insights",
      "Building self-belief and confidence"
    ]
  },
  {
    id: "ilp",
    title: "INDUSTRIAL LEARNING PROGRAM",
    subtitle: "Real Projects. Real Experience.",
    description: "ILP offers students the opportunity to gain hands-on experience through internships and projects provided by our alumni. Held twice a year, in summers and winters, it enables meaningful industry exposure and skill development. Participants work on real-world challenges while receiving mentorship from seasoned professionals.",
    color: "#4A7CFF",
    keyPoints: [
      "Hands-on industry experience",
      "Real-world projects and challenges",
      "Mentorship from seasoned professionals",
      "Offered in summer and winter sessions"
    ]
  },
  {
    id: "transverse-mentoring",
    title: "TRANSVERSE MENTORING",
    subtitle: "Navigate Your Career Crossroads",
    description: "A session designed to help you navigate career crossroads, Transverse Mentoring connects you with alumni from two similar yet distinct fields. Gain clarity on the differences, opportunities and challenges of each path in a single session. Ask questions, clear doubts, and make informed career choices with guidance from those who've been there before.",
    color: "#00A8CC",
    keyPoints: [
      "Connect with alumni from two related fields",
      "Compare career paths side-by-side",
      "Ask questions and clear doubts",
      "Make informed career decisions"
    ]
  },
  {
    id: "class-song",
    title: "CLASS SONG",
    subtitle: "The Soundtrack of Your Journey",
    description: "A musical tribute to the graduating batch, Class Song captures the essence of their journey at IIT Bombay. It celebrates friendships, nostalgia, and the countless unforgettable moments on campus. A heartfelt soundtrack that brings together memories and milestones - marking the end of one beautiful chapter.",
    color: "#FF4E50",
    keyPoints: [
      "Musical tribute to graduating students",
      "Celebrates campus memories and friendships",
      "Captures the essence of the IIT Bombay experience",
      "Meaningful farewell gift"
    ]
  },
  {
    id: "exam-series",
    title: "EXAM SERIES",
    subtitle: "Expert Insights for Competitive Success",
    description: "Exam Series is an initiative that connects students with seasoned professionals and accomplished alumni to provide expert insights on competitive exams like UPSC, CAT, CFA, GMAT and more. Learn strategies, sharpen your skills, and gain the confidence needed to ace your targeted exam.",
    color: "#7B61FF",
    keyPoints: [
      "Guidance for competitive exams (UPSC, CAT, GMAT, etc.)",
      "Learn from alumni who've succeeded",
      "Strategic preparation tips and resources",
      "Confidence-building approach"
    ]
  },
  {
    id: "seekout",
    title: "SEEKOUT",
    subtitle: "The Ultimate Campus Crypt Hunt",
    description: "Insti's biggest crypt hunt, SeekOut, is the ultimate test of Insti knowledge, packed with puzzles and challenges. Solve clues, unlock secrets and race against others to claim exciting prizes. A thrilling adventure that puts your wit and campus know-how to the test!",
    color: "#00BFA6",
    keyPoints: [
      "Campus-wide puzzle and clue hunt",
      "Test your Insti knowledge and wit",
      "Exciting challenges and racing",
      "Compete for amazing prizes"
    ]
  },
  {
    id: "beyond-horizon",
    title: "BEYOND THE HORIZON",
    subtitle: "Extraordinary Journeys in Unconventional Fields",
    description: "Beyond the Horizon spotlights IIT Bombay alumni who have carved unconventional paths in fields such as stand-up comedy, filmmaking, music and more. They share their journeys, challenges and defining moments, offering a glimpse into lives beyond the conventional career tracks. An inspiring event that encourages students to explore and embrace paths that are less travelled.",
    color: "#F76B1C",
    keyPoints: [
      "Featuring alumni in unconventional careers",
      "Insights into creative fields like comedy, film, music",
      "Personal stories and defining moments",
      "Inspiration for non-traditional paths"
    ]
  },
  {
    id: "unengineering",
    title: "UN-ENGINEERING",
    subtitle: "Breaking the Career Mold",
    description: "UnEngineering showcases alumni who ventured beyond engineering into unconventional careers. Breaking the mold, they have made their mark in fields like arts, entrepreneurship, journalism, and public service. This dynamic session brings inspiring stories, bold choices, and new perspectives on success.",
    color: "#5C54AD",
    keyPoints: [
      "Alumni who ventured beyond traditional engineering",
      "Success stories in diverse fields",
      "Inspiration for alternative career paths",
      "Bold choices and unique perspectives"
    ]
  },
  {
    id: "trailblazers",
    title: "TRAILBLAZERS",
    subtitle: "First-of-their-kind Innovators",
    description: "The event honours alumni who were the first to achieve something remarkable—true innovators in their fields. It highlights their journeys, challenges and breakthroughs. The goal is to inspire and guide others through their experiences. This is where innovation begins, and new paths are forged.",
    color: "#A155B9",
    keyPoints: [
      "Celebrating pioneering alumni achievements",
      "Breakthrough stories and innovation journeys",
      "First-of-their-kind accomplishments",
      "Inspiration for future innovators"
    ]
  },
  {
    id: "startitup",
    title: "START IT UP",
    subtitle: "From Idea to Enterprise",
    description: "An exclusive session where IIT Bombay alumni entrepreneurs share their startup journeys, challenges and successes. Start It Up brings firsthand insights into the world of entrepreneurship. Gain valuable lessons, inspiration and guidance from those who turned ideas into reality. A celebration of passion, resilience, and innovation.",
    color: "#FF9933",
    keyPoints: [
      "Alumni entrepreneur success stories",
      "Real startup journeys and challenges",
      "Lessons in resilience and innovation",
      "Guidance for aspiring entrepreneurs"
    ]
  },
  {
    id: "break-the-ice",
    title: "BREAK THE ICE",
    subtitle: "Building Mentor Relationships",
    description: "A one-on-one mentoring session where students connect with ASMP mentors to share stories, experiences and career insights. It's an opportunity to build meaningful relationships, gain guidance and navigate future career paths with the support of experienced professionals.",
    color: "#0077B6",
    keyPoints: [
      "One-on-one sessions with ASMP mentors",
      "Building meaningful mentorship relationships",
      "Sharing stories and experiences",
      "Personalized career guidance"
    ]
  },
  {
    id: "innovation-expo",
    title: "INNOVATION EXPO",
    subtitle: "Showcasing Breakthrough Ideas",
    description: "A hub of groundbreaking startups, visionary VCs and cutting-edge research, this exhibition brings together the brightest minds in innovation. Alumni-led initiatives take center stage, offering insights into emerging technologies and entrepreneurial journeys. It's a space to explore ideas, connect with industry leaders and witness innovation in action.",
    color: "#3EDBF0",
    keyPoints: [
      "Exhibition of groundbreaking startups",
      "Alumni-led innovation initiatives",
      "Emerging technology showcases",
      "Networking with industry leaders"
    ]
  },
  {
    id: "mock-interviews",
    title: "MOCK INTERVIEWS & GROUP DISCUSSIONS",
    subtitle: "Practice Makes Perfect",
    description: "A program that provides industry-specific guidance from experienced alumni mentors. Through simulated placement scenarios, participants refine their skills and gain confidence. These sessions cover various fields, offering valuable career insights. Final-year students also earn incentive points upon completion.",
    color: "#FF5A5F",
    keyPoints: [
      "Simulated industry-specific interviews",
      "Practice with experienced alumni mentors",
      "Skill refinement and confidence building",
      "Incentive points for final-year students"
    ]
  },
  {
    id: "group-mentoring",
    title: "GROUP MENTORING",
    subtitle: "Field-Specific Career Guidance",
    description: "A one-day event where alumni from diverse fields like Finance, Consulting, IT, Analytics, Quantitative Finance, and Product Management share their experiences and insights. Through interactive discussions, participants gain a deeper understanding of various career paths, industry trends and essential skills needed for professional growth.",
    color: "#7209B7",
    keyPoints: [
      "Guidance from alumni across diverse fields",
      "Interactive career discussions",
      "Industry trends and insights",
      "Essential professional skills development"
    ]
  },
  {
    id: "hostalgia",
    title: "HOSTALGIA",
    subtitle: "Where Memories Come Home",
    description: "Alumni return to their hostels, retracing their journey and reliving memories that have stood the test of time. They share stories of friendships, challenges, and growth, reflecting on how their experiences shaped them. It's a heartfelt reunion, blending nostalgia with inspiration, as past and present come together.",
    color: "#FB8500",
    keyPoints: [
      "Alumni revisit their hostel experiences",
      "Sharing formative campus memories",
      "Connecting past and present students",
      "Nostalgic storytelling and inspiration"
    ]
  },
  {
    id: "shadow-program",
    title: "SHADOW PROGRAM",
    subtitle: "Real-World Career Experience",
    description: "An opportunity to step beyond the classroom, Shadow Program offers behind-the-scenes industry visits. Learn directly from experts, witness real-world applications, and gain insights into different fields. A unique experience to expand your perspective and explore career possibilities.",
    color: "#457B9D",
    keyPoints: [
      "Behind-the-scenes industry visits",
      "Learning directly from professionals",
      "Witnessing workplace applications",
      "Exploring diverse career fields"
    ]
  },
  {
    id: "sarcathon",
    title: "SARCathon",
    subtitle: "The Ultimate Battle of Brains",
    description: "A nationwide Pan-IIT competition, SARCathon an ultimate test of intellect and innovation. With participation from the brightest minds and evaluation by distinguished alumni, it's a battle of brains. Compete, create, and claim your spot among India's top problem solvers!",
    color: "#6A0572",
    keyPoints: [
      "Nationwide Pan-IIT competition",
      "Test of intellect and innovation",
      "Evaluation by distinguished alumni",
      "Recognition for top problem solvers"
    ]
  },
  {
    id: "alumination",
    title: "ALUMINATION",
    subtitle: "The Flagship Alumni-Student Festival",
    description: "Alumination is the flagship Student-Alumni Fest of SARC, bringing together alumni from across the globe. An unforgettable experience of learning, networking, and mentorship, it features events like Beyond the Horizon, Trailblazers, UnEngineering, Start It Up, and more. Through inspiring stories and interactive sessions, alumni serve as a guiding light for students navigating their own paths.",
    color: "#FF3366",
    keyPoints: [
      "SARC's flagship student-alumni festival",
      "Global alumni participation",
      "Multiple featured events and sessions",
      "Networking and mentorship opportunities"
    ]
  },
  {
    id: "core-talks",
    title: "CORE TALKS",
    subtitle: "Department-Specific Career Insights",
    description: "Tailored for department-specific career guidance, Core Talks brings alumni to share insights on higher studies and industry experiences. Learn about academic advancements, career prospects, and industry trends in your field. A must-attend for those looking to shape their core career path.",
    color: "#06D6A0",
    keyPoints: [
      "Department-specific career guidance",
      "Higher education and industry insights",
      "Field-specific trends and opportunities",
      "Specialized alumni experiences"
    ]
  },
  {
    id: "upsc-talks",
    title: "UPSC TALKS",
    subtitle: "Civil Services Success Stories",
    description: "UPSC Talks is an event where IIT Bombay alumni who have cleared the UPSC exam share their preparation journey, strategies, and insights. They discuss how they managed their studies during and after their Insti life and provide valuable tips for aspiring candidates. A chance to learn directly from those who have successfully navigated the civil services path.",
    color: "#F94144",
    keyPoints: [
      "UPSC preparation guidance from successful alumni",
      "Strategy sharing and personal journeys",
      "Balancing preparation with institute life",
      "Practical tips for civil services aspirants"
    ]
  },
  {
    id: "nail-the-prep",
    title: "NAIL THE PREP",
    subtitle: "Internship Interview Excellence",
    description: "An event designed for third-year students, NTP helps in internship preparation through hands-on mock interviews. Get direct feedback from experienced alumni and refine your approach. A practical, interactive session to boost confidence and ace your internship interviews.",
    color: "#118AB2",
    keyPoints: [
      "Mock interviews for internship preparation",
      "Targeted at third-year students",
      "Direct feedback from experienced alumni",
      "Practical skills for interview success"
    ]
  },
  {
    id: "pmp",
    title: "PLACEMENT MENTORING PROGRAM",
    subtitle: "Navigating Your Final-Year Options",
    description: "A guided pathway to help final-year students navigate placements—whether in core, non-core, or grad school. Placement Mentoring Program connects you with alumni mentors who offer insights on applications, tricky interview questions, and career strategies. A valuable way to gain clarity and discover the best route to your dream job.",
    color: "#9D4EDD",
    keyPoints: [
      "Final-year placement guidance",
      "Options for core, non-core, and grad school",
      "Application and interview strategies",
      "Alumni mentor connections"
    ]
  },
  {
    id: "ask-the-alum",
    title: "ASK THE ALUM",
    subtitle: "Direct Answers from Experienced Alumni",
    description: "An interactive online session where students get to ask their doubts directly to alumni from various fields. Whether it's career choices, industry insights or personal growth, get firsthand advice. Gain valuable knowledge from those who've walked the path before.",
    color: "#EF476F",
    keyPoints: [
      "Interactive Q&A with alumni",
      "Direct responses to student questions",
      "Diverse field representation",
      "Career and personal growth insights"
    ]
  },
  {
    id: "valedictory",
    title: "INSTITUTE VALEDICTORY FUNCTION",
    subtitle: "Celebrating Your IIT Bombay Journey",
    description: "A grand farewell celebrating your journey at IIT Bombay, featuring inspiring speeches from directors, deans, and accomplished alumni. Institute Valedictory Function marks the transition from student to alumnus, honouring achievements and shared memories.",
    color: "#FFD166",
    keyPoints: [
      "Grand farewell celebration",
      "Speeches from directors and deans",
      "Recognition of student achievements",
      "Transition ceremony to alumni status"
    ]
  }
];

const Initiatives = () => {
  const [activeInitiative, setActiveInitiative] = useState(null);
  const [hoveredInitiative, setHoveredInitiative] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  // Detect mobile on mount and resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Set default active initiative
  useEffect(() => {
    if (!activeInitiative && initiatives.length > 0) {
      setActiveInitiative(initiatives[0].id);
    }
  }, [activeInitiative]);
  
  const handleInitiativeClick = (id) => {
    setActiveInitiative(id);
    setIsExpanded(true);
    
    // Scroll to top on mobile
    if (isMobile) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const handleBackClick = () => {
    setIsExpanded(false);
  };
  
  const getActiveInitiative = () => {
    return initiatives.find(item => item.id === activeInitiative);
  };

  return (
    <div className="initiative-page">
      <div className="initiative-hero">
        <div className="hero-content">
          <h1>Our Initiatives</h1>
          <p className="hero-subtitle">Building bridges between students and alumni through impactful programs</p>
        </div>
      </div>

      <div className="initiative-content">
        {/* For mobile: Show either list or detail */}
        {isMobile ? (
          <>
            {isExpanded ? (
              // Mobile detail view
              <div className="mobile-initiative-detail">
                <button 
                  className="mobile-back-button"
                  onClick={handleBackClick}
                >
                  ← Back
                </button>
                
                <h2 style={{ color: getActiveInitiative()?.color }}>
                  {getActiveInitiative()?.title}
                </h2>
                
                <h3>{getActiveInitiative()?.subtitle}</h3>
                
                <p className="mobile-initiative-description">
                  {getActiveInitiative()?.description}
                </p>
                
                {getActiveInitiative()?.keyPoints && (
                  <div className="mobile-key-points">
                    <h4>Key Features:</h4>
                    <ul>
                      {getActiveInitiative()?.keyPoints.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              // Mobile list view
              <div className="mobile-initiative-list">
                {initiatives.map((initiative) => (
                  <div
                    key={initiative.id}
                    className="mobile-initiative-card"
                    style={{ 
                      background: `linear-gradient(135deg, ${initiative.color} 0%, ${adjustColor(initiative.color, 20)} 100%)`
                    }}
                    onClick={() => handleInitiativeClick(initiative.id)}
                  >
                    <h3>{initiative.title}</h3>
                    <p>{initiative.subtitle}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          // Improved Desktop view with cards
          <div className="desktop-wrapper">
            {initiatives.map((initiative) => (
              <div
                key={initiative.id}
                className="initiative-item"
                style={{ 
                  backgroundColor: initiative.color,
                  color: initiative.color
                }}
                onClick={() => handleInitiativeClick(initiative.id)}
              >
                <h3>{initiative.title}</h3>
                <p>{initiative.subtitle}</p>
                </div>
            ))}
            
            {/* Desktop initiative detail modal */}
            {isExpanded && getActiveInitiative() && (
              <div className="initiative-display" onClick={handleBackClick}>
                <div className="initiative-details" onClick={(e) => e.stopPropagation()}>
                  <button 
                    className="desktop-back-button"
                    onClick={handleBackClick}
                    aria-label="Close"
                  >
                    ×
                  </button>
                  
                  <h2 style={{ color: getActiveInitiative().color }}>
                    {getActiveInitiative().title}
                  </h2>
                  
                  <h3>{getActiveInitiative().subtitle}</h3>
                  
                  <p>{getActiveInitiative().description}</p>
                  
                  {getActiveInitiative().keyPoints && (
                    <div className="initiative-key-points">
                      <h4>Key Features:</h4>
                      <ul>
                        {getActiveInitiative().keyPoints.map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to adjust color brightness
function adjustColor(color, amount) {
  // Convert hex to RGB
  let hex = color;
  if (hex.startsWith('#')) {
    hex = hex.slice(1);
  }
  
  // Convert to RGB
  let r = parseInt(hex.slice(0, 2), 16);
  let g = parseInt(hex.slice(2, 4), 16);
  let b = parseInt(hex.slice(4, 6), 16);
  
  // Adjust
  r = Math.min(255, r + amount);
  g = Math.min(255, g + amount);
  b = Math.min(255, b + amount);
  
  // Convert back to hex
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export default Initiatives;