import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const initiativesData = [
  {
    id: 1,
    name: "Alumni Student Mentorship Program (ASMP)",
    description: "A year-long mentorship program that connects students with alumni to foster meaningful mentoring relationships. It includes events like 'Break the Ice' for initial interactions, 'Nail the Prep' for internship preparation, and 'Group Mentoring' for career guidance. ASMP helps students gain insights into various industries and build strong professional networks.",
  },
  {
    id: 2,
    name: "Alumination",
    description: "The flagship fest of SARC, Alumination is a two-day student-alumni fest featuring workshops, mentoring sessions, talk shows, and informal activities. Events like 'Speed Mentoring' and 'Coming Full Circle' provide students with networking opportunities and career insights. It’s a vibrant platform for students to interact with successful alumni and learn from their experiences.",
  },
  {
    id: 3,
    name: "CEO Connect",
    description: "A new initiative launched in 2022, CEO Connect brings together CEOs past, present, and future. It features interactive sessions with industry leaders like Bhavish Aggarwal (Ola), Vineet Rao (InMobi), and Zishaan Hayath (Toppr). Students gain valuable insights into entrepreneurship, leadership, and innovation, inspiring them to pursue their career goals.",
  },
  {
    id: 4,
    name: "Placement Mentoring Program (PMP)",
    description: "Caters to final-year students preparing for placements. PMP offers mock interviews, group discussions, and personalized feedback from alumni. Over 350 interviews were conducted in 2022, helping students improve their communication skills, confidence, and performance in placement interviews. The program covers both core and non-core fields.",
  },
  {
    id: 5,
    name: "Industrial Learning Program (ILP)",
    description: "Provides students with professional experience through internships and projects offered by alumni. Conducted twice a year during summer and winter breaks, ILP covers a wide range of fields and domains. Students gain hands-on industry exposure, learn about real-world challenges, and build connections with professionals.",
  },
  {
    id: 6,
    name: "Phonathon",
    description: "A telephonic marathon where students contact over 15,000 alumni to update them about institute initiatives. Phonathon helps students build communication skills, network with alumni, and learn about life after IIT Bombay. It’s a unique opportunity to connect with alumni across the globe and understand their career journeys.",
  },
  {
    id: 7,
    name: "SARCasm",
    description: "The biggest crypt hunt of IIT Bombay, SARCasm is a thrilling 48-hour event where students solve puzzles and clues in teams. It’s a fun and creative way to engage with the IITB community, test problem-solving skills, and win exciting prizes. The event witnesses participation from over 1,000 students every year.",
  },
  {
    id: 8,
    name: "Core Talks",
    description: "Department-wise talks that cater to higher studies and core jobs. Students gain insights into career opportunities, industrial applications, and placement strategies. Over 25 talks are conducted, each offering 2.5 placement points. It’s a great platform for students to explore their interests and make informed career decisions.",
  },
  {
    id: 9,
    name: "Exam Series",
    description: "A series of workshops and mentoring sessions for students preparing for competitive exams like UPSC, CFA, GRE, GMAT, and CAT. Students interact with top AIRs and learn strategies to excel in these exams. The program provides guidance on exam preparation, time management, and stress handling.",
  },
  {
    id: 10,
    name: "Beyond the Horizon",
    description: "An informal event highlighting alumni who pursued non-traditional career paths. It features inspiring stories from alumni like Nitesh Tiwari (director of *Dangal* and *Chhichhore*), motivating students to explore unconventional fields. The event encourages students to think beyond traditional career options and follow their passions.",
  },
  {
    id: 11,
    name: "Dean Ki Adaalat",
    description: "An interactive panel discussion with the Dean ACR, Dean AA, and Dean RnD of IIT Bombay. Students get to ask questions and clarify their perceptions about the institution, fostering transparency and open communication. It’s a unique opportunity to understand the vision and functioning of the institute.",
  },
  {
    id: 12,
    name: "UG & PG Orientation",
    description: "The first event of SARC for UG and PG freshers. It includes fun activities, games, and ice-breaking sessions to help new students settle into campus life. Over 250 students attended the 2022 edition, making it a memorable start to their IIT journey. The event fosters a sense of community and belonging among freshers.",
  },
  {
    id: 13,
    name: "Reunions",
    description: "A series of events organized for alumni to relive their memories and connect with students. It provides an opportunity for students to interact with a large number of alumni, fostering a strong alumni-student network. Alumni share their experiences, career journeys, and advice, inspiring students to achieve their goals.",
  },
  {
    id: 14,
    name: "Institute Valedictory Function",
    description: "A semi-formal event for graduating students, organized by SARC and the Dean ACR Office. It features keynote speakers like Mr. Arun Firodia and Dr. Ganesh Natarajan, celebrating the achievements of graduating students. The event marks the culmination of their journey at IIT Bombay and inspires them for the future.",
  },
  {
    id: 15,
    name: "Shadow Program",
    description: "Students visit an alumnus's workplace to gain insights into the work methodology and office environment. It helps students understand industry practices, work culture, and professional expectations. The program provides a behind-the-scenes look at how organizations function and prepares students for their careers.",
  },
  {
    id: 16,
    name: "Transverse Mentoring",
    description: "A mentoring session where two alumni from similar fields help students clarify doubts about career paths and required skills. It’s ideal for students confused between two career options. Alumni provide insights into the work, challenges, and opportunities in their respective fields, helping students make informed decisions.",
  },
  {
    id: 17,
    name: "Ask the Alum",
    description: "An interactive session where students can ask questions to alumni about internships, career paths, and other topics. It’s a great opportunity to gain firsthand insights from experienced professionals. Alumni share their experiences, challenges, and advice, helping students navigate their career journeys.",
  },
  {
    id: 18,
    name: "Start It Up",
    description: "A session where students interact with entrepreneurs to gain insights into their journey and success stories. It’s designed to inspire students to explore entrepreneurship and innovation. Alumni share their experiences of starting and scaling businesses, motivating students to think creatively and take risks.",
  },
  {
    id: 19,
    name: "Mock Interviews and Group Discussions",
    description: "Conducted by alumni for students preparing for placements. Over 350 interviews were conducted in 2022, helping students improve their communication skills, confidence, and performance in placement interviews. The program covers both core and non-core fields, providing personalized feedback and tips for improvement.",
  },
  {
    id: 20,
    name: "Workshops",
    description: "Hands-on workshops on topics like finance, trading, consulting, analytics, and product management, organized during Alumination. These workshops help students gain practical knowledge and skills, preparing them for real-world challenges. Alumni and industry experts conduct the workshops, sharing their expertise and insights.",
  },
  {
    id: 21,
    name: "Class Song",
    description: "An annual event where students create and perform a class song. The 2022 edition was a huge success, bringing together students to celebrate their journey and create lasting memories. The event fosters creativity, teamwork, and a sense of belonging among students.",
  },
  {
    id: 22,
    name: "Knowledge Tree Newsletter",
    description: "A monthly newsletter that keeps alumni informed about student activities, research, and events at IIT Bombay. It features faculty interviews, technical breakthroughs, and updates on campus life. With a reach of over 65,000 alumni, the newsletter strengthens the bond between the institute and its alumni community.",
  },
];

