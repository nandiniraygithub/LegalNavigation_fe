import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Scale } from 'lucide-react';

interface PracticeArea {
  title: string;
  href?: string;
}

const navItems = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Updates', href: '#updates' },
  { label: 'Contact', href: '#Footer' },
];

const practiceAreas: PracticeArea[] = [
  { title: 'Trademark', href: '/practice/Trademark' },
  { title: 'Corporate Law' },
  { title: 'Civil Litigation' },
  { title: 'Criminal Defense' },
  { title: 'Family Law' },
  { title: 'Intellectual Property' },
  { title: 'Tax Law' }
];

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation(); // 👈 Get current route

  return (
    <nav className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Scale className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">Legal Excellence</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-white hover:text-blue-400 transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
            
            <div className="relative">
              <button
                className="flex items-center space-x-1 hover:text-blue-400"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>Practice Areas</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50">
                  {practiceAreas.map((area) => (
                    <Link
                      key={area.title}
                      to={area.href ? area.href : location.pathname} // ✅ Use current path if href is missing
                      className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                        !area.href ? 'cursor-not-allowed opacity-50' : ''
                      }`}
                      onClick={(e) => {
                        if (!area.href) e.preventDefault(); // Prevent nav for disabled items
                      }}
                    >
                      {area.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
