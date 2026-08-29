<<<<<<< HEAD
import React, { useState, useEffect, useRef } from "react";
import "./Contact.css";
import { FaLinkedinIn, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
=======
import React, { useRef, useState } from "react";
import "./Contact.css";
import {
  FaTwitter,
  FaInstagram,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import ContactIcon from "../../assets/contact.svg";
import SocialIcon from "../../assets/social.png"; // Replace with actual filename
import PhoneIcon from "../../assets/phone.png"; // Replace with actual filename
import AddressIcon from "../../assets/address.png";
import { motion } from "framer-motion";
>>>>>>> c237bd9c6d71425d0cff972ecae9a59b3728446c

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
<<<<<<< HEAD
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
=======
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const teamSectionRef = useRef(null);

  return (
    <div className="bg-black min-h-screen text-white grid-bg">
      {/* Header and Quick Contacts Section */}
      <div className="relative pt-24 pb-16 px-4 md:px-8 lg:px-16 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          {/* Main Heading */}
          <motion.h1 
            className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-white flex items-center justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Connect <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-500 ml-3 md:ml-4">With Us</span>
          </motion.h1>

          <motion.p
            className="text-lg text-zinc-400 max-w-2xl mx-auto font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            SARC Core Team Members 2026-27
          </motion.p>
          
          {/* 3 cards side by side */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Email Us */}
            <div className="bg-[#121212]/90 border border-zinc-800/80 rounded-2xl p-8 flex flex-col justify-center items-center h-48 text-center shadow-lg">
              <h3 className="text-xl font-bold text-white mb-3">Email Us</h3>
              <p className="text-zinc-400 text-base">sarc@iitb.ac.in</p>
            </div>

            {/* Call Us */}
            <div className="bg-[#121212]/90 border border-zinc-800/80 rounded-2xl p-8 flex flex-col justify-center items-center h-48 text-center shadow-lg">
              <h3 className="text-xl font-bold text-white mb-3">Call Us</h3>
              <p className="text-zinc-400 text-base">+91 62631 73987</p>
            </div>

            {/* Visit Us */}
            <div className="bg-[#121212]/90 border border-zinc-800/80 rounded-2xl p-8 flex flex-col justify-center items-center h-48 text-center shadow-lg">
              <h3 className="text-xl font-bold text-white mb-3">Visit Us</h3>
              <p className="text-zinc-400 text-base">SARC Room, Old SAC, IIT Bombay</p>
            </div>
          </motion.div>

          {/* Meet Our Team Button */}
          <motion.button
            onClick={() => teamSectionRef.current?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3.5 mt-10 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-full shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:from-orange-600 hover:to-amber-600 transition-all duration-300 flex items-center space-x-2 cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span>Meet Our Team</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Team Content Area */}
      <div ref={teamSectionRef} className="max-w-6xl mx-auto px-4 md:px-8 py-16">
        
        {/* Overall Coordinators Section */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-extrabold text-white inline-block relative pb-3">
            Overall Coordinators
            <span className="absolute bottom-0 left-1/4 right-1/4 h-[3px] bg-orange-500 rounded-full"></span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-12">
            {/* Sarvagya Jain */}
            <div className="bg-[#121212]/90 border border-zinc-800/80 rounded-2xl p-10 flex flex-row items-center space-x-8 shadow-xl">
              <img
                src={require("../../assets/ctm/Sarvagya.jpeg")}
                alt="Sarvagya Jain"
                className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover border-[3px] border-orange-500 shadow-md shadow-orange-500/20"
              />
              <div className="flex flex-col text-left space-y-2">
                <h3 className="text-2xl md:text-3xl font-extrabold text-white">Sarvagya Jain</h3>
                <p className="text-orange-500 font-semibold text-base">Overall Coordinator</p>
                <div className="flex space-x-3 mt-3">
                  {socialLinks("sarvagya-jain-355798213?utm_source=share_via&utm_content=profile&utm_medium=member_android", "sarvo75?igsi=MTJvMmdwd2hnNW9uOA==").map(({ href, social, svgPath }) => (
                    <a
                      key={social}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-orange-500 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d={svgPath}></path>
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Sai Sharanya */}
            <div className="bg-[#121212]/90 border border-zinc-800/80 rounded-2xl p-10 flex flex-row items-center space-x-8 shadow-xl">
              <img
                src={require("../../assets/ctm/SaiSharanya.jpeg")}
                alt="Sai Sharanya"
                className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover border-[3px] border-orange-500 shadow-md shadow-orange-500/20"
              />
              <div className="flex flex-col text-left space-y-2">
                <h3 className="text-2xl md:text-3xl font-extrabold text-white">Sai Sharanya</h3>
                <p className="text-orange-500 font-semibold text-base">Overall Coordinator</p>
                <div className="flex space-x-3 mt-3">
                  {socialLinks("kinnera-sai-sharanya-05b9b9292?utm_source=share_via&utm_content=profile&utm_medium=member_android", "sai_sharanya_06?igsi=MWs1MW4yOW41Y2VkaQ==").map(({ href, social, svgPath }) => (
                    <a
                      key={social}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-orange-500 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d={svgPath}></path>
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Portfolios Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white inline-block relative pb-3 mb-8">
            Our Portfolios
            <span className="absolute bottom-0 left-1/4 right-1/4 h-[3px] bg-orange-500 rounded-full"></span>
          </h2>

          {/* Portfolio Buttons */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-5xl mx-auto mb-12">
            {councilMembers.map((portfolio) => {
              const isActive = selectedPortfolio === portfolio.portfolio;
              return (
                <button
                  key={portfolio.portfolio}
                  onClick={() => setSelectedPortfolio(portfolio.portfolio)}
                  className={`px-6 py-2.5 rounded-full font-semibold border transition-all duration-300 text-sm md:text-base cursor-pointer ${
                    isActive
                      ? "border-orange-500 text-orange-500 bg-orange-500/10 shadow-[0_0_15px_rgba(249,115,22,0.15)]"
                      : "border-zinc-800 text-zinc-400 bg-zinc-900/40 hover:text-white hover:border-zinc-700"
                  }`}
                >
                  {portfolio.portfolio}
                </button>
              );
            })}
          </div>

          {/* Portfolio Members Display */}
          <div>
            {!selectedPortfolio ? (
              <div className="text-zinc-500 text-lg italic py-12">
                Select a portfolio above to see team members
              </div>
            ) : (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-wrap justify-center gap-8"
              >
                {councilMembers
                  .find((p) => p.portfolio === selectedPortfolio)
                  ?.members.map((member) => (
                    <div
                      key={member.name}
                      className="bg-[#121212]/90 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:border-zinc-700/80 transition-all duration-300 w-full max-w-[325px] flex flex-col h-full"
                    >
                      <div className="h-72 overflow-hidden relative">
                        <img
                          src={require(`../../assets/ctm/${member.photo}`)}
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                      <div className="p-5 flex flex-col flex-grow text-left space-y-1">
                        <h4 className="text-lg font-bold text-white">{member.name}</h4>
                        <p className="text-orange-500 font-semibold text-sm">{selectedPortfolio}</p>
                        <div className="flex space-x-3 pt-3 mt-auto">
                          {socialLinks(member.linkedinUsername, member.instagramUsername).map(
                            ({ href, social, svgPath }) => (
                              <a
                                key={social}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-orange-500 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="14"
                                  height="14"
                                  fill="currentColor"
                                  viewBox="0 0 16 16"
                                >
                                  <path d={svgPath}></path>
                                </svg>
                              </a>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black py-6 text-center border-t border-zinc-900">
        <p className="text-gray-400 text-sm">
          Mail: sarc@iitb.ac.in &nbsp; | &nbsp; Phone: +91 62631 73987 &nbsp; | &nbsp; Address: SARC Room, Old SAC, IIT Bombay
        </p>
>>>>>>> c237bd9c6d71425d0cff972ecae9a59b3728446c
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