const Initiative = () => {
  const { scrollY } = useScroll();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Smooth scroll progress for the ball animation
  const ballY = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    return scrollY.onChange((latest) => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = latest / maxScroll;
      setScrollProgress(progress);

      // Determine the current initiative index based on scroll position
      const index = Math.floor(progress * initiativesData.length);
      setCurrentIndex(index);
    });
  }, [scrollY]);

  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center py-10 px-4 relative">
      {/* Background Path and Ball Container - Set to a lower z-index */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {/* Zigzag Path with increased stroke width and opacity */}
        <svg
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          className="absolute inset-0"
        >
          <path
            d={`
              M 50,0
              ${initiativesData.map((_, index) => {
                const y = (100 / initiativesData.length) * (index + 1);
                const midY = y - (100 / initiativesData.length) / 2;
                return index % 2 === 0
                  ? `C 75,${midY - 20} 90,${midY} 50,${y}`
                  : `C 25,${midY - 20} 10,${midY} 50,${y}`;
              }).join(' ')}
            `}
            stroke="lightgrey"
            strokeWidth="6"
            fill="none"
            style={{ opacity: 0.8 }}
          />
        </svg>
        
        {/* Animated Ball */}
        <motion.div
          className="absolute w-6 h-6 bg-orange-500 rounded-full shadow-lg"
          style={{
            top: `${(currentIndex * 100) / initiativesData.length}%`,
            left: `${50 + Math.sin(scrollProgress * Math.PI * initiativesData.length) * 40}%`,
            transform: 'translate(-50%, -50%)',
            opacity: 0.8,
          }}
        />
      </div>

      {/* Initiative List - Set to a higher z-index */}
      <div className="w-full max-w-5xl space-y-20 relative" style={{ zIndex: 1 }}>
        {initiativesData.map((initiative, index) => (
          <motion.div
            key={initiative.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-orange-500 p-6 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-black"
          >
            <div className="text-left text-black p-4">
              <h2 className="text-xl font-bold">{initiative.name}</h2>
              <div className="bg-yellow-100 p-4 rounded-md mt-2 border border-black transition-all duration-300 hover:shadow-lg hover:shadow-black">
                <p className="text-sm">{initiative.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Scroll Progress Indicator - Keep at highest z-index */}
      <motion.div
        className="fixed bottom-4 right-4 w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold"
        style={{
          zIndex: 2,
          scale: useSpring(scrollProgress, {
            stiffness: 100,
            damping: 30,
            restDelta: 0.001
          })
        }}
      >
        {Math.round(scrollProgress * 100)}%
      </motion.div>
    </div>
  );
};

export default Initiative;