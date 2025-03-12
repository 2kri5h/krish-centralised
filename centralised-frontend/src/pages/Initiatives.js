import { useState } from "react";
import headerImage from "../assets/header.png"; // Replace with actual path
import initiativeImage from "../assets/initiative.png"; // Replace with actual path
const initiativesData = [
  { id: 1, name: "Initiative 1", description: "Description for Initiative 1", details: "Detailed info about Initiative 1." },
  { id: 2, name: "Initiative 2", description: "Description for Initiative 2", details: "Detailed info about Initiative 2." },
  { id: 3, name: "Initiative 3", description: "Description for Initiative 3", details: "Detailed info about Initiative 3." },
  { id: 4, name: "Initiative 4", description: "Description for Initiative 4", details: "Detailed info about Initiative 4." },
];
const Initiative = () => {
  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center py-10 px-4">
      {/* Header */}
      <img src={headerImage} alt="Initiatives from SARC" className="w-3/4 mb-10" />

      {/* Initiative List */}
      <div className="w-full max-w-5xl space-y-6">
        {initiativesData.map((initiative) => (
          <div
            key={initiative.id}
            className="bg-orange-500 p-6 rounded-2xl flex flex-col md:flex-row items-center transition-all duration-300 hover:shadow-lg hover:shadow-black"
          >
            <div className="flex-1 text-left text-black p-4">
              <h2 className="text-xl font-bold">{initiative.name}</h2>
              <div className="bg-yellow-100 p-4 rounded-md mt-2 border border-black transition-all duration-300 hover:shadow-lg hover:shadow-black">
                <p className="text-sm">{initiative.description}</p>
              </div>
              <button
                className="bg-yellow-100 mt-4 px-4 py-2 rounded-md border border-black text-black transition-all duration-300 hover:shadow-lg hover:shadow-black"
              >
                More Details
              </button>
            </div>
            <img
              src={initiativeImage}
              alt="Initiative"
              className="w-full md:w-1/2 h-40 md:h-48 rounded-md border border-black transition-all duration-300 hover:shadow-lg hover:shadow-black mt-4 md:mt-0"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Initiative;