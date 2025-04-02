import React from "react";
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

const socialLinksOC = () => [
  {
    href: `https://www.linkedin.com/in/aniruddhgoyal`,
    ariaLabel: "LinkedIn",
    social: "linkedin",
    svgPath:
      "M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z",
    tooltip: "LinkedIn",
  },
  {
    href: `https://www.instagram.com/anniboii/`,
    ariaLabel: "Instagram",
    social: "instagram",
    svgPath:
      "M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334",
    tooltip: "Instagram",
  },
];

const socialLinks = (linkedinUsername, instagramUsername) => [
  {
    href: `https://www.linkedin.com/in/${linkedinUsername}`,
    ariaLabel: "LinkedIn",
    social: "linkedin",
    svgPath:
      "M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z",
    tooltip: "LinkedIn",
  },
  {
    href: `https://www.instagram.com/${instagramUsername}`,
    ariaLabel: "Instagram",
    social: "instagram",
    svgPath:
      "M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334",
    tooltip: "Instagram",
  },
];

const Contact = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      {/* Header with Gradient Background - Improved centering */}
      <div className="relative py-20 px-4 md:px-8 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-orange-600 to-transparent"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-orange-500 filter blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-blue-500 filter blur-3xl opacity-20"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-300 flex items-center justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            CONTACT US
            {/* <img src={ContactIcon} alt="Contact Icon" className="ml-4 h-12 md:h-16" /> */}
          </motion.h1>
          <motion.p
            className="text-lg text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Connect with our team members and reach out through various channels
          </motion.p>
        </div>
      </div>

      {/* Council Members Section - More formal and professional styling */}
      <section className="relative px-4 md:px-8 lg:px-16 pb-24">
        <motion.h2 
          className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-300"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Council Members
        </motion.h2>
        
        {/* Overall Coordinator - Special styling */}
        <div className="flex justify-center mb-16">
          <motion.div 
            className="bg-gradient-to-r from-orange-500 to-amber-500 p-1 rounded-xl max-w-md w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-black/90 rounded-lg p-6 flex flex-col items-center">
              <img
                src={require("../../assets/ctm/aniruddha.jpg")}
                alt="Aniruddha Goyal"
                className="w-32 h-32 rounded-full object-cover mb-4 border-2 border-orange-400"
              />
              <h3 className="text-xl font-bold">Aniruddha Goyal</h3>
              <p className="text-gray-300 mb-3">Overall Coordinator</p>
              <ul className="flex space-x-4">
                {socialLinksOC().map(
                  ({ href, ariaLabel, social, svgPath, tooltip }) => (
                    <li key={social}>
                      <a
                        href={href}
                        aria-label={ariaLabel}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-orange-400 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d={svgPath} fill="currentColor"></path>
                        </svg>
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Portfolio sections - More professional grid layout with larger boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {councilMembers.map((portfolio, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col"
            >
              <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-300 text-center">
                {portfolio.portfolio}
              </h3>
              
              <div className="space-y-6">
                {portfolio.members.map((member, j) => (
                  <motion.div 
                    className={`bg-gradient-to-r ${getGradientColor(index)} p-0.5 rounded-lg shadow-lg`}
                    key={j}
                    whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  >
                    <div className="bg-black/95 rounded-lg p-6 flex items-center">
                      <img
                        src={require(`../../assets/ctm/${member.photo}`)}
                        alt={member.name}
                        className="w-20 h-20 rounded-full object-cover mr-5 border border-gray-700"
                      />
                      <div>
                        <h4 className="text-lg font-medium text-white">{member.name}</h4>
                        <div className="flex mt-3 space-x-4">
                          {socialLinks(member.linkedinUsername, member.instagramUsername).map(
                            ({ href, social, svgPath }) => (
                              <a
                                key={social}
                                href={href}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors"
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
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Information Section - Even larger cards */}
      {/* <div className="bg-gradient-to-b from-black to-gray-900 px-4 md:px-8 lg:px-16 py-16">
        <motion.h2 
          className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-300"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Get In Touch
        </motion.h2>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            className="bg-gradient-to-r from-orange-500 to-amber-500 p-1 rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-black/95 rounded-lg p-10 h-full flex flex-col items-center text-center">
              <img src={SocialIcon} alt="Mail Us" className="w-20 h-20 mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Mail Us</h3>
              <p className="text-gray-300 text-lg">sarc@iitb.ac.in</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 p-1 rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-black/95 rounded-lg p-10 h-full flex flex-col items-center text-center">
              <img src={PhoneIcon} alt="Phone Number" className="w-20 h-20 mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Phone Number</h3>
              <p className="text-gray-300 text-lg">+91 62631 73987</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-gradient-to-r from-green-500 to-teal-500 p-1 rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-black/95 rounded-lg p-10 h-full flex flex-col items-center text-center">
              <img src={AddressIcon} alt="Address" className="w-20 h-20 mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Address</h3>
              <p className="text-gray-300 text-lg">SARC Room, Old SAC, IIT Bombay</p>
            </div>
          </motion.div>
        </div>
      </div> */}

      {/* Footer - More professional styling */}
      <footer className="bg-black py-6 text-center border-t border-gray-800">
        <p className="text-gray-400 text-sm">
          Mail: sarc@iitb.ac.in &nbsp; | &nbsp; Phone: +91 62631 73987 &nbsp; | &nbsp; Address: SARC Room, Old SAC, IIT Bombay
        </p>
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
