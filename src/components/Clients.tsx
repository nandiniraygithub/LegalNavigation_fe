import React from 'react';
import klyraLogo from '../assets/clientLogo1.png';
import globalVenturesLogo from '../assets/Clientlogo2.png';

const testimonials = [
  {
    company: "KLYRA",
    image: klyraLogo,
  },
  {
    company: "Global Ventures Ltd.",
    image: globalVenturesLogo,
  },
];

const Clients: React.FC = () => {
  return (
    <section id="clients" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">Our Clients</h2>
        </div>

        {/* Client Logos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
          {testimonials.map((client, index) => (
            <div
              key={index}
              className="w-full h-60 flex justify-center items-center p-8 bg-blue-10 rounded-lg shadow-md hover:shadow-xl transform transition duration-500 hover:scale-110"
              title={client.company}
            >
              <img
                src={client.image}
                alt={`${client.company} logo`}
                className="h-full w-full max-w-[200px] object-contain rounded-md"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Clients;
