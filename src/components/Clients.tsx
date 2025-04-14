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

const Clients = () => {
  return (
    <section id="clients" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">Our Clients</h2>
          <p className="text-lg text-blue-500"> </p>
        </div>

        {/* Client Logos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
          {testimonials.map((client, index) => (
            <div
              key={index}
              className="w-full h-40 flex justify-center items-center p-6 bg-blue-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              title={client.company}
            >
              <img
                src={client.image}
                alt={`${client.company} logo`}
                className="h-full w-full max-w-[150px] object-contain rounded-md"
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 bg-blue-100 rounded-2xl p-10 text-center">
          <h3 className="text-2xl font-semibold text-blue-800 mb-4">Ready to Work Together?</h3>
          <p className="text-blue-600 mb-6 max-w-2xl mx-auto">
            Join our growing list of satisfied clients and experience exceptional legal services tailored to your needs.
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-800 transition-colors duration-300"
          >
            Contact Us Today
          </a>
        </div>
      </div>
    </section>
  );
};

export default Clients;
