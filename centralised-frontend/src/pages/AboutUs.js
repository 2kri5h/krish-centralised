import React from "react";
import AlumniGrid from "./Alum"

const SARCPage = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center py-12 px-6">
      <div className="bg-[#FDF5C9] w-full max-w-6xl border border-black rounded-lg p-6 shadow-lg">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-blue-700 mb-6 text-left w-full">
          About SARC
        </h2>

        <div className="flex flex-col gap-6 w-full">
          {/* First Content Box - "WHAT is SARC" */}
          <div className="bg-white border border-black rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center">
            <div className="md:w-1/4 text-left">
              <p className="text-3xl italic">WHAT is</p>
              <p className="text-6xl font-bold text-blue-700 mt-2">SARC</p>
            </div>
            <p className="md:w-3/4 text-gray-800 mt-4 md:mt-0 md:ml-6 text-sm md:text-base">
              A student-run organization at IIT Bombay, SARC (Student Alumni Relations Cell) connects 65,000+ alumni and 12,000+ students, fostering lifelong bonds through 50+ events across various domains every year. Since its inception in 2008, SARC has been dedicated to strengthening student-alumni relations by providing mentorship, networking, and collaborative opportunities. Working closely with the Dean ACR Office, IITB Alumni Association, and various department and hostel councils, SARC bridges the gap between students, alumni, and the institute, ensuring a thriving and engaged IIT Bombay community.
            </p>
          </div>

          {/* Second Content Box - "Our VISION" */}
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

      {/* Stats Section */}
      <div className="bg-[#6DA9E4] w-full max-w-6xl rounded-lg p-6 shadow-lg mt-10 mb-10">
        <h3 className="text-lg font-semibold text-white mb-4">Stats / Highlights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side - Stats Boxes */}
          <div className="flex flex-col gap-4">
            <div className="bg-[#F5F0D7] border border-black rounded-lg p-6 flex flex-col items-center h-[150px] md:h-[180px]">
              <p className="text-2xl italic font-semibold">14,000+</p>
              <p className="text-lg text-gray-700">students</p>
            </div>
            <div className="bg-[#F5F0D7] border border-black rounded-lg p-6 flex flex-col items-center h-[150px] md:h-[180px]">
              <p className="text-2xl italic font-semibold">50+</p>
              <p className="text-lg text-gray-700">events</p>
            </div>
          </div>

          {/* Right Side - Alumni Image & Stats */}
          <div className="bg-[#F5F0D7] border border-black rounded-lg p-6 flex flex-col items-center justify-center row-span-2">
            <img src="/image 10.png" alt="Alumni Illustration" className="w-24 md:w-28 mb-2" />
            <p className="text-2xl italic font-semibold">70,000+</p>
            <p className="text-lg text-gray-700">alumni</p>
          </div>
        </div>
      </div>
      <AlumniGrid />
    </div>
  );
};

export default SARCPage;