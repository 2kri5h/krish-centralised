import React, { useState, useEffect, useRef } from "react";
import "./Contact.css";
import { FaLinkedinIn, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

const councilMembers = [
  {
    portfolio: "ASMP",
    members: [
      {
        name: "Anshika Mishra",
        linkedinUsername: "anshika-mishra-952715267",
        instagramUsername: "anshika.mishra?igsh=aW1zMmtobjNoaXU4",
        photo: "anshika.jpg",
      },
      {
        name: "Nishit Moonat",
        linkedinUsername: "nishit-moonat-416187250",
        instagramUsername: "nishitt27?igsh=MWJlajJmMnlhcW1kdA==",
        photo: "nishit.jpg",
      },
    ],
  },
  {
    portfolio: "HDA",
    members: [
      {
        name: "Bhakti Joshi",
        linkedinUsername: "bhakti-joshi-33b1b7252/",
        instagramUsername: "bhaktijoshi_14",
        photo: "bhakti.jpg",
      },
      {
        name: "Ishaan Grover",
        linkedinUsername: "ishan-grover-30b499256/",
        instagramUsername: "ishan__grover/",
        photo: "ishan.jpg",
      },
    ],
  },
  {
    portfolio: "Events",
    members: [
      {
        name: "Aditya Singh",
        linkedinUsername: "aditya-singh-4b2052201/",
        instagramUsername: "_adityasingh96/",
        photo: "aditya_singh.jpg",
      },
      {
        name: "Arnav Mishra",
        linkedinUsername: "arnav-mishra-b1000924b/",
        instagramUsername: "arnavm7203?igsh=MTJwNGJsejFxenRvZQ==",
        photo: "arnav.JPG",
      },
    ],
  },
  {
    portfolio: "Operations",
    members: [
      {
        name: "Aditya Aryan",
        linkedinUsername: "aditya-aryan-3aba9b250?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        instagramUsername: "adi__aaryan?igsh=MWtqNTU1MDJ0MmY3Yw==",
        photo: "aditya_aryan.jpeg",
      },
      {
        name: "Hemendra Suthar",
        linkedinUsername: "hemendrasuthar/",
        instagramUsername: "hemendra._.s/",
        photo: "hemendra.jpg",
      },
    ],
  },
  {
    portfolio: "Marketing",
    members: [
      {
        name: "Himanya Garg",
        linkedinUsername: "himanya-garg-75230a256/",
        instagramUsername: "himanya_garg30?igshid=ZDc4ODBmNjlmNQ==",
        photo: "himanya.jpg",
      },
      {
        name: "Karthik Vaishnav",
        linkedinUsername: "kartik-vaishnav-12a758251/",
        instagramUsername: "kartik__vaishnav?igsh=MXU0cGE3cTUzbGVsYw==",
        photo: "karthik.jpg",
      },
    ],
  },
  {
    portfolio: "Design",
    members: [
      {
        name: "Akshita Choudhary",
        linkedinUsername: "akshita-choudhary-851319253?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        instagramUsername: "akshita_choudhary1905?igsh=MWg2dXJzcm1yOGR4Yw==",
        photo: "akshita.jpg",
      },
      {
        name: "Jinisha Sabadra",
        linkedinUsername: "jinisha-sabadra-37949a263",
        instagramUsername: "jinisha_2784?igsh=eTR2YjJveDRvM29p",
        photo: "jinisha.png",
      },
    ],
  },
  {
    portfolio: "MPR",
    members: [
      {
        name: "Ananya Patil",
        linkedinUsername: "ananya-patil-a18437281/",
        instagramUsername: "ananyapatil._/",
        photo: "ananya.png",
      },
      {
        name: "Rutuja Khandekar",
        linkedinUsername: "rutuja-khandekar-42971b248/",
        instagramUsername: "___.rutujaaa.__/",
        photo: "rutuja.jpg",
      },
    ],
  },
  {
    portfolio: "Web",
    members: [
      {
        name: "Ashwani Dubey",
        linkedinUsername: "ashwani-dubey-3b2a81258?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        instagramUsername: "kanhahihu?igsh=MW5xeHZoNW1vbmZlaw==",
        photo: "ashwani.jpg",
      },
    ],
  },
];

const Contact = () => {
  const [activePortfolio, setActivePortfolio] = useState(null);
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
            SARC Core Team Members 2024-25
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
        
        <div className="portfolio-navigation">
          {councilMembers.map((portfolio, index) => (
            <motion.button
              key={portfolio.portfolio}
              className={`portfolio-nav-item ${activePortfolio === portfolio.portfolio ? 'active' : ''}`}
              onClick={() => setActivePortfolio(portfolio.portfolio)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {portfolio.portfolio}
            </motion.button>
          ))}
        </div>
        
        <AnimatePresence mode="wait">
          {activePortfolio ? (
            <motion.div
              key={activePortfolio}
              className="team-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {councilMembers
                .find(p => p.portfolio === activePortfolio)
                ?.members.map((member, index) => (
                  <motion.div
                    key={member.name}
                    className="team-member-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ 
                      y: -10,
                      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
                      transition: { duration: 0.3 }
                    }}
                    onClick={() => setSelectedMember(member)}
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
                      <p>{activePortfolio}</p>
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
            </motion.div>
          ) : (
            <motion.div
              className="portfolio-prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p>Select a portfolio above to see team members</p>
            </motion.div>
          )}
        </AnimatePresence>
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
                  <p className="modal-title">{activePortfolio}</p>
                  
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

export default Contact;
