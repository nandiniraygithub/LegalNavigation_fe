import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from '../assets/logo3.png';
import { ChevronDown, Menu, X } from "lucide-react";

interface PracticeArea {
  title: string;
  href?: string;
}

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Blog", to: "/post-blog" },
  { label: "Contact", to: "/contact" },
];

const practiceAreas: PracticeArea[] = [
  { title: "Trademark", href: "/practice/Trademark" },
  { title: "Corporate Law" },
  { title: "Civil Litigation" },
  { title: "Criminal Defense" },
  { title: "Family Law" },
  { title: "Intellectual Property" },
  { title: "Tax Law" },
];

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const location = useLocation();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Simple function to close mobile menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <nav style={{ backgroundColor: '#024ea1' }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-15 w-24 mr-2" />
            <span className="text-xl font-bold">Legal Navigation</span>
          </Link>

          {/* Hamburger Menu */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white focus:outline-none">
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="hover:text-blue-300 transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="flex items-center space-x-1 hover:text-blue-300"
              >
                <span>Practice Areas</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50">
                  {practiceAreas.map((area) => (
                    <div key={area.title}>
                      {area.href ? (
                        <Link
                          to={area.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          {area.title}
                        </Link>
                      ) : (
                        <span className="block px-4 py-2 text-sm text-gray-700 opacity-50 cursor-not-allowed">
                          {area.title}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 pb-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="block px-2 py-1 text-white hover:text-blue-300"
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile Practice Areas - Direct Links */}
            <div className="px-2">
              <div className="text-white hover:text-blue-300 mb-2">Practice Areas</div>
              <div className="pl-4 space-y-2">
                {practiceAreas.map((area) => (
                  <div key={area.title}>
                    {area.href ? (
                      <Link
                        to={area.href}
                        className="block text-white hover:text-blue-300"
                        onClick={closeMobileMenu}
                      >
                        {area.title}
                      </Link>
                    ) : (
                      <span className="block text-white opacity-50 cursor-not-allowed">
                        {area.title}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}