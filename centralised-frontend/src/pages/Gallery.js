<<<<<<< HEAD
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Gallery.css";
=======
import React, { useState, useRef } from "react";
>>>>>>> c237bd9c6d71425d0cff972ecae9a59b3728446c
import sidephoto from "../assets/gallery/sidegallery.png";

// Import all gallery images
import image1 from "../assets/gallery/gallery/1.jpg";
import image2 from "../assets/gallery/gallery/2.JPG";
import image3 from "../assets/gallery/gallery/3.JPG";
import image4 from "../assets/gallery/gallery/4.png";
import image5 from "../assets/gallery/gallery/5.JPG";
import image6 from "../assets/gallery/gallery/6.JPG";
import image7 from "../assets/gallery/gallery/7.JPG";
import image8 from "../assets/gallery/gallery/8.JPG";
import image9 from "../assets/gallery/gallery/9.JPG";
import image10 from "../assets/gallery/gallery/10.png";
import image11 from "../assets/gallery/gallery/11.png";
import image12 from "../assets/gallery/gallery/12.png";
import image13 from "../assets/gallery/gallery/13.png";
import image14 from "../assets/gallery/gallery/14.png";
import image15 from "../assets/gallery/gallery/15.png";
import image16 from "../assets/gallery/gallery/16.png";
import image17 from "../assets/gallery/gallery/17.png";
import image18 from "../assets/gallery/gallery/18.png";
import image19 from "../assets/gallery/gallery/19.png";
import image20 from "../assets/gallery/gallery/20.png";
import image21 from "../assets/gallery/gallery/21.jpeg";
import image22 from "../assets/gallery/gallery/22.jpeg";
import image23 from "../assets/gallery/gallery/23.jpeg";
import image24 from "../assets/gallery/gallery/24.JPG";
import image25 from "../assets/gallery/gallery/25.JPG";
import image26 from "../assets/gallery/gallery/26.JPG";
import image27 from "../assets/gallery/gallery/27.JPG";
import image28 from "../assets/gallery/gallery/28.JPG";
import image29 from "../assets/gallery/gallery/29.JPG";
import image30 from "../assets/gallery/gallery/30.JPG";
import image31 from "../assets/gallery/gallery/31.png";
import image32 from "../assets/gallery/gallery/32.JPG";
import image33 from "../assets/gallery/gallery/33.png";
import image34 from "../assets/gallery/gallery/34.JPG";
import image35 from "../assets/gallery/gallery/35.jpeg";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

