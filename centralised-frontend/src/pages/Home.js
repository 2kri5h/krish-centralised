import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiclient from "../apiclient/apiclient";
import Footer from "../components/Footer/Footer";
// Import images
import {motion, useScroll, useTransform, useInView, AnimatePresence} from "framer-motion";
import boatImage from "../assets/boat-lighthouse.svg";
import aboutIcon from "../assets/about-icon.svg";
import alumniIcon from "../assets/image 7.png";
import eventsIcon from "../assets/event.png";
import testimonialIcon from "../assets/testimonial.svg";
import contactIcon from "../assets/contact.svg";
import alumniGroupImage from "../assets/alumGRP.svg";
// Import alumni images with exact filenames
import deepakImage from "../assets/gallery/gallery/Alumni/Copy of Deepak-Satwalekar.jpg";
import downloadImage from "../assets/gallery/gallery/Alumni/Copy of download (1).jpeg";
import falguniImage from "../assets/gallery/gallery/Alumni/Copy of Falguni-Nayar_1-1-scaled.jpg";
import ashimaImage from "../assets/gallery/gallery/Alumni/Copy of IAS-Ashima-Mittal-posted-as-the-CEO-Zilla-Parishad-of-Nashik-Maharashtra.jpeg";
import imagesImage from "../assets/gallery/gallery/Alumni/Copy of images.jpg";
import sivanImage from "../assets/gallery/gallery/Alumni/Copy of K._Sivan.jpg";
import sameerImage from "../assets/gallery/gallery/Alumni/Copy of sameer-saxena.jpg";
import shubhamImage from "../assets/gallery/gallery/Alumni/Copy of Shubham Kumar (IITB CE 2018).jpeg";
import uaxcImage from "../assets/gallery/gallery/Alumni/Copy of UaxcE0fi_400x400.jpg";
import unnamedImage from "../assets/gallery/gallery/Alumni/Copy of unnamed.jpg";
import wnqaemozImage from "../assets/gallery/gallery/Alumni/Copy of WnQAEMOz_400x400.jpg";
import nandanImage from "../assets/gallery/gallery/Alumni/Nandan Nilekani (IITB EE 1973).jpg";
import { useTypewriter, Cursor } from 'react-simple-typewriter';

