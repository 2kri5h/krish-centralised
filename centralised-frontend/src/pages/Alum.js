import React from "react";




  const AlumniGrid = () => {
    const alumniData = [
        { name: "Mr XYZ", title: "CEO, Google", image: "logo192.png" },
        { name: "Ms ABC", title: "CTO, Microsoft", image: "Group 61.png" },
        { name: "Mr XYZ", title: "CEO, Google", image: "logo192.png" },
        { name: "Ms ABC", title: "CTO, Microsoft", image: "Group 61.png" },
        { name: "Mr XYZ", title: "CEO, Google", image: "logo192.png" },
        { name: "Ms ABC", title: "CTO, Microsoft", image: "Group 61.png" },
        { name: "Mr XYZ", title: "CEO, Google", image: "logo192.png" },
        { name: "Ms ABC", title: "CTO, Microsoft", image: "Group 61.png" },
        { name: "Mr XYZ", title: "CEO, Google", image: "logo192.png" },
        { name: "Ms ABC", title: "CTO, Microsoft", image: "Group 61.png" },
        { name: "Mr XYZ", title: "CEO, Google", image: "logo192.png" },
        { name: "Ms ABC", title: "CTO, Microsoft", image: "Group 61.png" },
      ];


      return (
        <div className="bg-blue-700 p-6 rounded-xl w-full max-w-6xl">
          <h2 className="text-white text-2xl font-bold mb-4 text-center">
            Esteemed Alumni
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {alumniData.map((alumni, index) => (
              <div
                key={index}
                className="bg-[#FFFDD0] p-4 rounded-xl shadow-md text-center flex flex-col items-center
                           transition-transform duration-300 hover:scale-110"
              >
                <img
                  src={alumni.image}
                  alt={alumni.name}
                  className="w-40 h-40 rounded-lg object-cover"
                />
                <h3 className="mt-3 font-bold text-lg">{alumni.name}</h3>
                <p className="text-gray-600">{alumni.title}</p>
              </div>
            ))}
          </div>
        </div>
      );
    };

    export default AlumniGrid;