<<<<<<< HEAD
// Create a dummy array of image sources for testing
const placeholderImages = Array(35).fill(sidephoto);

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const galleryRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [imagesLoadStatus, setImagesLoadStatus] = useState({});

  // Check mobile on mount and resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Track image loading status
  const handleImageLoad = (index) => {
    setImagesLoadStatus(prev => ({...prev, [index]: 'loaded'}));
  };

  const handleImageError = (index) => {
    setImagesLoadStatus(prev => ({...prev, [index]: 'error'}));
  };

  // Create image array with all images
  const createImageGrid = () => {
    const allImages = [
      image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, 
      image11, image12, image13, image14, image15, image16, image17, image18, image19, image20, 
      image21, image22, image23, image24, image25, image26, image27, image28, image29, image30,
      image31, image32, image33, image34, image35
    ];
    
    return allImages.map((img, index) => ({
      id: index,
      src: img,
      fallbackSrc: sidephoto,
    }));
  };
  
  const imageGrid = createImageGrid();
  
  // Handle lightbox
  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="gallery-container">
      <div className="gallery-header">
        <h1>Our Memories</h1>
        <p>Moments we've captured along our journey</p>
      </div>
      
      <div className="mobile-gallery-wrapper">
        {isMobile ? (
          // Simple column layout for mobile
          <div className="mobile-gallery">
            {imageGrid.map((image, index) => (
              <div 
                key={index}
                className="mobile-gallery-item"
                onClick={() => openLightbox(image)}
              >
                <img 
                  src={image.src} 
                  alt={`SARC Memory ${image.id}`}
                  className="mobile-gallery-image"
                  onError={(e) => {
                    e.target.src = image.fallbackSrc;
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          // Grid layout for desktop
          <div className="image-grid" ref={galleryRef}>
            {imageGrid.map((image, index) => (
              <motion.div
                key={image.id}
                className="gallery-item"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -5, boxShadow: "0 20px 25px rgba(0, 0, 0, 0.2)" }}
                onClick={() => openLightbox(image)}
              >
                <div className="gallery-item-inner">
                  <img 
                    src={image.src} 
                    alt={`SARC Memory ${image.id}`}
                    className="gallery-image"
                    onLoad={() => handleImageLoad(index)}
                    onError={(e) => {
                      e.target.src = image.fallbackSrc;
                      handleImageError(index);
                    }}
                  />
                  <div className="image-overlay">
                    <span className="view-button">View</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <div className="lightbox" onClick={closeLightbox}>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <button className="lightbox-close" onClick={closeLightbox}>×</button>
              <img 
                src={selectedImage.src} 
                alt={`SARC Memory ${selectedImage.id}`} 
                className="lightbox-image"
                onError={(e) => {
                  e.target.src = selectedImage.fallbackSrc;
                }}
              />
            </div>
          </div>
=======
const images = [
  image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, 
  image11, image12, image13, image14, image15, image16, image17, image18, image19, image20, 
  image21, image22, image23, image24, image25, image26, image27, image28, image29, image30,
  image31, image32, image33, image34, image35
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Transform the scrollYProgress to move the ball down the line
  const ballY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const handleImageClick = (image, index) => {
    setSelectedImage({ url: image, index });
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="bg-black min-h-screen text-white" ref={containerRef}>
      {/* Sidebar with scrolling ball */}
      <div className="fixed left-4 md:left-8 top-1/2 transform -translate-y-1/2 h-1/2 w-1 bg-gray-700 rounded-full hidden md:block z-10">
        <motion.div 
          className="w-3 h-3 bg-orange-500 rounded-full -ml-1"
          style={{ y: ballY }}
        />
      </div>
      
      {/* Header Section with Gradient */}
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
            Gallery
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore moments captured during our events, showcasing the vibrant connection 
            between students and alumni at IIT Bombay.
          </motion.p>
        </div>
      </div>

      {/* Main Gallery Content */}
      <div className="relative px-4 md:px-8 lg:px-16 pb-24">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
          {/* Left Side Section (No Scroll) */}
          <div
            className="w-full lg:w-[10%] border-b-2 lg:border-b-0 lg:border-r-2 border-gray-700 mb-4 lg:mb-0"
            style={{ height: "auto" }}
          ></div>

          {/* Main Gallery Section (Responsive Grid) */}
          <div className="w-full lg:w-[75%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
            {images.map((img, i) => (
              <motion.div
                key={i}
                className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.03 }}
                onClick={() => handleImageClick(img, i)}
              >
                <div className={`bg-gradient-to-r ${getGradientColor(i)} h-full rounded-xl p-1`}>
                  <img
                    src={img}
                    alt={`Gallery ${i + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Side Fixed Image */}
          <motion.div 
            className="absolute top-4 right-4 w-29 h-29 md:w-24 md:h-24 lg:w-52 lg:h-52 hidden md:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <img 
              src={sidephoto}
              alt="Side Image"
              className="w-full h-full object-cover rounded-xl shadow-lg"
            />
          </motion.div>
        </div>
      </div>

      {/* Modal for Image Preview */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="max-w-4xl w-full rounded-2xl overflow-hidden bg-gradient-to-r from-orange-500/20 to-blue-500/20 p-1"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative bg-black/80 rounded-xl p-2">
                <button 
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <img
                  src={selectedImage.url}
                  alt={`Gallery ${selectedImage.index + 1}`}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                />
                <div className="text-center py-4">
                  <p className="text-white/90 text-sm">Image {selectedImage.index + 1} of {images.length}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
>>>>>>> c237bd9c6d71425d0cff972ecae9a59b3728446c
        )}
      </AnimatePresence>
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
    "from-violet-500 to-purple-500",
    "from-amber-500 to-yellow-500",
    "from-teal-500 to-cyan-500",
    "from-pink-500 to-rose-500",
    "from-blue-500 to-indigo-500",
    "from-green-500 to-emerald-500",
    "from-red-500 to-orange-500",
    "from-purple-500 to-violet-500",
    "from-yellow-500 to-amber-500",
    "from-cyan-500 to-teal-500",
  ];
  
  return gradients[index % gradients.length];
};

export default Gallery;