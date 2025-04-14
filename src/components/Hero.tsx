import React from 'react';
import logo from '../assets/logo3.png';

const Hero = () => {
  return (
    <div className="relative bg-gray-50 pt-16">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1920"
          alt="Law office"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 to-gray-900/50" />
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pb-32">
        <div className="text-center">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img
              src={logo}
              alt="Logo"
              className="w-40 sm:w-52 md:w-64" // Adjust size for different screens
            />
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-blue-800 mb-4">
            Welcome to Legal Navigation
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-blue-700 mb-10 max-w-3xl mx-auto">
            Advocates and IP Attorneys
          </p>

          {/* CTA Buttons */}
          <div className="space-y-4 md:space-y-0 md:flex md:justify-center md:space-x-4">
  <a
    href="https://wa.me/918587026433"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block px-8 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-800 rounded-lg transition-colors duration-200"
  >
    Contact Us
  </a>
            <a
              href="#practice-areas"
              className="inline-block px-8 py-3 text-base font-medium bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
            >
              Our Services
            </a>
          </div>

          {/* Quotes */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              "We respect your human rights and ensure that others don't take them for granted!",
              "Justice is not a privilege; it's a right.",
              "Navigating legal challenges with confidence and expertise."
            ].map((quote, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md"
              >
                <p className="text-gray-800 font-medium italic">"{quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
