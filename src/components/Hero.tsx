/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { X } from 'lucide-react';
import logo from '../assets/logo3.png';

type HeroProps = {
  setShowContactForm: (show: boolean) => void;
};

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const Hero: React.FC<HeroProps> = ({ setShowContactForm }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [resultMsg, setResultMsg] = useState('');
  const [resultColor, setResultColor] = useState('text-gray-500');
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formPayload = {
      access_key: '5ea7a290-2c81-4528-8152-90d734ee0f87',
      subject: 'New Submission from your Website',
      botcheck: '',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    };

    setResultMsg('Please wait...');
    setResultColor('text-gray-500');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formPayload),
      });

      const json = await res.json();

      if (res.status === 200) {
        setResultMsg(json.message);
        setResultColor('text-green-500');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setShowModal(false), 3000); // Close modal after successful submission
      } else {
        setResultMsg(json.message || 'Something went wrong!');
        setResultColor('text-red-500');
      }
    } catch (error) {
      console.error(error);
      setResultMsg('Something went wrong!');
      setResultColor('text-red-500');
    }
  };

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
              className="w-40 sm:w-52 md:w-64"
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
            <button
              onClick={() => setShowModal(true)} // Opens the contact form modal
              className="inline-block px-8 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-800 rounded-lg transition-colors duration-200"
            >
              Contact Us
            </button>
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
              "Navigating legal challenges with confidence and expertise.",
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

      {/* Contact Form Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Contact Information</h2>
              <button
                onClick={() => setShowModal(false)} // Closes the modal
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Send Message
              </button>
            </form>
            {resultMsg && (
              <p className={`mt-4 text-center text-sm ${resultColor}`}>
                {resultMsg}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
