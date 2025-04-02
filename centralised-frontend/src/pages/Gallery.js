import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Gallery.css";
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
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;