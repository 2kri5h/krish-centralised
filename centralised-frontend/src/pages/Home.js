import React, { useEffect, useState, useRef } from "react";
import apiclient from "../apiclient/apiclient";
import Footer from "../components/Footer/Footer";
// Import images
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

const StarShape = ({ number }) => {
  return (
    <div style={{
      position: 'absolute',
      left: '-12px',
      top: '-12px',
      width: '40px',
      height: '40px',
      backgroundColor: '#F5F0D7',
      clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
      border: '2px solid black',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
      fontSize: '20px',
      fontWeight: 'bold'
    }}>
      {number}
    </div>
  );
};

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
  const [data, setData] = useState(null);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // Updated testimonials data
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

  // Updated alumni data with exact image paths
  const alumniData = [
    { 
      name: "Deepak Satwalekar", 
      title: "Former MD & CEO, HDFC Standard Life Insurance", 
      image: deepakImage 
    },
    { 
      name: "Nitesh Tiwari", 
      title: "Director", 
      image: downloadImage 
    },
    { 
      name: "Falguni Nayar", 
      title: "Founder & CEO, Nykaa", 
      image: falguniImage 
    },
    { 
      name: "Ashima Mittal", 
      title: "IAS Officer, CEO Zilla Parishad of Nashik", 
      image: ashimaImage 
    },
    { 
      name: "Ashishkumar Chauhan", 
      title: "MD & CEO, Bombay Stock Exchange", 
      image: imagesImage 
    },
    { 
      name: "K. Sivan", 
      title: "Former Chairman, ISRO", 
      image: sivanImage 
    },
    { 
      name: "Sameer Saxena", 
      title: "Co-founder, TVF", 
      image: sameerImage 
    },
    { 
      name: "Shubham Kumar", 
      title: "IITB CE 2018", 
      image: shubhamImage 
    },
    { 
      name: "Bhavish Aggarwal", 
      title: "Founder & CEO, Ola", 
      image: uaxcImage 
    },
    { 
      name: "Vipul Goyal", 
      title: "Comedian", 
      image: unnamedImage 
    },
    { 
      name: "Ahana Gautam", 
      title: "CEO, Open Secret", 
      image: wnqaemozImage 
    },
    { 
      name: "Nandan Nilekani", 
      title: "Co-founder & Chairman, Infosys", 
      image: nandanImage 
    }
  ];

  useEffect(() => {
    apiclient
      .get("chatbot/")
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));
  }, []);
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Auto-scroll interval ref
const intervalRef = useRef();

useEffect(() => {
  intervalRef.current = setInterval(() => {
    setCurrentTestimonialIndex((prev) => {
      if (window.innerWidth >= 768) { // For md screens and above
        return prev === Math.floor(testimonials.length / 4) * 4 - 2 ? 0 : (prev + 1) % testimonials.length;
      }
      return (prev + 1) % testimonials.length;
    });
  }, 5000);

  return () => clearInterval(intervalRef.current);
}, [testimonials.length]);

// Navigation Functions
const handlePrevTestimonial = () => {
  clearInterval(intervalRef.current);
  setCurrentTestimonialIndex((prev) => {
    if (window.innerWidth >= 768) { // For md screens and above
      return prev === 0 ? Math.floor(testimonials.length / 4) * 4 - 2 : prev - 1;
    }
    return prev === 0 ? testimonials.length - 1 : prev - 1;
  });
  restartAutoScroll();
};

const handleNextTestimonial = () => {
  clearInterval(intervalRef.current);
  setCurrentTestimonialIndex((prev) => {
    if (window.innerWidth >= 768) { // For md screens and above
      return prev === Math.floor(testimonials.length / 4) * 4 - 2 ? 0 : prev + 1;
    }
    return prev === testimonials.length - 1 ? 0 : prev + 1;
  });
  restartAutoScroll();
};