// Update the welcomeTexts array with more simple greetings
const welcomeTexts = [
  { text: "Welcome", language: "English" },
  { text: "नमस्ते", language: "Hindi" },
  { text: "こんにちは", language: "Japanese" },
  { text: "Bonjour", language: "French" },
  { text: "안녕하세요", language: "Korean" },
  { text: "Hola", language: "Spanish" },
  { text: "Hallo", language: "German" },
  { text: "Labas", language: "Lithuanian" },
  { text: "Witaj", language: "Polish" },
  { text: "Ahoj", language: "Czech" },
  { text: "Xin chào", language: "Vietnamese" },
  { text: "สวัสดี", language: "Thai" }, // Thai script
  { text: "नमस्कार", language: "Nepali" }, // Devanagari script
  { text: "Selamat datang", language: "Malay" },
  // { text: "မင်္ဂလာပါ", language: "Burmese" }, // Burmese script
  { text: "Sannu", language: "Hausa" },
  // { text: "გამარჯობა", language: "Georgian" }, // Georgian script
  { text: "Բարեւ", language: "Armenian" }, // Armenian script
  // { text: "សួស្តី", language: "Khmer" }, // Khmer script
  { text: "ສະບາຍດີ", language: "Lao" }, // Lao script
  { text: "ಹಲೋ", language: "Kannada" }, // Kannada script
  { text: "హలో", language: "Telugu" }, // Telugu script
  { text: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ", language: "Punjabi (Gurmukhi)" }, // Gurmukhi script
  { text: "سلام", language: "Persian" }, // Persian script
  { text: "हॅलो", language: "Marathi" }, // Devanagari script
  { text: "হ্যালো", language: "Bengali" }, // Bengali script
  { text: "ନମସ୍କାର", language: "Odia" }, // Odia script
  { text: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ", language: "Punjabi (Gurmukhi)" }, // Gurmukhi script
  { text: "नमस्कार", language: "Konkani" }, // Devanagari script
  { text: "ନମସ୍କାର", language: "Assamese" }, // Assamese script
];

// Add this initiativesData array after the welcomeTexts array
const initiativesData = [
  {
    id: 1,
    name: "ALUMNI STUDENT MENTORSHIP PROGRAM",
    description: "A yearlong mentorship initiative, this program connects students with experienced alumni who guide them toward their ambitions. Through one-on-one mentorship, get valuable insights, self-belief, and strategic advice.",
    icon: "👨‍🏫",
    color: "bg-gradient-to-r from-orange-500 to-amber-500"
  },
  {
    id: 2,
    name: "ALUMINATION",
    description: "Alumination is the flagship Student-Alumni Fest of SARC, bringing together alumni from across the globe. An unforgettable experience of learning, networking, and mentorship.",
    icon: "🌟",
    color: "bg-gradient-to-r from-blue-500 to-purple-500"
  },
  {
    id: 3,
    name: "INDUSTRIAL LEARNING PROGRAM",
    description: "ILP offers students the opportunity to gain hands-on experience through internships and projects provided by our alumni. Held twice a year, in summers and winters.",
    icon: "🏭",
    color: "bg-gradient-to-r from-green-500 to-teal-500"
  },
  {
    id: 4,
    name: "TRANSVERSE MENTORING",
    description: "A session designed to help you navigate career crossroads, Transverse Mentoring connects you with alumni from two similar yet distinct fields.",
    icon: "🔄",
    color: "bg-gradient-to-r from-red-500 to-pink-500"
  },
  {
    id: 5,
    name: "CLASS SONG",
    description: "A musical tribute to the graduating batch, Class Song captures the essence of their journey at IIT Bombay. It celebrates friendships, nostalgia, and the countless unforgettable moments on campus.",
    icon: "🎵",
    color: "bg-gradient-to-r from-indigo-500 to-blue-500"
  },
  {
    id: 6,
    name: "EXAM SERIES",
    description: "Exam Series is an initiative that connects students with seasoned professionals and accomplished alumni to provide expert insights on competitive exams like UPSC, CAT, CFA, GMAT and more.",
    icon: "📝",
    color: "bg-gradient-to-r from-yellow-500 to-orange-500"
  },
  {
    id: 7,
    name: "SEEKOUT",
    description: "Insti's biggest crypt hunt, SeekOut, is the ultimate test of Insti knowledge, packed with puzzles and challenges. Solve clues, unlock secrets and race against others to claim exciting prizes.",
    icon: "🔍",
    color: "bg-gradient-to-r from-purple-500 to-pink-500"
  }
];

// Update the testimonials array with alumni quotes
const testimonials = [
  {
    text: "SARC keeps the IIT Bombay spirit alive by connecting alumni with students in meaningful ways. It's a fantastic initiative that encourages learning, growth and exploration.",
    author: "Sameer Saxena, Writer & Director"
  },
  {
    text: "The bridge that SARC creates between alumni and students is invaluable. It's inspiring to see how it helps young minds explore diverse career paths beyond conventional choices.",
    author: "Nitesh Tiwari, Filmmaker"
  },
  {
    text: "SARC is a powerful bridge between students and alumni, creating a community where experiences, insights, and opportunities are shared. It's incredible to see how it continues to inspire and guide students, helping them shape their future with confidence.",
    author: "Bhavish Aggarwal, Co-founder & CEO, Ola"
  },
  {
    text: "The mentorship and guidance SARC facilitates are truly invaluable. It empowers students to dream big, take risks and carve their own paths with confidence.",
    author: "Ahana Gautam, Co-founder, Open Secret"
  },
  {
    text: "SARC goes beyond just connecting students and alumni—it serves as a guiding force, helping students gain clarity, direction, and confidence from the experiences of those who have been in their shoes.",
    author: "Ashima Mittal, IAS Officer"
  },
  {
    text: "SARC has been instrumental in building a strong and enduring alumni network. By fostering mentorship and knowledge-sharing, it ensures that each generation of IIT Bombay students learns from those who have walked the path before them.",
    author: "Nandan Nilekani, Co-founder, Infosys"
  },
  {
    text: "SARC brings together alumni stories that go beyond textbooks and classrooms. It's a fantastic initiative that helps students explore unconventional paths and find the courage to carve their own unique journeys.",
    author: "Vipul Goyal, Stand-up Comedian & Writer"
  },
  {
    text: "SARC connects students with alumni who have faced similar crossroads, helping them make informed decisions and pursue their goals with conviction.",
    author: "Shubham Kumar, AIR 1 UPSC CSE 2020"
  }
];

const ResponsiveStats = () => {
  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '16px',
    '@media (min-width: 768px)': {
      padding: '24px'
    }
  };

  const cardStyle = {
    backgroundColor: '#A7D1F3',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    '@media (min-width: 768px)': {
      padding: '32px'
    }
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '16px',
    '@media (min-width: 768px)': {
      gridTemplateColumns: '1fr 1fr',
      gap: '24px'
    }
  };

  const statCardStyle = {
    backgroundColor: '#F5F0D7',
    border: '2px solid black',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '@media (min-width: 768px)': {
      padding: '24px'
    }
  };

  const numberStyle = {
    fontSize: '36px',
    fontStyle: 'italic',
    fontWeight: '300',
    '@media (min-width: 768px)': {
      fontSize: '48px'
    }
  };

  const labelStyle = {
    fontSize: '16px',
    marginTop: '8px',
    '@media (min-width: 768px)': {
      fontSize: '20px'
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '600',
          color: 'white',
          marginBottom: '20px',
          '@media (min-width: 768px)': {
            fontSize: '28px',
            marginBottom: '24px'
          }
        }}>Stats / Highlights</h2>

        <div style={gridStyle}>
          {/* Left Column - Stats */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            '@media (min-width: 768px)': {
              gap: '24px'
            }
          }}>
            {/* Students Stats */}
            <div style={statCardStyle}>
              <p style={numberStyle}>14,000+</p>
              <p style={labelStyle}>students</p>
            </div>
            
            {/* Events Stats */}
            <div style={statCardStyle}>
              <p style={numberStyle}>50+</p>
              <p style={labelStyle}>events</p>
            </div>
          </div>

          {/* Right Column - Alumni Stats */}
          <div style={statCardStyle}>
            <img 
              src={alumniGroupImage} 
              alt="Alumni Group" 
              style={{
                width: '150px',
                height: '150px',
                objectFit: 'contain',
                marginBottom: '12px',
                '@media (min-width: 768px)': {
                  width: '200px',
                  height: '200px',
                  marginBottom: '16px'
                }
              }}
            />
            <p style={numberStyle}>70,000+</p>
            <p style={labelStyle}>alumni</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResponsiveEvents = () => {
  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '16px',
    '@media (min-width: 768px)': {
      padding: '24px'
    }
  };

  const cardStyle = {
    backgroundColor: '#FF6B2B',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    '@media (min-width: 768px)': {
      padding: '32px'
    }
  };

  const eventCardStyle = {
    backgroundColor: '#F5F0D7',
    border: '2px solid black',
    borderRadius: '24px',
    padding: '16px',
    position: 'relative',
    '@media (min-width: 768px)': {
      borderRadius: '32px',
      padding: '24px'
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '600',
          color: 'white',
          marginBottom: '20px',
          '@media (min-width: 768px)': {
            fontSize: '28px',
            marginBottom: '24px'
          }
        }}>Upcoming Events</h2>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          {[1, 2].map((index) => (
            <div key={index} style={{ position: 'relative' }}>
              {/* Event Number */}
              <div style={{
                position: 'absolute',
                left: '-8px',
                top: '-8px',
                backgroundColor: '#F5F0D7',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '2px solid black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                fontSize: '16px',
                fontWeight: 'bold',
                '@media (min-width: 768px)': {
                  left: '-12px',
                  top: '-12px',
                  width: '48px',
                  height: '48px',
                  fontSize: '20px'
                }
              }}>
                {index}
              </div>
              
              {/* Event Content */}
              <div style={eventCardStyle}>
                {/* Photo Area */}
                <div style={{
                  aspectRatio: '16/9',
                  backgroundColor: '#E5E5E5',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  color: '#666666',
                  '@media (min-width: 768px)': {
                    borderRadius: '12px',
                    fontSize: '24px'
                  }
                }}>
                  PHOTO
                </div>
                
                {/* Date Tag */}
                <div style={{
                  position: 'absolute',
                  bottom: '-12px',
                  right: '16px',
                  backgroundColor: '#F5F0D7',
                  padding: '6px 12px',
                  border: '2px solid black',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '14px',
                  '@media (min-width: 768px)': {
                    bottom: '-16px',
                    right: '32px',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }
                }}>
                  <span style={{ color: '#FF6B2B', fontWeight: 'bold' }}>26</span>
                  <span>FEBRUARY</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Add this StarShape component before the Home component
const StarShape = ({ number }) => (
  <div className="absolute -top-6 -left-6 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-xl z-10 border-2 border-black">
    {number}
  </div>
);

const GridItem = ({ title, color, expandedContent, iconWidth = "50%",icon, className ,scrollToId}) => {
  const [isHovered, setIsHovered] = useState(false);


  const baseStyles = `
    rounded-2xl p-4 md:p-6 cursor-pointer 
    transition-all duration-300 ease-in-out
    relative overflow-hidden
    ${className}
  `;

  const getBackgroundColor = () => {
    switch(color) {
      case 'blue': return 'bg-[#A7D1F3]';
      case 'cream': return 'bg-[#F5E6C9]';
      case 'orange': return 'bg-[#FF6B2B]';
      case 'darkBlue': return 'bg-[#0066CC]';
      default: return 'bg-[#A7D1F3]';
    }
  };
  const handleScroll = () => {
    if (scrollToId) {
      const section = document.getElementById(scrollToId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  
  

  return (
    <div
      className={`${baseStyles} ${getBackgroundColor()}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleScroll} // Call scroll function on clic
    >
      <div className={`
        absolute inset-0 p-4 md:p-6
        transition-transform duration-300 ease-in-out
        ${isHovered ? 'translate-y-[-100%]' : 'translate-y-0'}
      `}>
        <h2 className="text-xl md:text-2xl font-semibold">
          {title}
        </h2>
        {icon && (
          <img 
            src={icon} 
            alt={title}
            className="absolute bottom-4 right-4 object-contain"
            style={{ width: iconWidth }}

          />
        )}
      </div>

      <div className={`
        absolute inset-0 p-4 md:p-6
        transition-transform duration-300 ease-in-out
        ${isHovered ? 'translate-y-0' : 'translate-y-[100%]'}
      `}>
        {expandedContent}
      </div>
    </div>
  );
};

// Add this component for the testimonial card
const TestimonialCard = ({ text, author }) => (
  <div className="border-[1px] border-black rounded-lg p-6 bg-[#F5F0D7] h-[420px] m-2"> {/* Increased height */}
    <div className="flex flex-col justify-between h-full">
      <p className="text-lg mb-4 font-medium italic">"{text}"</p> {/* Larger text */}
      <p className="text-sm text-gray-600 mt-auto">{author}</p> {/* Larger author text */}
    </div>
  </div>
);


// Add this component for the alumni card
const AlumniCard = ({ name, title, image }) => (
  <div className="bg-[#F5F0D7] rounded-lg p-4 flex flex-col items-center justify-center 
                  hover:scale-105 transition-transform duration-300 cursor-pointer m-2">
    <img
      src={image}
      alt={name}
      className="w-full h-32 object-cover rounded-lg mb-3"
    />
    <h3 className="text-sm font-medium text-center">{name}</h3>
    <p className="text-xs text-gray-600 text-center">{title}</p>
  </div>
);

const Home = () => {
  // First, declare all state variables
  const [data, setData] = useState([]);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [currentWelcomeIndex, setCurrentWelcomeIndex] = useState(0);
  const [scrollPhase, setScrollPhase] = useState(0);
  const [typingText, setTypingText] = useState("");
  const [showAboutSection, setShowAboutSection] = useState(false);
  const [aboutScrollProgress, setAboutScrollProgress] = useState(0);
  const [showAlumniSection, setShowAlumniSection] = useState(false);
  
  // Then declare all refs
  const horizontalScrollRef = useRef(null);
  const heroSectionRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const aboutAlumniRef = useRef(null);
  
  const navigate = useNavigate();
  
  // For typewriter effect
  const [aboutText] = useTypewriter({
    words: [
      "STUDENT ALUMNI RELATIONS CELL (SARC) IS A STUDENT BODY UNDER THE DEAN ACR OFFICE THAT AIMS AT STRENGTHENING THE BOND BETWEEN STUDENTS AND ALUMNI OF IIT BOMBAY. SARC CONDUCTS VARIOUS EVENTS THROUGHOUT THE YEAR TO FACILITATE INTERACTION BETWEEN ALUMNI AND STUDENTS. OUR MISSION IS TO FOSTER A STRONG AND MUTUALLY BENEFICIAL RELATIONSHIP BETWEEN THE INSTITUTE AND ITS ALUMNI COMMUNITY, CREATING OPPORTUNITIES FOR MENTORSHIP, KNOWLEDGE SHARING, AND COLLABORATIVE GROWTH."
    ],
    loop: 1,
    typeSpeed: 50,
    deleteSpeed: 10,
    delaySpeed: 1000,
  });
  
  // For parallax effect in hero section
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroSectionRef,
    offset: ["start start", "end start"]
  });
  
  // For horizontal scroll section
  const { scrollYProgress } = useScroll({
    target: horizontalScrollRef,
    offset: ["start end", "end start"]
  });
  
  // For about/alumni section
  const { scrollYProgress: aboutAlumniProgress } = useScroll({
    target: aboutAlumniRef,
    offset: ["start end", "end start"]
  });
  
  // Then define transforms
  const heroTextY = useTransform(heroScrollProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.5], [1, 0]);
  const horizontalScrollX = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  const aboutAlumniScrollX = useTransform(aboutAlumniProgress, [0, 1], ["0%", "-75%"]);
  
  // Now let's fix the useEffect to properly transition from About to Alumni sections
  useEffect(() => {
    const handleScroll = () => {
      // Check if we've scrolled past the initiatives section
      if (horizontalScrollRef.current) {
        const rect = horizontalScrollRef.current.getBoundingClientRect();
        // Only show about section when initiatives section is completely done
        if (scrollYProgress.get() > 0.99) { // Increased to 0.99 to ensure initiatives are fully complete
          setShowAboutSection(true);
          
          // Calculate scroll progress for the about section
          if (aboutSectionRef.current) {
            const aboutRect = aboutSectionRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const elementTop = aboutRect.top;
            const elementHeight = aboutRect.height;
            
            // Calculate progress based directly on scroll position
            const scrollPosition = window.scrollY - (aboutSectionRef.current.offsetTop - viewportHeight);
            const totalScrollDistance = aboutSectionRef.current.offsetHeight * 0.25; // Reduced to make typing complete faster
            const progress = Math.min(1, Math.max(0, scrollPosition / totalScrollDistance));
            
            setAboutScrollProgress(progress);
            
            // Only show alumni section when about section is fully typed and user has scrolled past the stats
            const statsSection = aboutSectionRef.current.querySelector('.grid');
            if (statsSection) {
              const statsSectionRect = statsSection.getBoundingClientRect();
              if (progress >= 1 && statsSectionRect.bottom < viewportHeight) {
                setShowAlumniSection(true);
              } else {
                setShowAlumniSection(false);
              }
            }
          }
        } else {
          setShowAboutSection(false);
          setShowAlumniSection(false);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollYProgress]);

  useEffect(() => {
    apiclient
      .get("chatbot/")
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));
      
    // Auto-change welcome text
    const welcomeInterval = setInterval(() => {
      setCurrentWelcomeIndex(prev => (prev + 1) % welcomeTexts.length);
    }, 3000);
    
    return () => clearInterval(welcomeInterval);
  }, []);
  
  // First, add these states at the beginning of your component
  const [visibleTestimonials, setVisibleTestimonials] = useState(3);
  const [duplicatedTestimonials, setDuplicatedTestimonials] = useState([]);

  // Create a simple array of duplicated testimonials for infinite scroll
  useEffect(() => {
    // Create duplicated testimonials for infinite scroll
    const duplicated = [...testimonials, ...testimonials, ...testimonials];
    setDuplicatedTestimonials(duplicated);
  }, [testimonials]);

  // Add this useEffect to handle responsive testimonial display
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleTestimonials(1);
      } else if (window.innerWidth < 1024) {
        setVisibleTestimonials(2);
      } else {
        setVisibleTestimonials(3);
      }
    };
    
    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Updated alumni data with personalized bios
  const alumniData = [
    {
      name: "Nandan Nilekani",
      title: "Co-founder of Infosys, Former Chairman of UIDAI",
      image: nandanImage,
      bio: "IIT Bombay EE 1973 graduate who co-founded Infosys, led India's ambitious Aadhaar project, and is known for his philanthropy and contributions to India's digital transformation."
    },
    {
      name: "Deepak Parekh",
      title: "Chairman of HDFC",
      image: deepakImage,
      bio: "A distinguished IIT Bombay alumnus who transformed HDFC into one of India's largest financial conglomerates. Known for his integrity and leadership in the banking and finance sector."
    },
    {
      name: "Falguni Nayar",
      title: "Founder & CEO of Nykaa",
      image: falguniImage,
      bio: "IIT Bombay graduate who left a successful banking career to found Nykaa at age 50, becoming one of India's most successful self-made female billionaires and e-commerce pioneers."
    },
    {
      name: "K. Sivan",
      title: "Former Chairman of ISRO",
      image: sivanImage,
      bio: "IIT Bombay alumnus who served as the chairman of ISRO and was instrumental in leading India's space missions including Chandrayaan-2. Known as the 'Rocket Man of India'."
    },
    {
      name: "Ashima Mittal",
      title: "IAS Officer",
      image: ashimaImage,
      bio: "IIT Bombay graduate who secured AIR 12 in the UPSC Civil Services Examination. Currently serving as CEO Zilla Parishad of Nashik, Maharashtra, making significant contributions to public administration."
    },
    {
      name: "Sameer Saxena",
      title: "Co-founder of TVF",
      image: sameerImage,
      bio: "IIT Bombay alumnus who co-founded The Viral Fever (TVF), revolutionizing India's digital entertainment landscape with original content that resonates with the youth."
    },
    {
      name: "Shubham Kumar",
      title: "IAS Officer, UPSC AIR 1",
      image: shubhamImage,
      bio: "IIT Bombay Civil Engineering 2018 graduate who topped the UPSC Civil Services Examination in 2020, inspiring many engineering students to pursue careers in public service."
    },
    {
      name: "Vipul Goyal",
      title: "Stand-up Comedian & Actor",
      image: unnamedImage,
      bio: "IIT Bombay alumnus who became one of India's most popular stand-up comedians. Known for his show 'Humorously Yours' and comedy that draws from his engineering background and campus experiences."
    },
    {
      name: "Bhavish Aggarwal",
      title: "Co-founder & CEO of Ola Cabs",
      image: uaxcImage,
      bio: "IIT Bombay Computer Science graduate who revolutionized India's transportation sector by founding Ola Cabs, and is now pioneering electric mobility through Ola Electric."
    },
    {
      name: "Pranav Mistry",
      title: "Former CEO of Samsung STAR Labs",
      image: wnqaemozImage,
      bio: "IIT Bombay alumnus who invented SixthSense, a wearable gestural interface. Former CEO of Samsung STAR Labs and recognized as one of the young innovators under 35 by MIT."
    },
    {
      name: "Parag Agrawal",
      title: "Former CEO of Twitter",
      image: uaxcImage,
      bio: "IIT Bombay Computer Science graduate who served as the CEO of Twitter. Previously as CTO, he led the company's technical strategy and oversaw machine learning and AI advancements."
    },
    {
      name: "Nitin Nohria",
      title: "Former Dean of Harvard Business School",
      image: imagesImage,
      bio: "IIT Bombay Chemical Engineering graduate who served as the 10th Dean of Harvard Business School from 2010-2020, the first Indian-American to hold this prestigious position."
    }
  ];

  // Add refs for each text section
  const greetingRef = useRef(null);
  const officialRef = useRef(null);
  const titleRef = useRef(null);
  const institutionRef = useRef(null);
  
  // Use inView to trigger animations
  const greetingInView = useInView(greetingRef, { once: false, amount: 0.5 });
  const officialInView = useInView(officialRef, { once: false, amount: 0.5 });
  const titleInView = useInView(titleRef, { once: false, amount: 0.5 });
  const institutionInView = useInView(institutionRef, { once: false, amount: 0.5 });

  // Ref for the scroll container
  const scrollContainerRef = useRef(null);
  
  const fullText = "STUDENT ALUMNI RELATIONS CELL";

  // Add this useEffect to handle the hero section scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      
      const scrollTop = window.scrollY;
      const containerHeight = scrollContainerRef.current.clientHeight;
      const windowHeight = window.innerHeight;
      
      // Calculate scroll percentage (0 to 1)
      const scrollPercentage = Math.min(scrollTop / (containerHeight - windowHeight), 1);
      
      // Adjust these percentages to transition to initiatives faster
      if (scrollPercentage < 0.1) { // Reduced from 0.15
        setScrollPhase(0); // Welcome in English
      } else if (scrollPercentage < 0.25) { // Reduced from 0.35
        // Cycle through different languages
        const languageIndex = Math.floor((scrollPercentage - 0.1) * 50) % welcomeTexts.length;
        setCurrentWelcomeIndex(languageIndex);
        setScrollPhase(1); // Welcome in other languages
      } else if (scrollPercentage < 0.4) { // Reduced from 0.5
        setScrollPhase(2); // "to the official website of"
      } else if (scrollPercentage < 0.6) { // Reduced from 0.75
        setScrollPhase(3); // "STUDENT ALUMNI RELATIONS CELL" with typing effect
        
        // Calculate how much of the text to show based on scroll
        const textProgress = (scrollPercentage - 0.4) / 0.2; // 0 to 1 within this phase (less time)
        const charactersToShow = Math.floor(textProgress * fullText.length);
        setTypingText(fullText.substring(0, charactersToShow));
      } else {
        setScrollPhase(4); // "IIT Bombay"
        setTypingText(fullText); // Show full text
      }
      
      // Hide the hero section content when scrolled far enough
      if (scrollPercentage >= 0.8) { // Reduced from 0.95
        setScrollPhase(5); // Hide hero content completely
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentWelcomeIndex]);

  // Fix the scrollToInitiatives function to properly scroll to initiatives
  const scrollToInitiatives = () => {
    if (horizontalScrollRef.current) {
      const offsetTop = horizontalScrollRef.current.offsetTop;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  // Fix the navbar z-index issue
  useEffect(() => {
    // Ensure navbar has the highest z-index
    const navbar = document.querySelector('nav'); // Or use the specific selector for your navbar
    if (navbar) {
      navbar.style.zIndex = '9999'; // Set a very high z-index
      navbar.style.position = 'relative'; // Ensure it has a position context
    }
    
    return () => {
      // Reset when component unmounts
      if (navbar) {
        navbar.style.zIndex = '';
        navbar.style.position = '';
      }
    };
  }, []);

  return (
    <div className="bg-black text-white">
      {/* Hero Section with Scroll-Based Text Animation */}
      <section 
        ref={scrollContainerRef}
        className="relative min-h-[400vh] bg-gradient-to-b from-blue-900 to-black"
        style={{ zIndex: 10 }} // Add higher z-index to ensure it's above other content
      >
        <div className="fixed inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/30 to-purple-900/30"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-500 filter blur-3xl opacity-30"></div>
        </div>
        
        {/* Fixed container for text animations */}
        <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-10"
             style={{ 
               opacity: window.scrollY < 2000 ? 1 : 0,
               visibility: window.scrollY < 2000 ? 'visible' : 'hidden',
               transition: 'opacity 0.5s, visibility 0.5s'
             }}>
          <div className="text-center max-w-4xl px-4">
            <AnimatePresence mode="wait">
              {scrollPhase === 0 && (
        <motion.div 
                  key="welcome-english"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-6xl md:text-8xl font-bold text-orange-500 mb-4"
                >
                  {welcomeTexts[0].text}
                </motion.div>
              )}
              
              {scrollPhase === 1 && (
          <motion.div
                  key="welcome-other"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-6xl md:text-8xl font-bold text-orange-500 mb-4"
                >
              {welcomeTexts[currentWelcomeIndex].text}
          </motion.div>
              )}
          
              {scrollPhase === 2 && (
          <motion.div
                  key="official-website"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl md:text-4xl text-white/80 mb-4"
                >
                  to the official website of
                </motion.div>
              )}
              
              {scrollPhase === 3 && (
                <motion.div
                  key="sarc-typing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl md:text-6xl font-bold text-white mb-4"
                >
                  {typingText}
                  <span className="inline-block w-1 h-8 bg-white/80 ml-1 animate-pulse"></span>
                </motion.div>
              )}
              
              {scrollPhase === 4 && (
                <motion.div
                  key="full-title"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
                    STUDENT ALUMNI RELATIONS CELL
                  </h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-2xl md:text-3xl text-orange-500 font-semibold"
                  >
                    IIT Bombay
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
                  >
              <button 
                onClick={scrollToInitiatives}
                className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-medium transition-colors"
              >
                Explore Initiatives
              </button>
              <a 
                href="https://centralised.sarc-iitb.org/initiatives"
                className="px-8 py-3 bg-transparent hover:bg-white/10 text-white border-2 border-white rounded-full font-medium transition-colors inline-block text-center"
              >
                Learn More
              </a>
          </motion.div>
        </motion.div>
              )}
            </AnimatePresence>
            </div>
          </div>
        
        {/* Spacer to create scrollable area */}
        <div className="h-[400vh]"></div>
      </section>
      
      {/* Add a clear div to ensure proper spacing between sections */}
      <div className="clear-both h-20"></div>
      
      {/* Horizontal Scrolling Initiatives Section */}
      <section 
        ref={horizontalScrollRef}
        className="relative h-[600vh] bg-black"
        style={{ zIndex: 1 }}
      >
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div 
            className="flex gap-8 pl-[10vw]"
            style={{ x: horizontalScrollX }}
          >
            {initiativesData.map((initiative) => (
              <div 
                key={initiative.id}
                className={`flex-shrink-0 w-[80vw] md:w-[40vw] h-[70vh] ${initiative.color} rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden`}
              >
                <div className="absolute -top-6 -left-6 w-12 h-12 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 rounded-full"></div>
                
                <div>
                  <span className="text-5xl mb-4 block">{initiative.icon}</span>
                  <h3 className="text-3xl font-bold text-white mb-4">{initiative.name}</h3>
                  <p className="text-white/80 text-lg leading-relaxed">
                    {initiative.description}
                  </p>
                </div>
                
                <div className="mt-8">
                  <a 
                    href="https://centralised.sarc-iitb.org/initiatives" 
                    className="bg-white/10 hover:bg-white/20 text-white py-3 px-6 rounded-lg transition-all flex items-center gap-2"
                  >
                    Learn more
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
            
            {/* More Initiatives Card */}
            <div className="flex-shrink-0 w-[80vw] md:w-[40vw] h-[70vh] bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 flex flex-col justify-center items-center relative overflow-hidden border border-gray-800">
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-orange-500/10 rounded-full"></div>
              
              <div className="text-center relative z-10">
                <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">More Initiatives</h3>
                <p className="text-white/70 text-lg mb-8">
                  Discover all our initiatives designed to strengthen the bond between students and alumni.
                </p>
                <a 
                  href="https://centralised.sarc-iitb.org/initiatives" 
                  className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg transition-colors inline-flex items-center gap-2"
                >
                  View All Initiatives
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
              </div>
          </motion.div>
            </div>
            
        {/* Add a visual indicator at the end of the initiatives section */}
        <div className="sticky bottom-10 w-full flex justify-center">
          <motion.div 
            className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center"
            style={{ 
              opacity: useTransform(scrollYProgress, [0.9, 1], [0, 1]),
              scale: useTransform(scrollYProgress, [0.9, 1], [0.5, 1])
            }}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
              </div>
      </section>
      
      {/* Add a clear spacer between sections */}
      <div className="h-40 bg-black"></div>
      
      {/* About SARC Section with Typewriter Effect */}
      <section 
        ref={aboutSectionRef}
        className="relative min-h-[400vh] bg-gradient-to-b from-black to-gray-900 py-20"
        style={{ 
          zIndex: 1,
          opacity: showAboutSection ? 1 : 0,
          transition: 'opacity 1s',
          pointerEvents: showAboutSection ? 'auto' : 'none'
        }}
      >
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showAboutSection ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col"
          >
            {/* About text section */}
            <div className="sticky top-20 pt-10 pb-20 mb-[80vh]">
              <h2 className="text-5xl font-bold text-orange-500 mb-12 text-center">ABOUT SARC</h2>
              
              {/* Main about text - all capital letters that type as you scroll */}
              <div className="bg-black/50 border border-gray-800 rounded-lg shadow-lg p-8 mb-16">
                <p className="text-white text-2xl md:text-3xl font-bold leading-relaxed">
                  {/* Calculate how much text to show based on scroll progress */}
                  {aboutText.substring(0, Math.floor(aboutScrollProgress * 2 * aboutText.length))}
                  <span className="inline-block w-2 h-8 bg-orange-500 ml-1 animate-pulse"></span>
                </p>
              </div>
            </div>
            
            {/* Stats section - appears at the end of typing but with more space */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: aboutScrollProgress > 0.7 ? 1 : 0,
                y: aboutScrollProgress > 0.7 ? 0 : 50
              }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-3 gap-2 md:gap-8 mt-[150vh] mb-[50vh]"
            >
              <div className="bg-black/50 border border-gray-800 rounded-lg shadow-lg p-2 md:p-8 text-center transform hover:scale-105 transition-transform">
                <h4 className="text-3xl md:text-6xl font-bold text-orange-500 mb-1 md:mb-4">14,000+</h4>
                <p className="text-gray-300 text-sm md:text-2xl">STUDENTS</p>
              </div>
              
              <div className="bg-black/50 border border-gray-800 rounded-lg shadow-lg p-2 md:p-8 text-center transform hover:scale-105 transition-transform">
                <h4 className="text-3xl md:text-6xl font-bold text-orange-500 mb-1 md:mb-4">70,000+</h4>
                <p className="text-gray-300 text-sm md:text-2xl">ALUMNI</p>
              </div>

              <div className="bg-black/50 border border-gray-800 rounded-lg shadow-lg p-2 md:p-8 text-center transform hover:scale-105 transition-transform">
                <h4 className="text-3xl md:text-6xl font-bold text-orange-500 mb-1 md:mb-4">30+</h4>
                <p className="text-gray-300 text-sm md:text-2xl">EVENTS</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Esteemed Alumni Section with Horizontal Scroll - appears immediately after About section */}
      <section 
        ref={aboutAlumniRef}
        className="relative h-[500vh] bg-black"
        style={{ 
          zIndex: 1,
          opacity: showAlumniSection ? 1 : 0,
          transition: 'opacity 1s'
        }}
      >
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <h2 className="absolute top-10 left-1/2 transform -translate-x-1/2 text-5xl font-bold text-orange-500 z-10">
            ESTEEMED ALUMNI
          </h2>
          <motion.div 
            className="flex gap-8 pl-[10vw] pr-[20vw] pt-16"
            style={{ x: aboutAlumniScrollX }}
          >
              {alumniData.map((alumni, index) => (
              <div 
                key={index}
                className="flex-shrink-0 w-[80vw] md:w-[40vw] h-[70vh] bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden border border-gray-800 relative"
              >
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-orange-500/10 rounded-full"></div>
                <div className="h-1/2 overflow-hidden">
                  <img 
                    src={alumni.image} 
                    alt={alumni.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-1">{alumni.name}</h3>
                  <p className="text-orange-500 text-lg mb-4">{alumni.title}</p>
                  <p className="text-gray-300">
                    {alumni.bio || "Distinguished alumnus of IIT Bombay who has made significant contributions in their field."}
                  </p>
                  </div>
                </div>
              ))}
          </motion.div>
            </div>
      </section>
      
      {/* Add another clear spacer before testimonials */}
      <div className="h-40 bg-black"></div>

        {/* Testimonials Section with Infinite Scroll */}
      <div className="mt-8 bg-gray-900 rounded-2xl p-6 mb-12 mx-4 md:mx-auto max-w-7xl" id="testimonial">
          <h2 className="text-2xl font-semibold text-orange-500 mb-6">Testimonials</h2>
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentTestimonialIndex * (100 / visibleTestimonials)}%)`,
                  width: `${duplicatedTestimonials.length * (100 / visibleTestimonials)}%`
                }}
              >
                {duplicatedTestimonials.map((testimonial, index) => (
                  <div 
                    key={index} 
                    className="px-2"
                    style={{ width: `${100 / visibleTestimonials}%` }}
                  >
                    <div className="bg-black/50 border border-gray-800 p-6 rounded-xl shadow-md h-full">
                      <p className="text-gray-300 mb-4 text-sm md:text-base">"{testimonial.text}"</p>
                      <p className="text-orange-500 font-medium text-sm md:text-base">{testimonial.author}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows - Fixed z-index and event handling */}
            <div className="flex justify-center mt-8 gap-8 relative z-50">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  const newIndex = currentTestimonialIndex - 1;
                  setCurrentTestimonialIndex(newIndex < 0 ? 0 : newIndex);
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors relative z-50"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  const newIndex = currentTestimonialIndex + 1;
                  const maxIndex = duplicatedTestimonials.length - visibleTestimonials;
                  setCurrentTestimonialIndex(newIndex > maxIndex ? maxIndex : newIndex);
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors relative z-50"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      
      <Footer />
    </div>
  );
};

export default Home;