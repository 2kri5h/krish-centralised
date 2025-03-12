import React from "react";
import eventIcon from "../assets/event.png"; // Event icon
import image1 from "../assets/gallery/image1.JPG";
import image2 from "../assets/gallery/image2.JPG";
import image12 from "../assets/gallery/image12.JPG";
import image13 from "../assets/gallery/image13.JPG";
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
  image1, image2, image12, image13, image14, image15, image16, 
  image17, image18, image19, image20, image21, image22, image23
];

const events = [
  { year: 2024, name: "Alumination", month: "January", images: [image1, image2, image12] },
  { year: 2024, name: "Event", month: "March", images: [image13, image14, image15] },
  { year: 2024, name: "Event", month: "August", images: [image16, image17, image18, image19, image20, image21, image22, image23] },
];
const Gallery = () => {
  return (
    <div className="bg-black min-h-screen text-white flex flex-col md:flex-row px-6 py-10">
      
      {/* Timeline Section */}
      <div className="relative md:w-1/5 flex flex-col items-center md:items-start">
        
        {/* Orange Timeline Line - Properly Aligned */}
        <div className="absolute left-6 md:left-10 w-1 bg-orange-500 h-full"></div>

        {/* Events */}
        {events.map((event, index) => (
          <div key={index} className="relative flex flex-col md:flex-row items-center md:items-start space-y-2 my-10 w-full">
            
            {/* Timeline Dot */}
            <div className="w-4 h-4 bg-orange-500 rounded-full absolute left-[16px] md:left-[28px]"></div>

            {/* Event Info - Mobile and Desktop Adjusted */}
            <div className="text-center md:text-left ml-8 md:ml-12 w-full md:w-auto">
              <p className="text-orange-400 font-bold text-xl">{event.name}</p>
              <p className="text-md">{event.month}</p>
              <p className="text-gray-400 text-sm">{event.year}</p>
            </div>

            {/* Mobile Only - Images in Front */}
            <div className="block md:hidden w-full">
              <div className="grid grid-cols-2 gap-4 mt-4">
                {event.images.map((image, imgIndex) => (
                  <div key={imgIndex} className={`overflow-hidden transition-all ${imgIndex % 2 === 0 ? 'rounded-full' : 'rounded-xl'}`}>
                    <img src={image} alt={`Gallery ${imgIndex + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Gallery Grid (Aligned with Event Name) - Laptop Only */}
      <div className="md:w-4/5 flex flex-col gap-12 hidden md:flex">
        {events.map((event, eventIndex) => (
          <div key={eventIndex} className="flex flex-col items-center md:items-start">
            
            {/* Align Images with Event Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 ml-8">
              {event.images.map((image, imgIndex) => (
                <div 
                  key={imgIndex} 
                  className={`overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-black 
                    ${imgIndex % 2 === 0 ? 'rounded-full w-48 h-48' : 'rounded-xl w-56 h-56'}`} // Circular for even, square for odd
                >
                  <img 
                    src={image} 
                    alt={`Gallery ${imgIndex + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Gallery;
