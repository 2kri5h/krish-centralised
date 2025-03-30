// import React from "react";
// import sidephoto from "../assets/gallery/sidegallery.png";
// import image1 from "../assets/gallery/gallery/1.jpg";
// import image2 from "../assets/gallery/gallery/2.JPG";
// import image3 from "../assets/gallery/gallery/3.JPG";
// import image4 from "../assets/gallery/gallery/4.png";
// import image5 from "../assets/gallery/gallery/5.JPG";
// import image6 from "../assets/gallery/gallery/6.JPG";
// import image7 from "../assets/gallery/gallery/7.JPG";
// import image8 from "../assets/gallery/gallery/8.JPG";
// import image9 from "../assets/gallery/gallery/9.JPG";
// import image10 from "../assets/gallery/gallery/10.png";
// import image11 from "../assets/gallery/gallery/11.png";
// import image12 from "../assets/gallery/gallery/12.png";
// import image13 from "../assets/gallery/gallery/13.png";
// import image14 from "../assets/gallery/gallery/14.png";
// import image15 from "../assets/gallery/gallery/15.png";
// import image16 from "../assets/gallery/gallery/16.png";
// import image17 from "../assets/gallery/gallery/17.png";
// import image18 from "../assets/gallery/gallery/18.png";
// import image19 from "../assets/gallery/gallery/19.png";
// import image20 from "../assets/gallery/gallery/20.png";
// import image21 from "../assets/gallery/gallery/21.jpeg";
// import image22 from "../assets/gallery/gallery/22.jpeg";
// import image23 from "../assets/gallery/gallery/23.jpeg";
// import image24 from "../assets/gallery/gallery/24.JPG";
// import image25 from "../assets/gallery/gallery/25.JPG";
// import image26 from "../assets/gallery/gallery/26.JPG";
// import image27 from "../assets/gallery/gallery/27.JPG";
// import image28 from "../assets/gallery/gallery/28.JPG";
// import image29 from "../assets/gallery/gallery/29.JPG";
// import image30 from "../assets/gallery/gallery/30.JPG";
// import image31 from "../assets/gallery/gallery/31.png";
// import image32 from "../assets/gallery/gallery/32.JPG";
// import image33 from "../assets/gallery/gallery/33.png";
// import image34 from "../assets/gallery/gallery/34.JPG";
// import image35 from "../assets/gallery/gallery/35.jpeg";

// const images = [
//   image1, image2, image3,image4, image5, image6, image7, image8, image9, image10, image11, image12, image13, image14, image15, image16, image17, image18, image19, image20, image21, image22, image23, image24, image25, image26, image27, image28, image29, image30,image31, image32,image33, image34, image35
// ];

// const Gallery = () => {
//   return (
//     <div className="bg-black min-h-screen text-white flex flex-col lg:flex-row">
//       {/* Left Side Section (No Scroll) */}
//       <div
//         className="w-full lg:w-[10%] border-b-2 lg:border-b-0 lg:border-r-2 border-gray-700 mb-4 lg:mb-0"
//         style={{ height: "auto" }}
//       ></div>

//       {/* Main Gallery Section (Responsive Grid) */}
//       <div className="w-full lg:w-[75%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
//         {images.map((img, i) => (
//           <div
//             key={i}
//             className="overflow-hidden rounded-xl transition-transform duration-300 cursor-pointer hover:scale-105"
//           >
//             <img
//               src={img}
//               alt={`Gallery ${i + 1}`}
//               className="w-full h-full object-cover"
//             />
//           </div>
//         ))}
//       </div>

//      {/* Right Side Fixed Image */}
//      <div 
//         className="absolute top-4 right-4 w-29 h-29 md:w-24 md:h-24 lg:w-52 lg:h-52 hidden md:block"
//       >
//         <img 
//           src={sidephoto}
//           alt="Side Image"
//           className="w-full h-full object-cover rounded-xl"
//         />
//       </div>
//     </div>
//   );
// };

// export default Gallery;



import React from "react";
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

const images = [
  image1, image2, image3,image4, image5, image6, image7, image8, image9, image10, image11, image12, image13, image14, image15, image16, image17, image18, image19, image20, image21, image22, image23, image24, image25, image26, image27, image28, image29, image30,image31, image32,image33, image34, image35
];

const Gallery = () => {
  return (
    <div className="bg-black min-h-screen text-white flex flex-col lg:flex-row">
      {/* Left Side Section (No Scroll) */}
      <div
        className="w-full lg:w-[10%] border-b-2 lg:border-b-0 lg:border-r-2 border-gray-700 mb-4 lg:mb-0"
        style={{ height: "auto" }}
      ></div>

      {/* Main Gallery Section (Responsive Grid) */}
      <div className="w-full lg:w-[75%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {Array.from({ length: 35 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-xl transition-transform duration-300 cursor-pointer hover:scale-105"
          >
            <img
              src={`https://centralised.sarc-iitb.org/static/images/gallery/${i + 1}.jpg`}
              alt={`Gallery ${i + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Try different extensions if the first one fails
                if (e.target.src.endsWith('.jpg')) {
                  e.target.src = `https://centralised.sarc-iitb.org/static/images/gallery/${i + 1}.JPG`;
                } else if (e.target.src.endsWith('.JPG')) {
                  e.target.src = `https://centralised.sarc-iitb.org/static/images/gallery/${i + 1}.png`;
                } else if (e.target.src.endsWith('.png')) {
                  e.target.src = `https://centralised.sarc-iitb.org/static/images/gallery/${i + 1}.jpeg`;
                } else {
                  // If all formats fail, show a placeholder
                  e.target.src = 'https://centralised.sarc-iitb.org/static/images/placeholder.jpg';
                }
              }}
            />
          </div>
        ))}
      </div>

     {/* Right Side Fixed Image */}
     <div 
        className="absolute top-4 right-4 w-29 h-29 md:w-24 md:h-24 lg:w-52 lg:h-52 hidden md:block"
      >
        <img 
          src={sidephoto}
          alt="Side Image"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
    </div>
  );
};

export default Gallery;