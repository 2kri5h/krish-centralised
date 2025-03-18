import React, { useEffect, useState } from "react";
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

const GridItem = ({ title, color, expandedContent, icon, className }) => {
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

  return (
    <div
      className={`${baseStyles} ${getBackgroundColor()}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
            className="absolute bottom-4 right-4 w-16 md:w-20 object-contain"
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
  <div className="border-[1px] border-black rounded-lg p-6 bg-[#F5F0D7] h-[200px] m-2"> {/* Increased height */}
    <div className="flex flex-col justify-between h-full">
      <p className="text-sm mb-4 font-medium italic">"{text}"</p>
      <p className="text-xs text-gray-600 mt-auto">{author}</p>
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

  // Hardcoded testimonials data
  const testimonials = [
    { text: "Wow, what a concept man...", author: "CEO, Apple" },
    { text: "Wow, what a concept man...", author: "CEO, Apple" },
    { text: "Wow, what a concept man...", author: "CEO, Apple" },
    { text: "Wow, what a concept man...", author: "CEO, Apple" },
  ];

  // Hardcoded alumni data
  const alumniData = [
    { name: "Mr XYZ", title: "CEO, Google", image: "/placeholder.jpg" },
    { name: "Mr XYZ", title: "CEO, Google", image: "/placeholder.jpg" },
    { name: "Mr XYZ", title: "CEO, Google", image: "/placeholder.jpg" },
    { name: "Mr XYZ", title: "CEO, Google", image: "/placeholder.jpg" },
    { name: "Mr XYZ", title: "CEO, Google", image: "/placeholder.jpg" },
    { name: "Mr XYZ", title: "CEO, Google", image: "/placeholder.jpg" },
    { name: "Mr XYZ", title: "CEO, Google", image: "/placeholder.jpg" },
    { name: "Mr XYZ", title: "CEO, Google", image: "/placeholder.jpg" },
    { name: "Mr XYZ", title: "CEO, Google", image: "/placeholder.jpg" },
    { name: "Mr XYZ", title: "CEO, Google", image: "/placeholder.jpg" },
    { name: "Mr XYZ", title: "CEO, Google", image: "/placeholder.jpg" },
    { name: "Mr XYZ", title: "CEO, Google", image: "/placeholder.jpg" },
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

  const handlePrevTestimonial = () => {
    setCurrentTestimonialIndex(prev => Math.max(0, prev - 1));
  };

  const handleNextTestimonial = () => {
    setCurrentTestimonialIndex(prev => 
      Math.min(prev + 1, testimonials.length - 4)
    );
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
            expandedContent={
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/90 rounded-lg p-3">
                  <p className="text-2xl font-light">14,000+</p>
                  <p>students</p>
                </div>
                <div className="bg-white/90 rounded-lg p-3">
                  <p className="text-2xl font-light">70,000+</p>
                  <p>alumni</p>
                </div>
              </div>
            }
          />

          {/* About SARC */}
          <GridItem
            title="About SARC"
            color="cream"
            className="col-span-full md:col-span-2"
            icon={aboutIcon}
            expandedContent={
              <div className="space-y-2">
                <div className="font-bold">WHAT is</div>
                <div className="text-xl">SARC</div>
                <div className="text-sm">Student Alumni Relations Cell</div>
              </div>
            }
          />

          {/* Esteemed Alumni */}
          <GridItem
            title="Esteemed Alumni"
            color="darkBlue"
            className="col-span-full md:col-span-1"
            icon={alumniIcon}
            expandedContent={
              <div className="grid grid-cols-2 gap-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="bg-white/20 rounded-lg p-2" />
                ))}
              </div>
            }
          />

          {/* Upcoming Events */}
          <GridItem
            title="Upcoming Events"
            color="orange"
            className="col-span-full md:col-span-3"
            icon={eventsIcon}
            expandedContent={
              <div className="relative">
                <div className="star-shape bg-white/90 p-4">
                  <p className="text-sm">Next Event</p>
                  <p className="font-bold">26 FEB</p>
                </div>
              </div>
            }
          />

          {/* Testimonials */}
          <GridItem
            title="Testimonials"
            color="cream"
            className="col-span-full md:col-span-4"
            icon={testimonialIcon}
            expandedContent={
              <div className="flex gap-4 overflow-x-auto">
                {[1,2,3].map(i => (
                  <div key={i} className="flex-none w-64 bg-white/90 rounded-lg p-3">
                    <p className="text-sm italic">"Great experience..."</p>
                  </div>
                ))}
              </div>
            }
          />

          {/* Contact */}
          <GridItem
            title="Contact"
            color="blue"
            className="col-span-full md:col-span-2"
            icon={contactIcon}
            expandedContent={
              <div className="space-y-2">
                <input 
                  type="text" 
                  placeholder="Phone" 
                  className="w-full p-2 rounded bg-white/90"
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full p-2 rounded bg-white/90"
                />
              </div>
            }
          />
        </div>

        

        {/* About SARC Section */}
        <div id="about" className="max-w-7xl mx-auto p-6 mt-12">
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
        <div className="mt-8">
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



        
        {/* Upcoming Events Section */}
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
        </div>

        

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
      <div className="max-w-7xl mx-auto p-4 md:p-6">
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
        <div className="mt-8 bg-[#F5F0D7] rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-orange-500 mb-6">Testimonials</h2>
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300"
                style={{
                  transform: `translateX(-${currentTestimonialIndex * 25}%)`,
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

            {/* Navigation Arrows */}
            <div className="flex justify-center mt-6 gap-8">
              <button 
                onClick={handlePrevTestimonial}
                className="border-[1px] border-orange-500 p-2 rounded"
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
                    strokeWidth="1" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button 
                onClick={handleNextTestimonial}
                className="border-[1px] border-orange-500 p-2 rounded"
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
                    strokeWidth="1" 
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