// Restart auto-scroll after manual interaction
const restartAutoScroll = () => {
  intervalRef.current = setInterval(() => {
    setCurrentTestimonialIndex((prev) => {
      if (window.innerWidth >= 768) { // For md screens and above
        return prev === Math.floor(testimonials.length / 4) * 4 - 2 ? 0 : (prev + 1) % testimonials.length;
      }
      return (prev + 1) % testimonials.length;
    });
  }, 5000);
};

  

  
  return (
    <div className="bg-black min-h-screen">
      {/* Grid Layout Section */}
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[180px]">
          {/* Stats/Highlights */}
          <GridItem
            title="Stats / Highlights"
            color="blue"
            className="col-span-full md:col-span-3 row-span-2"
            icon={boatImage}
            iconWidth="60%"
            expandedContent={
              <div className="grid grid-cols-2 gap-4">
  {/* First Box: Students */}
  <div className="bg-[#F9F5DC] rounded-lg p-6 flex flex-col justify-center items-center shadow-md border border-gray-300">
    <p className="text-4xl font-light text-black">14,000+</p>
    <p className="text-lg font-medium text-gray-700">students</p>
  </div>

  {/* Second Box: Alumni Image */}
  <div className="bg-[#F9F5DC] rounded-lg p-6 flex justify-center items-center shadow-md border border-gray-300">
    <img 
      src={alumniIcon} 
      alt="Alumni"
      className="w-32 md:w-40 object-contain"
    />
  </div>

  {/* Third Box: Events */}
  <div className="bg-[#F9F5DC] rounded-lg p-6 flex flex-col justify-center items-center shadow-md border border-gray-300">
    <p className="text-4xl font-light text-black">50+</p>
    <p className="text-lg font-medium text-gray-700">events</p>
  </div>

  {/* Fourth Box: Alumni */}
  <div className="bg-[#F9F5DC] rounded-lg p-6 flex flex-col justify-center items-center shadow-md border border-gray-300">
    <p className="text-4xl font-light text-black">70,000+</p>
    <p className="text-lg font-medium text-gray-700">alumni</p>
  </div>
</div>

            }
            scrollToId="stat"
          />

          {/* About SARC */}
          <GridItem
            title="About SARC"
            color="cream"
            className="col-span-full md:col-span-2"
            icon={aboutIcon}
            iconWidth="40%"
            expandedContent={
              <div className="space-y-2">
                A student-run organization at IIT Bombay, SARC (Student Alumni Relations Cell) connects 65,000+ alumni and 12,000+ students, fostering lifelong bonds through 50+ events across various domains every year.
              </div>
            }
            scrollToId="about"
          />

          {/* Esteemed Alumni */}
          <GridItem
            title="Esteemed Alumni"
            color="darkBlue"
            className="col-span-full md:col-span-1"
            icon={alumniIcon}
            expandedContent={
              <div >
                <img 
      src={alumniIcon} 
      alt="Alumni"
      className="w-40 object-fit"
    />
              </div>
            }
            scrollToId="alumni"
          />

          {/* Upcoming Events */}
          <GridItem
            title="Upcoming Events"
            color="orange"
            className="col-span-full md:col-span-3"
            icon={eventsIcon}
            iconWidth="25%"
            expandedContent={
              <div className="relative">
                <div className="star-shape p-4">
                  <p className="text-4xl ">Coming Soon</p>
                </div>
              </div>
            }
            scrollToId="about"
          />

          {/* Testimonials */}
          <GridItem
            title="Testimonials"
            color="cream"
            className="col-span-full md:col-span-4"
            icon={testimonialIcon}
            iconWidth="23%"
            scrollToId="testimonial"
            expandedContent={
              <div className="flex flex-wrap md:flex-nowrap justify-center gap-4 p-4">
                {/* First Testimonial */}
                <div 
                  className="w-full sm:w-64 bg-[#F9F5DC]/90 backdrop-filter backdrop-blur-lg shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-opacity-20 border-white rounded-2xl p-4 flex flex-col justify-center items-center text-center transition-all duration-300 hover:transform hover:scale-105"
                >
                  <p className="text-md font-semibold">"SARC keeps the IIT Bombay spirit alive by connecting alumni with students in meaningful ways."</p>
                  <p className="text-sm text-gray-600 mt-2">Sameer Saxena, Writer & Director</p>
                </div>

                {/* Second Testimonial */}
                <div 
                  className="w-full sm:w-64 bg-[#F9F5DC]/90 backdrop-filter backdrop-blur-lg shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-opacity-20 border-white rounded-2xl p-4 flex flex-col justify-center items-center text-center transition-all duration-300 hover:transform hover:scale-105"
                >
                  <p className="text-md font-semibold">"The mentorship and guidance SARC facilitates are truly invaluable for students."</p>
                  <p className="text-sm text-gray-600 mt-2">Ashima Mittal, IAS Officer</p>
                </div>

                {/* Third Testimonial */}
                <div 
                  className="w-full sm:w-64 bg-[#F9F5DC]/90 backdrop-filter backdrop-blur-lg shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-opacity-20 border-white rounded-2xl p-4 flex flex-col justify-center items-center text-center transition-all duration-300 hover:transform hover:scale-105"
                >
                  <p className="text-md font-semibold">"SARC brings together alumni stories that inspire and guide future generations."</p>
                  <p className="text-sm text-gray-600 mt-2">Nandan Nilekani, Co-founder, Infosys</p>
                </div>
              </div>
            }
          />

          {/* Contact */}
          <GridItem
            title="Contact"
            color="blue"
            className="col-span-full md:col-span-2"
            icon={contactIcon}
            iconWidth="45%"
            expandedContent={
              <div className="space-y-2">
              {/* First Row: Office Contact */}
              <div className="flex justify-between items-center w-full p-3 rounded-lg bg-[#F9F5DC] shadow-md">
                <span className="text-md font-medium text-gray-700">OFFICE</span>
                <span className="text-lg font-bold text-black">881382383</span>
              </div>
          
            
              {/* Third Row: Overall OC Contact */}
              <div className="flex justify-between items-center w-full p-3 rounded-lg bg-[#F9F5DC] shadow-md">
                <span className="text-md font-medium text-gray-700">OVERALL OC</span>
                <span className="text-lg font-bold text-black">6263173987</span>
              </div>
            </div>
            
            }
            scrollToId="contactUs"
          />
        </div>

        

        {/* About SARC Section */}
        <div id="about" className="max-w-7xl mx-auto pt-6 pb-6 mt-12">
          <div className="bg-[#FDF5C9] w-full border border-black rounded-lg p-6 shadow-lg">
            <h2 className="text-4xl font-bold text-blue-700 mb-6">About SARC</h2>
            
            <div className="flex flex-col gap-6 w-full">
              {/* WHAT is SARC */}
              <div className="bg-white border border-black rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center">
                <div className="md:w-1/4 text-left">
                  <p className="text-3xl italic">WHAT is</p>
                  <p className="text-6xl font-bold text-blue-700 mt-2">SARC</p>
                </div>
                <p className="md:w-3/4 text-gray-800 mt-4 md:mt-0 md:ml-6 text-sm md:text-base">
                  A student-run organization at IIT Bombay, SARC (Student Alumni Relations Cell) connects 65,000+ alumni and 12,000+ students, fostering lifelong bonds through 50+ events across various domains every year. Since its inception in 2008, SARC has been dedicated to strengthening student-alumni relations by providing mentorship, networking, and collaborative opportunities. Working closely with the Dean ACR Office, IITB Alumni Association, and various department and hostel councils, SARC bridges the gap between students, alumni, and the institute, ensuring a thriving and engaged IIT Bombay community.
                </p>
              </div>

              {/* Our VISION */}
              <div className="bg-white border border-black rounded-lg shadow-lg p-6 flex flex-col md:flex-row-reverse items-center">
                <div className="md:w-1/4 text-right">
                  <p className="text-3xl">Our</p>
                  <p className="text-6xl font-bold text-blue-700 italic">VISION</p>
                </div>
                <p className="md:w-3/4 text-gray-800 mt-4 md:mt-0 md:mr-6 text-sm md:text-base">
                  Alumni are the bridge between the past, present, and future of an institute, fostering a legacy of growth and inspiration. The vision of SARC IIT Bombay is to strengthen this bond by connecting students and alumni through mentorship, networking, and collaborative initiatives. By providing exposure, guidance, and opportunities, SARC enables students to learn from alumni experiences while allowing alumni to contribute meaningfully to their alma mater. Through its efforts, SARC builds a dynamic and engaged community dedicated to mutual growth and lifelong connections.
                </p>
              </div>
            </div>
          </div>
        </div>


  
            

        {/* Stats Section */}
        <div className="mt-8" id="stat">
          <div className="bg-[#A7D1F3] rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-6">Stats / Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column Stats */}
              <div className="space-y-6">
                <div className="bg-[#F5F0D7] border-2 border-black rounded-xl p-4 text-center">
                  <p className="text-4xl font-light italic">14,000+</p>
                  <p className="mt-2">students</p>
                </div>
                <div className="bg-[#F5F0D7] border-2 border-black rounded-xl p-4 text-center">
                  <p className="text-4xl font-light italic">50+</p>
                  <p className="mt-2">events</p>
                </div>
              </div>
              
              {/* Right Column - Alumni Stats */}
              <div className="md:col-span-2">
                <div className="bg-[#F5F0D7] border-2 border-black rounded-xl p-4 text-center h-full flex flex-col items-center justify-center">
                  <img 
                    src={alumniGroupImage} 
                    alt="Alumni Group" 
                    className="w-40 h-40 object-contain mb-4"
                  />
                  <p className="text-4xl font-light italic">70,000+</p>
                  <p className="mt-2">alumni</p>
                </div>
              </div>
            </div>
          </div>
        </div>




        {/* Upcoming Events Section
        <div id="events" className="mt-8">
          <div className="bg-[#FF6B2B] rounded-2xl p-4 md:p-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">Upcoming Events</h2>
            <div className="space-y-6">
              {[1, 2].map((index) => (
                <div key={index} className="relative">
                  <StarShape number={index} />
                  <div className="bg-[#F5F0D7] border-2 border-black rounded-[2rem] p-4 md:p-6 relative">
                    <div className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center">
                      <span className="text-xl md:text-2xl text-gray-600">PHOTO</span>
                    </div>
                    <div className="absolute -bottom-4 right-8 bg-[#F5F0D7] px-3 py-2 md:px-4 md:py-2 border-2 border-black rounded-lg flex items-center space-x-2">
                      <span className="text-[#FF6B2B] font-bold text-sm md:text-base">26</span>
                      <span className="text-sm md:text-base">FEBRUARY</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}

        

        {/* Contact Section */}
        <div id="contact" className="max-w-7xl mx-auto p-6">
          {/* <section>
            <h2 className="text-2xl font-bold text-blue-400 mb-4">Contact Us</h2>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <p className="text-gray-400">Follow us on social media:</p>
              <div className="flex space-x-4 mt-2">
                <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Facebook</a>
                <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Twitter</a>
                <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">LinkedIn</a>
              </div>
            </div>
          </section> */}
        </div>
      </div>

      {/* Esteemed Alumni Section */}
      <div className="max-w-7xl mx-auto p-4 md:p-6" id="alumni">
        <div className="bg-blue-700 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-white mb-6">Esteemed Alumni</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {alumniData.map((alumni, index) => (
              <AlumniCard 
                key={index}
                name={alumni.name}
                title={alumni.title}
                image={alumni.image}
              />
            ))}
          </div>
        </div>




        {/* Testimonials Section */}
        <div className="mt-8 bg-[#F5F0D7] rounded-2xl p-6" id="testimonial min-h-[500px]"> {/* Increased section height */}
      <h2 className="text-2xl font-semibold text-orange-500 mb-6">Testimonials</h2>
      <div className="relative">
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentTestimonialIndex * (window.innerWidth < 768 ? 100 : 25)}%)`,
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="flex-none w-full md:w-1/4"
              >
                <TestimonialCard 
                  text={testimonial.text} 
                  author={testimonial.author} 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Navigation Arrows */}
        <div className="flex justify-center mt-8 gap-8">
          <button 
            onClick={handlePrevTestimonial}
            className="bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 transition-colors"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
              className="transform rotate-180"
            >
              <path 
                d="M9 18l6-6-6-6" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button 
            onClick={handleNextTestimonial}
            className="bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 transition-colors"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
            >
              <path 
                d="M9 18l6-6-6-6" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>

      
      
      <Footer />
    </div>
  );
};

export default Home;