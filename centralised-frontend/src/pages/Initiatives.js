import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const initiativesData = [
  {
    id: 1,
    name: "ALUMNI STUDENT MENTORSHIP PROGRAM",
    description: "A yearlong mentorship initiative, this program connects students with experienced alumni who guide them toward their ambitions. Through one-on-one mentorship, get valuable insights, self-belief, and strategic advice. A journey where students aspire and alumni inspire.",
    icon: "👨‍🏫",
    color: "bg-gradient-to-r from-orange-500 to-amber-500"
  },
  {
    id: 2,
    name: "ALUMINATION",
    description: "Alumination is the flagship Student-Alumni Fest of SARC, bringing together alumni from across the globe. An unforgettable experience of learning, networking, and mentorship, it features events like Beyond the Horizon, Trailblazers, UnEngineering, Start It Up, and more. Through inspiring stories and interactive sessions, alumni serve as a guiding light for students navigating their own paths.",
    icon: "🌟",
    color: "bg-gradient-to-r from-blue-500 to-purple-500"
  },
  {
    id: 3,
    name: "INDUSTRIAL LEARNING PROGRAM",
    description: "ILP offers students the opportunity to gain hands-on experience through internships and projects provided by our alumni. Held twice a year, in summers and winters, it enables meaningful industry exposure and skill development. Participants work on real-world challenges while receiving guidance from experienced professionals.",
    icon: "🏭",
    color: "bg-gradient-to-r from-green-500 to-teal-500"
  },
  {
    id: 4,
    name: "MOCK INTERVIEWS",
    description: "Prepare for your dream job with our Mock Interview sessions. Alumni from top companies conduct simulated interviews, providing valuable feedback and insights. Gain confidence, improve your communication skills, and learn how to showcase your strengths effectively. A stepping stone to career success.",
    icon: "🎯",
    color: "bg-gradient-to-r from-red-500 to-pink-500"
  },
  {
    id: 5,
    name: "CORE ALUMNI MEET",
    description: "Core Alumni Meet brings together distinguished alumni from core engineering sectors. Through panel discussions, interactive sessions, and networking opportunities, gain insights into industry trends, career paths, and emerging technologies. Connect with professionals who've made significant contributions to their fields.",
    icon: "🔧",
    color: "bg-gradient-to-r from-indigo-500 to-blue-500"
  },
  {
    id: 6,
    name: "ALUMNI BLOG",
    description: "The Alumni Blog features inspiring stories, career advice, and personal experiences shared by our accomplished alumni. From entrepreneurial journeys to corporate success stories, these blogs offer valuable insights and motivation. A platform where wisdom flows from those who've walked the path before.",
    icon: "✍️",
    color: "bg-gradient-to-r from-yellow-500 to-orange-500"
  },
  {
    id: 7,
    name: "STUDENT ALUMNI MEET",
    description: "SAM facilitates meaningful connections between current students and alumni through interactive sessions and networking events. Gain valuable insights into various career paths, industry trends, and life after graduation. A platform to build relationships that extend beyond the campus.",
    icon: "🤝",
    color: "bg-gradient-to-r from-purple-500 to-pink-500"
  },
  {
    id: 8,
    name: "PHONATHON",
    description: "Phonathon is a unique initiative where students connect with alumni via phone calls, fostering personal connections and strengthening the IITB network. These conversations bridge generations, create mentorship opportunities, and keep alumni engaged with their alma mater. A simple call that builds lasting relationships.",
    icon: "📞",
    color: "bg-gradient-to-r from-cyan-500 to-blue-500"
  },
  {
    id: 9,
    name: "ALUMNI STUDENT INTERACTION SERIES",
    description: "ASIS brings distinguished alumni to campus for interactive sessions with students. Through talks, panel discussions, and Q&A sessions, gain insights into diverse career paths, industry trends, and personal growth. An opportunity to learn from the experiences and wisdom of successful alumni.",
    icon: "💬",
    color: "bg-gradient-to-r from-emerald-500 to-green-500"
  },
  {
    id: 10,
    name: "DEPARTMENT ALUMNI MEET",
    description: "DAM connects students with alumni from their specific departments, facilitating focused discussions on specialized career paths and opportunities. Through interactive sessions and networking events, gain department-specific insights and build valuable connections. A targeted approach to alumni engagement.",
    icon: "🏛️",
    color: "bg-gradient-to-r from-rose-500 to-red-500"
  },
  {
    id: 11,
    name: "ALUMNI RESEARCH INITIATIVE",
    description: "ARI connects students with alumni researchers, fostering collaboration on cutting-edge projects. Through mentorship and guidance, explore research opportunities, methodologies, and career paths in academia and R&D. A platform to nurture the next generation of innovators and researchers.",
    icon: "🔬",
    color: "bg-gradient-to-r from-violet-500 to-purple-500"
  },
  {
    id: 12,
    name: "HOSTEL ALUMNI MEET",
    description: "HAM brings together current hostel residents and their alumni, celebrating the unique culture and traditions of each hostel. Through informal gatherings and interactive sessions, share stories, experiences, and advice. A nostalgic journey that strengthens the hostel fraternity across generations.",
    icon: "🏠",
    color: "bg-gradient-to-r from-amber-500 to-yellow-500"
  },
  {
    id: 13,
    name: "ALUMNI CAMPUS VISIT",
    description: "ACV welcomes alumni back to their alma mater, organizing guided tours and interactive sessions with current students. Revisit familiar places, witness campus developments, and share your experiences with the next generation. A heartwarming return to where it all began.",
    icon: "🚶",
    color: "bg-gradient-to-r from-teal-500 to-cyan-500"
  },
  {
    id: 14,
    name: "ALUMNI NEWSLETTER",
    description: "The Alumni Newsletter keeps the IITB community connected by sharing campus news, alumni achievements, and upcoming events. Stay updated with the latest developments, success stories, and opportunities for engagement. A regular digest that bridges the gap between past and present.",
    icon: "📰",
    color: "bg-gradient-to-r from-pink-500 to-rose-500"
  },
  {
    id: 15,
    name: "ALUMNI DIRECTORY",
    description: "The Alumni Directory is a comprehensive database of IITB graduates, facilitating connections and networking within the community. Find batchmates, explore career paths, and connect with alumni in your field or region. A valuable resource for building professional relationships and seeking mentorship.",
    icon: "📚",
    color: "bg-gradient-to-r from-blue-500 to-indigo-500"
  },
  {
    id: 16,
    name: "ALUMNI WEBSITE",
    description: "The Alumni Website serves as a central hub for all alumni-related information, events, and initiatives. Stay connected with your alma mater, explore engagement opportunities, and access resources for personal and professional growth. A digital platform that keeps the IITB spirit alive.",
    icon: "🌐",
    color: "bg-gradient-to-r from-green-500 to-emerald-500"
  },
  {
    id: 17,
    name: "ALUMNI SOCIAL MEDIA",
    description: "Our Alumni Social Media channels keep you connected with the latest happenings, achievements, and opportunities within the IITB community. Follow us for updates, success stories, event announcements, and nostalgic throwbacks. A digital space where the IITB family comes together.",
    icon: "📱",
    color: "bg-gradient-to-r from-red-500 to-orange-500"
  },
  {
    id: 18,
    name: "ALUMNI FUNDRAISING",
    description: "Alumni Fundraising initiatives support various development projects, scholarships, and infrastructure improvements at IITB. Contribute to the growth and excellence of your alma mater, making a meaningful impact on future generations. A way to give back and leave a lasting legacy.",
    icon: "💰",
    color: "bg-gradient-to-r from-purple-500 to-violet-500"
  },
  {
    id: 19,
    name: "ALUMNI AWARDS",
    description: "The Alumni Awards recognize and celebrate the outstanding achievements and contributions of IITB graduates across various fields. Honor excellence, innovation, leadership, and social impact within our community. A prestigious acknowledgment of alumni who exemplify the IITB spirit.",
    icon: "🏆",
    color: "bg-gradient-to-r from-yellow-500 to-amber-500"
  },
  {
    id: 20,
    name: "ALUMNI REUNIONS",
    description: "Alumni Reunions bring together batches celebrating milestone anniversaries, rekindling old friendships and creating new memories. Revisit the campus, reconnect with classmates, and relive the golden days of your IITB journey. A heartwarming celebration of shared experiences and enduring bonds.",
    icon: "🎉",
    color: "bg-gradient-to-r from-cyan-500 to-teal-500"
  },
  {
    id: 21,
    name: "ALUMNI CHAPTERS",
    description: "Alumni Chapters across the globe bring together IITB graduates in various cities and countries, fostering local communities and networking opportunities. Participate in regional events, professional development activities, and social gatherings. A home away from home for the global IITB family.",
    icon: "🌍",
    color: "bg-gradient-to-r from-pink-500 to-purple-500"
  },
  {
    id: 22,
    name: "ALUMNI CAREER SERVICES",
    description: "Alumni Career Services offer professional development resources, job opportunities, and networking platforms for IITB graduates at all career stages. Access industry insights, mentorship, and placement assistance to advance your professional journey. A support system for lifelong career growth.",
    icon: "💼",
    color: "bg-gradient-to-r from-blue-500 to-cyan-500"
  },
  {
    id: 23,
    name: "ASK THE ALUM",
    description: "An interactive online session where students get to ask their doubts directly to alumni from various fields. Whether it's career choices, industry insights or personal growth, get firsthand advice. Gain valuable knowledge from those who've walked the path before.",
    icon: "❓",
    color: "bg-gradient-to-r from-emerald-500 to-teal-500"
  },
  {
    id: 24,
    name: "INSTITUTE VALEDICTORY FUNCTION",
    description: "A grand farewell celebrating your journey at IIT Bombay, featuring inspiring speeches from directors, deans, and accomplished alumni. Institute Valedictory Function marks the transition from student to alumnus, honouring achievements and shared memories.",
    icon: "🎓",
    color: "bg-gradient-to-r from-orange-500 to-red-500"
  },
];

