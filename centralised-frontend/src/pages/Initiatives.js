import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const initiativesData = [
  {
    id: 1,
    name: "Alumni Student Mentorship Program (ASMP)",
    description: "A year-long mentorship program connecting students with alumni to foster meaningful mentoring relationships. Includes events like 'Break the Ice' and 'Nail the Prep.'",
  },
  {
    id: 2,
    name: "Alumination",
    description: "The flagship fest of SARC, featuring workshops, mentoring sessions, talk shows, and informal activities. Events include 'Speed Mentoring' and 'Coming Full Circle.'",
  },
  {
    id: 3,
    name: "CEO Connect",
    description: "Interactive sessions with CEOs like Bhavish Aggarwal and Vineet Rao to inspire and guide students. A new initiative launched in 2022.",
  },
  {
    id: 4,
    name: "Placement Mentoring Program (PMP)",
    description: "Helps final-year students prepare for placements through mock interviews, group discussions, and personalized feedback from alumni.",
  },
  {
    id: 5,
    name: "Industrial Learning Program (ILP)",
    description: "Provides students with professional experience through internships and projects offered by alumni. Conducted twice a year during summer and winter breaks.",
  },
  {
    id: 6,
    name: "Phonathon",
    description: "A telephonic marathon where students contact over 15,000 alumni to update them about institute initiatives. Helps students build communication skills and network with alumni.",
  },
  {
    id: 7,
    name: "SARCasm",
    description: "The biggest crypt hunt of IIT Bombay, where students solve puzzles and clues in teams over 48 hours. A fun and creative event with exciting prizes.",
  },
  {
    id: 8,
    name: "Core Talks",
    description: "Department-wise talks that cater to higher studies and core jobs. Students gain insights into career opportunities and earn placement points.",
  },
  {
    id: 9,
    name: "Exam Series",
    description: "Workshops and mentoring sessions for students preparing for competitive exams like UPSC, CFA, GRE, GMAT, and CAT. Students interact with top AIRs.",
  },
  {
    id: 10,
    name: "Beyond the Horizon",
    description: "An informal event highlighting alumni who pursued non-traditional career paths. Features inspiring stories from alumni like Nitesh Tiwari (director of *Dangal* and *Chhichhore*).",
  },
  {
    id: 11,
    name: "Dean Ki Adaalat",
    description: "An interactive panel discussion with the Dean ACR, Dean AA, and Dean RnD of IIT Bombay. Students get to ask questions and clarify their perceptions about the institution.",
  },
  {
    id: 12,
    name: "UG & PG Orientation",
    description: "The first event of SARC for UG and PG freshers. Includes fun activities and games, with over 250 students attending in 2022.",
  },
  {
    id: 13,
    name: "Reunions",
    description: "A series of events organized for alumni to relive their memories and connect with students. Provides an opportunity for students to interact with a large number of alumni.",
  },
  {
    id: 14,
    name: "Institute Valedictory Function",
    description: "A semi-formal event for graduating students, organized by SARC and the Dean ACR Office. Features keynote speakers like Mr. Arun Firodia and Dr. Ganesh Natarajan.",
  },
  {
    id: 15,
    name: "Shadow Program",
    description: "Students visit an alumnus's workplace to gain insights into the work methodology and office environment.",
  },
  {
    id: 16,
    name: "Transverse Mentoring",
    description: "A mentoring session where two alumni from similar fields help students clarify doubts about career paths and required skills.",
  },
  {
    id: 17,
    name: "Ask the Alum",
    description: "An interactive session where students can ask questions to alumni about internships, career paths, and other topics.",
  },
  {
    id: 18,
    name: "Start It Up",
    description: "A session where students interact with entrepreneurs to gain insights into their journey and success stories.",
  },
  {
    id: 19,
    name: "Hostel and Department Affairs (HDA)",
    description: "Maintains alumni-student relations in every hostel and department. Organizes events at the institute and Pan-IIT levels.",
  },
  {
    id: 20,
    name: "Operations (Ops)",
    description: "The backbone of SARC, responsible for finance, logistics, vendor management, and coordination with the Dean ACR Office.",
  },
  {
    id: 21,
    name: "Design Portfolio",
    description: "Responsible for creating posters, teasers, trailers, and merchandise to publicize SARC events and programs.",
  },
  {
    id: 22,
    name: "Media & Public Relations (PR)",
    description: "Manages SARC's social media presence, including Instagram, Facebook, LinkedIn, and YouTube. Also handles the alumni newsletter, *The Knowledge Tree*.",
  },
  {
    id: 23,
    name: "Web Portfolio",
    description: "Responsible for SARC's online presence, including the development of websites for programs like ILP, PMP, ASMP, and Phonathon.",
  },
  {
    id: 24,
    name: "Marketing Portfolio",
    description: "Handles marketing strategies, alumni and corporate relations, and sponsorships for SARC events.",
  },
  {
    id: 25,
    name: "Mock Interviews and Group Discussions",
    description: "Conducted by alumni for students preparing for placements. Over 350 interviews were conducted in 2022.",
  },
  {
    id: 26,
    name: "Workshops",
    description: "Hands-on workshops on topics like finance, trading, consulting, analytics, and product management, organized during Alumination.",
  },
  {
    id: 27,
    name: "Class Song",
    description: "An annual event where students create and perform a class song. The 2022 edition was a huge success.",
  },
  {
    id: 28,
    name: "Knowledge Tree Newsletter",
    description: "A monthly newsletter that keeps alumni informed about student activities, research, and events at IIT Bombay. It has a reach of over 65,000 alumni.",
  },
  {
    id: 29,
    name: "SARC Centralized Website",
    description: "A centralized platform for all SARC initiatives, including ILP, PMP, ASMP, and Phonathon.",
  },
  {
    id: 30,
    name: "Yearbook",
    description: "A project by the Web Portfolio to document the year's events and achievements.",
  },
];

const Initiative = () => {
  const { scrollY } = useScroll();
  const [scrollProgress, setScrollProgress] = useState(0);

  // Smooth scroll progress for the ball animation
  const ballY = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    return scrollY.onChange((latest) => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(latest / maxScroll);
    });
  }, [scrollY]);

  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center py-10 px-4 relative">
      {/* Animated Path and Ball */}
      <motion.div 
        className="fixed left-4 top-0 bottom-0 w-8 pointer-events-none"
        style={{ opacity: 0.3 }}
      >
        {/* Curved Path */}
        <svg
          viewBox="0 0 32 100"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M 16,0 Q 32,50 16,100"
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
        </svg>
        
        {/* Animated Ball */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full"
          style={{
            top: `${scrollProgress * 100}%`,
          }}
        />
      </motion.div>

      {/* Initiative List */}
      <div className="w-full max-w-5xl space-y-6">
        {initiativesData.map((initiative, index) => (
          <motion.div
            key={initiative.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
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

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed bottom-4 right-4 w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold"
        style={{
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