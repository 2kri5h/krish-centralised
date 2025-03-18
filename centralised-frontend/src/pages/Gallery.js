import React from "react";
import eventIcon from "../assets/event.png"; // Event icon
import image1 from "../assets/gallery/image1.JPG";
import image2 from "../assets/gallery/image2.JPG";
import image3 from "../assets/gallery/image2.JPG";
import image4 from "../assets/gallery/image2.JPG";
import image5 from "../assets/gallery/image2.JPG";
import image6 from "../assets/gallery/image2.JPG";
import image7 from "../assets/gallery/image2.JPG";
import image8 from "../assets/gallery/image2.JPG";
import image9 from "../assets/gallery/image2.JPG";
import image10 from "../assets/gallery/image2.JPG";
import image11 from "../assets/gallery/image2.JPG";
import image12 from "../assets/gallery/image2.JPG";
import image13 from "../assets/gallery/image2.JPG";
import image14 from "../assets/gallery/image14.JPG";
import image15 from "../assets/gallery/image15.JPG";
import image16 from "../assets/gallery/image16.JPG";
import image17 from "../assets/gallery/image17.JPG";
import image18 from "../assets/gallery/image18.JPG";
import image19 from "../assets/gallery/image19.JPG";
import image20 from "../assets/gallery/image20.JPG";
import image21 from "../assets/gallery/image21.JPG";
import image22 from "../assets/gallery/image22.JPG";
import image23 from "../assets/gallery/image23.JPG";

const images = [
  image1, image2, image3, image4, image5, image6, 
  image7, image8, image9, image10, image11, image12, 
  image13, image14, image15, image16, image17, image18, 
  image19, image20, image21, image22, image23
];

const events = [
  { year: 2024, name: "Alumination", month: "January", images: [image1, image2] },
  { year: 2024, name: "Event", month: "March", images: [image1, image2] },
  { year: 2024, name: "Event", month: "August", images: [image1, image2] },
];

const Gallery = () => {
  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff', display: 'flex', flexDirection: 'row', position: 'relative' }}>
      {/* Timeline Section */}
      <div style={{ position: 'relative', width: '25%', borderRight: '4px solid #FFA500', padding: '16px' }}>
        {events.map((event, index) => (
          <div key={index} style={{ position: 'relative', display: 'flex', alignItems: 'center', margin: '20px 0' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: '#FFA500', borderRadius: '50%', position: 'absolute', left: '-10px' }}></div>
            <div style={{ marginLeft: '24px' }}>
              <p style={{ color: '#FFA500', fontWeight: 'bold' }}>{event.name}</p>
              <p>{event.month} {event.year}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Gallery Grid Section */}
      <div style={{ width: '75%', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', padding: '16px' }}>
        {images.map((image, index) => (
          <div key={index} style={{ overflow: 'hidden', transition: 'all 0.3s', cursor: 'pointer' }} 
               onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)'}
               onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
            <img 
              src={image} 
              alt={`Gallery ${index + 1}`} 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                borderRadius: index % 2 === 0 ? '16px' : '0' // Even index rounded, odd index square
              }} 
            />
          </div>
        ))}
      </div>

      {/* Fixed Top Right Image */}
      <div style={{ position: 'absolute', top: '16px', right: '16px', width: '100px', height: '100px', overflow: 'hidden', borderRadius: '16px' }}>
        <img 
          src={image1} // Replace with the desired fixed image
          alt="Fixed Image"
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} 
        />
      </div>
    </div>
  );
};

export default Gallery;