const Initiatives = () => {
  const [selectedInitiative, setSelectedInitiative] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const handleInitiativeClick = (initiative) => {
    setSelectedInitiative(initiative);
  };

  const closeModal = () => {
    setSelectedInitiative(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const scrollPosition = window.scrollY;
        const containerHeight = container.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollableHeight = containerHeight - windowHeight;
        
        if (scrollableHeight > 0) {
          const scrollProgress = scrollPosition / scrollableHeight;
          const initiativeIndex = Math.min(
            Math.floor(scrollProgress * initiativesData.length),
            initiativesData.length - 1
          );
          setCurrentIndex(initiativeIndex);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-black min-h-screen text-white" ref={containerRef}>
      {/* Header Section */}
      <div className="relative py-16 px-4 md:px-8 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-orange-600 to-transparent"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-orange-500 filter blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-blue-500 filter blur-3xl opacity-20"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-300"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Initiatives
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover the various programs and events that connect students with alumni, 
            fostering mentorship, knowledge sharing, and lifelong relationships.
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative px-4 md:px-8 lg:px-16 pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Progress Indicator */}
          <div className="hidden lg:block fixed left-8 top-1/2 transform -translate-y-1/2 h-1/2 w-1 bg-gray-700 rounded-full z-20">
            <motion.div 
              className="w-3 h-3 bg-orange-500 rounded-full absolute -left-1"
              style={{ top: `${(currentIndex / (initiativesData.length - 1)) * 100}%` }}
            />
          </div>

          {/* Initiatives Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {initiativesData.map((initiative) => (
              <motion.div
                key={initiative.id}
                className={`${initiative.color} rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: initiative.id * 0.05 }}
                onClick={() => handleInitiativeClick(initiative)}
              >
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <span className="text-4xl mr-3">{initiative.icon}</span>
                    <h3 className="text-xl font-bold text-white">{initiative.name}</h3>
                  </div>
                  <p className="text-white/80 text-sm line-clamp-3 flex-grow">
                    {initiative.description}
                  </p>
                  <div className="mt-4 flex justify-end">
                    <span className="text-white/90 text-sm font-medium flex items-center">
                      Learn more
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Initiative Details */}
      <AnimatePresence>
        {selectedInitiative && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className={`${selectedInitiative.color} max-w-2xl w-full rounded-2xl overflow-hidden`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <span className="text-5xl mr-4">{selectedInitiative.icon}</span>
                    <h2 className="text-2xl font-bold text-white">{selectedInitiative.name}</h2>
                  </div>
                  <button 
                    onClick={closeModal}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-white/90 leading-relaxed">
                  {selectedInitiative.description}
                </p>
                <div className="mt-8 flex justify-end">
                  <button 
                    className="bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-lg transition-colors"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Initiatives;