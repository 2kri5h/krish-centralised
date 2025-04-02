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
    description: "ILP offers students the opportunity to gain hands-on experience through internships and projects provided by our alumni. Held twice a year, in summers and winters, it enables meaningful industry exposure and skill development. Participants work on real-world challenges while receiving mentorship from seasoned professionals.",
    icon: "🏭",
    color: "bg-gradient-to-r from-green-500 to-teal-500"
  },
  {
    id: 4,
    name: "TRANSVERSE MENTORING",
    description: "A session designed to help you navigate career crossroads, Transverse Mentoring connects you with alumni from two similar yet distinct fields. Gain clarity on the differences, opportunities and challenges of each path in a single session. Ask questions, clear doubts, and make informed career choices with guidance from those who've been there before.",
    icon: "🔄",
    color: "bg-gradient-to-r from-red-500 to-pink-500"
  },
  {
    id: 5,
    name: "CLASS SONG",
    description: "A musical tribute to the graduating batch, Class Song captures the essence of their journey at IIT Bombay. It celebrates friendships, nostalgia, and the countless unforgettable moments on campus. A heartfelt soundtrack that brings together memories and milestones - marking the end of one beautiful chapter.",
    icon: "🎵",
    color: "bg-gradient-to-r from-indigo-500 to-blue-500"
  },
  {
    id: 6,
    name: "EXAM SERIES",
    description: "Exam Series is an initiative that connects students with seasoned professionals and accomplished alumni to provide expert insights on competitive exams like UPSC, CAT, CFA, GMAT and more. Learn strategies, sharpen your skills, and gain the confidence needed to ace your targeted exam.",
    icon: "📝",
    color: "bg-gradient-to-r from-yellow-500 to-orange-500"
  },
  {
    id: 7,
    name: "SEEKOUT",
    description: "Insti's biggest crypt hunt, SeekOut, is the ultimate test of Insti knowledge, packed with puzzles and challenges. Solve clues, unlock secrets and race against others to claim exciting prizes. A thrilling adventure that puts your wit and campus know-how to the test!",
    icon: "🔍",
    color: "bg-gradient-to-r from-purple-500 to-pink-500"
  },
  {
    id: 8,
    name: "BEYOND THE HORIZON",
    description: "Beyond the Horizon spotlights IIT Bombay alumni who have carved unconventional paths in fields such as stand-up comedy, filmmaking, music and more. They share their journeys, challenges and defining moments, offering a glimpse into lives beyond the conventional career tracks. An inspiring event that encourages students to explore and embrace paths that are less travelled.",
    icon: "🌅",
    color: "bg-gradient-to-r from-cyan-500 to-blue-500"
  },
  {
    id: 9,
    name: "UN-ENGINEERING",
    description: "UnEngineering showcases alumni who ventured beyond engineering into unconventional careers. Breaking the mold, they have made their mark in fields like arts, entrepreneurship, journalism, and public service. This dynamic session brings inspiring stories, bold choices, and new perspectives on success.",
    icon: "🔧",
    color: "bg-gradient-to-r from-emerald-500 to-green-500"
  },
  {
    id: 10,
    name: "TRAILBLAZERS",
    description: "The event honours alumni who were the first to achieve something remarkable—true innovators in their fields. It highlights their journeys, challenges and breakthroughs. The goal is to inspire and guide others through their experiences. This is where innovation begins, and new paths are forged.",
    icon: "🚀",
    color: "bg-gradient-to-r from-rose-500 to-red-500"
  },
  {
    id: 11,
    name: "START IT UP",
    description: "An exclusive session where IIT Bombay alumni entrepreneurs share their startup journeys, challenges and successes. Start It Up brings firsthand insights into the world of entrepreneurship. Gain valuable lessons, inspiration and guidance from those who turned ideas into reality. A celebration of passion, resilience, and innovation.",
    icon: "💡",
    color: "bg-gradient-to-r from-violet-500 to-purple-500"
  },
  {
    id: 12,
    name: "BREAK THE ICE",
    description: "A one-on-one mentoring session where students connect with ASMP mentors to share stories, experiences and career insights. It's an opportunity to build meaningful relationships, gain guidance and navigate future career paths with the support of experienced professionals.",
    icon: "🧊",
    color: "bg-gradient-to-r from-amber-500 to-yellow-500"
  },
  {
    id: 13,
    name: "INNOVATION EXPO",
    description: "A hub of groundbreaking startups, visionary VCs and cutting-edge research, this exhibition brings together the brightest minds in innovation. Alumni-led initiatives take center stage, offering insights into emerging technologies and entrepreneurial journeys. It's a space to explore ideas, connect with industry leaders and witness innovation in action.",
    icon: "🔬",
    color: "bg-gradient-to-r from-teal-500 to-cyan-500"
  },
  {
    id: 14,
    name: "MOCK INTERVIEWS & GROUP DISCUSSIONS",
    description: "A program that provides industry-specific guidance from experienced alumni mentors. Through simulated placement scenarios, participants refine their skills and gain confidence. These sessions cover various fields, offering valuable career insights. Final-year students also earn incentive points upon completion.",
    icon: "🎯",
    color: "bg-gradient-to-r from-pink-500 to-rose-500"
  },
  {
    id: 15,
    name: "GROUP MENTORING",
    description: "A one-day event where alumni from diverse fields like Finance, Consulting, IT, Analytics, Quantitative Finance, and Product Management share their experiences and insights. Through interactive discussions, participants gain a deeper understanding of various career paths, industry trends and essential skills needed for professional growth.",
    icon: "👥",
    color: "bg-gradient-to-r from-blue-500 to-indigo-500"
  },
  {
    id: 16,
    name: "HOSTALGIA",
    description: "Alumni return to their hostels, retracing their journey and reliving memories that have stood the test of time. They share stories of friendships, challenges, and growth, reflecting on how their experiences shaped them. It's a heartfelt reunion, blending nostalgia with inspiration, as past and present come together.",
    icon: "🏠",
    color: "bg-gradient-to-r from-green-500 to-emerald-500"
  },
  {
    id: 17,
    name: "SHADOW PROGRAM",
    description: "An opportunity to step beyond the classroom, Shadow Program offers behind-the-scenes industry visits. Learn directly from experts, witness real-world applications, and gain insights into different fields. A unique experience to expand your perspective and explore career possibilities.",
    icon: "👤",
    color: "bg-gradient-to-r from-red-500 to-orange-500"
  },
  {
    id: 18,
    name: "SARCathon",
    description: "A nationwide Pan-IIT competition, SARCathon an ultimate test of intellect and innovation. With participation from the brightest minds and evaluation by distinguished alumni, it's a battle of brains. Compete, create, and claim your spot among India's top problem solvers!",
    icon: "🏆",
    color: "bg-gradient-to-r from-purple-500 to-violet-500"
  },
  {
    id: 19,
    name: "CORE TALKS",
    description: "Tailored for department-specific career guidance, Core Talks brings alumni to share insights on higher studies and industry experiences. Learn about academic advancements, career prospects, and industry trends in your field. A must-attend for those looking to shape their core career path.",
    icon: "💼",
    color: "bg-gradient-to-r from-yellow-500 to-amber-500"
  },
  {
    id: 20,
    name: "UPSC TALKS",
    description: "UPSC Talks is an event where IIT Bombay alumni who have cleared the UPSC exam share their preparation journey, strategies, and insights. They discuss how they managed their studies during and after their Insti life and provide valuable tips for aspiring candidates. A chance to learn directly from those who have successfully navigated the civil services path.",
    icon: "🏛️",
    color: "bg-gradient-to-r from-cyan-500 to-teal-500"
  },
  {
    id: 21,
    name: "NAIL THE PREP",
    description: "An event designed for third-year students, NTP helps in internship preparation through hands-on mock interviews. Get direct feedback from experienced alumni and refine your approach. A practical, interactive session to boost confidence and ace your internship interviews.",
    icon: "✅",
    color: "bg-gradient-to-r from-pink-500 to-purple-500"
  },
  {
    id: 22,
    name: "PLACEMENT MENTORING PROGRAM",
    description: "A guided pathway to help final-year students navigate placements—whether in core, non-core, or grad school. Placement Mentoring Program connects you with alumni mentors who offer insights on applications, tricky interview questions, and career strategies. A valuable way to gain clarity and discover the best route to your dream job.",
    icon: "📊",
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