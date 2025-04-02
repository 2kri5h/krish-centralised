import React, { useState, useEffect, useRef } from "react";
import sidephoto from "../assets/gallery/sidegallery.png";
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
import { motion, AnimatePresence } from "framer-motion";
import "./Gallery.css";

const images = [
  image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, 
  image11, image12, image13, image14, image15, image16, image17, image18, image19, image20, 
  image21, image22, image23, image24, image25, image26, image27, image28, image29, image30,
  image31, image32, image33, image34, image35
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const galleryRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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

  // Organize images for masonry layout
  const createImageColumns = () => {
    const columns = [[], [], []];
    let colIndex = 0;
    
    images.forEach((img, index) => {
      // Add image to current column
      columns[colIndex].push({
        id: index,
        src: img,
        aspectRatio: index % 5 === 0 ? 'tall' : index % 4 === 0 ? 'wide' : 'standard',
        delay: colIndex * 0.1 + (columns[colIndex].length * 0.1)
      });
      
      // Move to next column
      colIndex = (colIndex + 1) % columns.length;
    });
    
    return columns;
  };

  const imageColumns = createImageColumns();

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="gallery-page">
      {/* Header section with title and description */}
      <div className="gallery-header">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Memories
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Moments we've captured along our journey
        </motion.p>
      </div>

      {/* Masonry gallery layout */}
      <div className="masonry-gallery" ref={galleryRef}>
        {imageColumns.map((column, colIndex) => (
          <div className="masonry-column" key={`column-${colIndex}`}>
            {column.map((image) => (
              <motion.div
                key={image.id}
                className={`gallery-card ${image.aspectRatio}`}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { 
                  opacity: 1, 
                  y: 0
                } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: image.delay,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 20px 25px rgba(0, 0, 0, 0.2)"
                }}
                onClick={() => openLightbox(image)}
              >
                <div className="card-image-container">
                  <img 
                    src={image.src} 
                    alt={`SARC Memory ${image.id}`} 
                    className="gallery-image"
                    loading="lazy"
                  />
                  <div className="image-overlay">
                    <span className="view-button">View</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      {/* Lightbox for enlarged image view */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div 
              className="lightbox-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="lightbox-close"
                onClick={closeLightbox}
                aria-label="Close"
              >
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path 
                    d="M6 18L18 6M6 6l12 12" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                  />
                </svg>
              </button>
              <img 
                src={selectedImage.src} 
                alt={`SARC Memory ${selectedImage.id}`} 
                className="lightbox-image"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;