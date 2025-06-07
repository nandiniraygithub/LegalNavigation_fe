import React from 'react';
import logo from '../assets/image.png';
import {
  FaMapMarkerAlt, FaEnvelope, FaPhoneAlt,
  FaInstagram, FaWhatsapp, FaLinkedin,
  FaFacebook, FaTelegramPlane, FaLink
} from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <div className="bg-[#f5f3f3c5] text-black py-10 px-5 font-poppins">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo Section */}
        <div>
        <img src={logo} alt="Logo" className="w-48 sm:w-64 md:w-72" />

          <p>Your trusted legal companion.</p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Contact Info</h3>
          <p className="flex items-start gap-2">
            <FaMapMarkerAlt className="mt-1" />
            WZ-1566 NANGAL RAYA, NEAR CHAWLA BOOK DEPOT, NEW DELHI – 110046
          </p>
          <p className="flex items-center gap-2 mt-2">
            <FaEnvelope />
            <a href="mailto:legalnavigtaion2024@gmail.com" className="text-blue-600 hover:underline">
              legalnavigtaion2024@gmail.com
            </a>
          </p>
          <p className="flex items-center gap-2 mt-2">
            <FaPhoneAlt />
            <a href="tel:+918587026433" className="text-blue-600 hover:underline">
              +91-8587026433
            </a>
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <FaLink /> Quick Links
          </h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-blue-600">Home</a></li>
            <li><a href="#" className="hover:text-blue-600">About Us</a></li>
            <li><a href="#" className="hover:text-blue-600">Services</a></li>
            <li><a href="#" className="hover:text-blue-600">Contact</a></li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Follow Us</h3>
          <div className="flex flex-col gap-3">
            <a href="https://www.instagram.com/legal_navigation_/" target="_blank" className="flex items-center gap-3 hover:text-pink-600 transition-transform duration-200 hover:translate-x-1">
              <FaInstagram /> Instagram
            </a>
            <a href="https://whatsapp.com/channel/0029Va4NG330rGiTu7rHKF0e" target="_blank" className="flex items-center gap-3 hover:text-green-600 transition-transform duration-200 hover:translate-x-1">
              <FaWhatsapp /> WhatsApp Channel
            </a>
            <a href="https://www.linkedin.com/company/legal-navigation/" target="_blank" className="flex items-center gap-3 hover:text-blue-700 transition-transform duration-200 hover:translate-x-1">
              <FaLinkedin /> LinkedIn
            </a>
            <a href="https://www.facebook.com/legalnavigation" target="_blank" className="flex items-center gap-3 hover:text-blue-600 transition-transform duration-200 hover:translate-x-1">
              <FaFacebook /> Facebook
            </a>
            <a href="https://t.me/legalnewsupdates" target="_blank" className="flex items-center gap-3 hover:text-sky-600 transition-transform duration-200 hover:translate-x-1">
              <FaTelegramPlane /> Telegram
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-10 text-sm border-t pt-4">
        &copy; {new Date().getFullYear()} Legal Navigation. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
