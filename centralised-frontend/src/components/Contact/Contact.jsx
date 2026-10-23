import React, { useState, useEffect, useRef } from "react";
import "./Contact.css";
import { FaLinkedinIn, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

const councilMembers = [
  {
    portfolio: "ASMP",
    members: [
      {
        name: "Kartavya Gupta",
        linkedinUsername: "guptakartavya",
        instagramUsername: "kart4vya?igsh=MTd2a3ZjeW1yZTl6Mg%3D%3D&utm_source=qr",
        photo: "Kartavya.jpg",
      },
      {
        name: "Bhavya Upadhyay",
        linkedinUsername: "bhavya-upadhyay-baa423332",
        instagramUsername: "bhavyaupadhyay._?igsh=NjQ1MDY3bG56ZnE1&utm_source=qr",
        photo: "Bhavya.jpg",
      },
    ],
  },
  {
    portfolio: "HDA",
    members: [
      {
        name: "Kartikey Mittal",
        linkedinUsername: "kartikey-mittal-784b41321",
        instagramUsername: "kartikeymittal13?utm_source=qr&igsh=NGE5MGFhNTc5Y2Q0",
        photo: "Kartikey.jpg",
      },
      {
        name: "Utkarsh Bansal",
        linkedinUsername: "utkarsh-bansal-b30651328",
        instagramUsername: "utkarsh___bansal",
        photo: "UtkarshBansal.jpeg",
      },
    ],
  },
  {
    portfolio: "Events",
    members: [
      {
        name: "Neeraj Wankhede",
        linkedinUsername: "neeraj-wankhede-650212312?utm_source=share_via&utm_content=profile&utm_medium=member_android",
        instagramUsername: "_w_neeraj_?igsh=eXNqZGd5ajhueDIw",
        photo: "Neeraj.JPG",
      },
      {
        name: "Naitik Agarwal ",
        linkedinUsername: "naitikagarwaliitb?utm_source=share_via&utm_content=profile&utm_medium=member_android",
        instagramUsername: "agarwal_naitik1310?igsh=MXhrbXgzdmo0Z2w3Yw==",
        photo: "Naitik.JPG",
      },
    ],
  },
  {
    portfolio: "Operations",
    members: [
      {
        name: "Atharva Ballal",
        // linkedinUsername: "aditya-aryan-3aba9b250?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        instagramUsername: "atharva___13884?igsh=MWtsZ29ncGRweXowNg==",
        photo: "Atharv.JPG",
      },
      {
        name: "Alok Raj",
        linkedinUsername: "alok-raj-0ab685313",
        instagramUsername: "the_alok01",
        photo: "Alok.JPG",
      },
    ],
  },
  {
    portfolio: "Marketing",
    members: [
      {
        name: "Siya Sarda",
        linkedinUsername: "siyasarda18?utm_source=share_via&utm_content=profile&utm_medium=member_android",
        instagramUsername: "itssiyasarda?igsh=d29vdjVjMzhtdzdm",
        photo: "Siya.jpg",
      },
      {
        name: "Seshvar",
        linkedinUsername: "seshvar-w-r-b2362432a",
        instagramUsername: "https://www.instagram.com/itz_seshu?igsh=MXRmMmI3d2R4ZWh4eQ==",
        photo: "Seshvar.JPG",
      },
    ],
  },
  {
    portfolio: "Design",
    members: [
      {
        name: "Shravanee Kulkarni",
        linkedinUsername: "shravanee-kulkarni-230989356?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        instagramUsername: "shravanee_09?igsh=eDZqazd0Y3E1NDRn",
        photo: "Shravanee.jpg",
      },
      {
        name: "Shreyansh Singh",
        // linkedinUsername: "jinisha-sabadra-37949a263",
        instagramUsername: "shreyansh10.2/?hl=en",
        photo: "Shreyansh.jpg",
      },
    ],
  },
  {
    portfolio: "MPR",
    members: [
      {
        name: "Disha Agrawal",
        linkedinUsername: "disha-agrawal-384084313",
        instagramUsername: "dishaagrawal03/?hl=en",
        photo: "Disha.jpg",
      },
      {
        name: "Sumit Jeengar ",
        linkedinUsername: "sumit-j-a3200a329?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        instagramUsername: "sumitjeengar17?igsh=MW13ZXVmYmQ0cXdzZA==",
        photo: "Sumit.jpg",
      },
    ],
  },
  {
    portfolio: "Web",
    members: [
      {
        name: "Indrani Sahu",
        linkedinUsername: "indrani-sahu-358049343?utm_source=share_via&utm_content=profile&utm_medium=member_android",
        instagramUsername: "infinity.423?igsh=d3d1djI0NzYxdzEy",
        photo: "Indrani.jpg",
      },
    ],
  },
];

const Contact = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const portfolioRef = useRef(null);
  const controls = useAnimation();
  
  // Animate when component mounts
  useEffect(() => {
    controls.start("visible");
  }, [controls]);
  
  // Handle scroll to portfolio section
  const scrollToPortfolios = () => {
    if (portfolioRef.current) {
      portfolioRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="contact-page-container">
      {/* Hero section with contact information */}
      <section className="contact-hero">
        <motion.div 
          className="hero-content"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.2 }
            }
          }}
        >
          <motion.h1 
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
            }}
          >
            Connect With Us
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
            }}
          >
            SARC Core Team Members 2026-2027
          </motion.p>
          
          <motion.div 
            className="contact-cards"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4 } }
            }}
          >
            <div className="contact-card">
              <div className="card-icon">
                <FaEnvelope />
              </div>
              <h3>Email Us</h3>
              <p>sarc@iitb.ac.in</p>
            </div>
            
            <div className="contact-card">
              <div className="card-icon">
                <FaPhone />
              </div>
              <h3>Call Us</h3>
              <p>+91 62631 73987</p>
            </div>
            
            <div className="contact-card">
              <div className="card-icon">
                <FaMapMarkerAlt />
              </div>
              <h3>Visit Us</h3>
              <p>SARC Room, Old SAC, IIT Bombay</p>
            </div>
          </motion.div>
          
          <motion.button 
            className="scroll-cta"
            onClick={scrollToPortfolios}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.6 } }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Meet Our Team
            <svg viewBox="0 0 16 16" height="16" width="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3.5 6.5l4.5 4.5 4.5-4.5" />
            </svg>
          </motion.button>
        </motion.div>
      </section>
      
      {/* Overall Coordinator Section */}
      <section className="oc-section">
        <div className="section-heading">
          <h2>Overall Coordinator</h2>
          <div className="heading-line"></div>
        </div>
        
        <motion.div 
          className="oc-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="oc-image-container">
            <img 
              src={require("../../assets/ctm/aniruddha.jpg")} 
              alt="Aniruddha Goyal" 
              className="oc-image"
            />
          </div>
          <div className="oc-details">
            <h3>Aniruddh Goyal</h3>
            <p className="oc-title">Overall Coordinator</p>
            <div className="oc-social">
              <a href="https://www.linkedin.com/in/aniruddha-goyal-5a4b69233/" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn />
              </a>
              <a href="https://www.instagram.com/goyal_aniruddha?igshid=YmMyMTA2M2Y" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
            </div>
          </div>
        </motion.div>
      </section>
      
      {/* Portfolio Sections */}
      <section className="portfolios-section" ref={portfolioRef}>
        <div className="section-heading">
          <h2>Our Portfolios</h2>
          <div className="heading-line"></div>
        </div>
        
        <div className="portfolio-list">
          {councilMembers.map((portfolio) => (
            <motion.section
              key={portfolio.portfolio}
              className="portfolio-group"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              aria-labelledby={`portfolio-${portfolio.portfolio}`}
            >
              <h3 className="portfolio-group-heading" id={`portfolio-${portfolio.portfolio}`}>
                {portfolio.portfolio}
              </h3>
              <div className="team-grid">
                {portfolio.members.map((member, index) => (
                  <motion.div
                    key={member.name}
                    className="team-member-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ 
                      y: -10,
                      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
                      transition: { duration: 0.3 }
                    }}
                    onClick={() => setSelectedMember({ ...member, portfolio: portfolio.portfolio })}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setSelectedMember({ ...member, portfolio: portfolio.portfolio });
                      }
                    }}
                  >
                    <div className="member-photo-frame">
                      <img 
                        src={require(`../../assets/ctm/${member.photo}`)} 
                        alt={member.name}
                        className="member-photo"
                      />
                    </div>
                    <div className="member-info">
                      <h3>{member.name}</h3>
                      <p>{portfolio.portfolio}</p>
                      <div className="member-social">
                        <a 
                          href={`https://www.linkedin.com/in/${member.linkedinUsername}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          aria-label={`LinkedIn profile of ${member.name}`}
                        >
                          <FaLinkedinIn />
                        </a>
                        <a 
                          href={`https://www.instagram.com/${member.instagramUsername}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          aria-label={`Instagram profile of ${member.name}`}
                        >
                          <FaInstagram />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </section>
      
      {/* Modal for detailed member view */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div 
            className="member-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
          >
            <motion.div 
              className="member-modal"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={e => e.stopPropagation()}
            >
              <button 
                className="modal-close"
                onClick={() => setSelectedMember(null)}
                aria-label="Close"
              >
                ×
              </button>
              
              <div className="modal-content">
                <div className="modal-image-container">
                  <img 
                    src={require(`../../assets/ctm/${selectedMember.photo}`)} 
                    alt={selectedMember.name}
                    className="modal-image"
                  />
                </div>
                
                <div className="modal-details">
                  <h2>{selectedMember.name}</h2>
                  <p className="modal-title">{selectedMember.portfolio}</p>
                  
                  <div className="modal-social">
                    <a 
                      href={`https://www.linkedin.com/in/${selectedMember.linkedinUsername}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="modal-social-link linkedin"
                    >
                      <FaLinkedinIn />
                      <span>LinkedIn</span>
                    </a>
                    <a 
                      href={`https://www.instagram.com/${selectedMember.instagramUsername}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="modal-social-link instagram"
                    >
                      <FaInstagram />
                      <span>Instagram</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <footer className="contact-footer">
        <p>© {new Date().getFullYear()} Student Alumni Relations Cell (SARC), IIT Bombay</p>
      </footer>
    </div>
  );
};

// Helper function to get gradient colors similar to initiatives
const getGradientColor = (index) => {
  const gradients = [
    "from-orange-500 to-amber-500",
    "from-blue-500 to-purple-500",
    "from-green-500 to-teal-500",
    "from-red-500 to-pink-500",
    "from-indigo-500 to-blue-500",
    "from-yellow-500 to-orange-500",
    "from-purple-500 to-pink-500",
    "from-cyan-500 to-blue-500",
    "from-emerald-500 to-green-500",
    "from-rose-500 to-red-500",
  ];
  
  return gradients[index % gradients.length];
};

export default Contact;
