/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, BookOpen, Gavel, Users, Shield } from 'lucide-react';

const practiceAreas = [
  {
    title: 'Trademark',
    description: 'Protection and registration of intellectual property rights',
    href: '/practice/Trademark',
    available: true,
    icon: Scale,
  },
  {
    title: 'Corporate Law',
    description: 'Business formation, contracts, and compliance',
    available: false,
    icon: BookOpen,
  },
  {
    title: 'Civil Litigation',
    description: 'Resolution of disputes between parties',
    available: false,
    icon: Gavel,
  },
  {
    title: 'Criminal Defense',
    description: 'Representation in criminal proceedings',
    available: false,
    icon: Shield,
  },
  {
    title: 'Family Law',
    description: 'Divorce, custody, and domestic relations',
    available: false,
    icon: Users,
  },
  {
    title: 'Intellectual Property',
    description: 'Patents, copyrights, and trade secrets',
    available: false,
    icon: Scale,
  },
  {
    title: 'Tax Law',
    description: 'Tax planning and dispute resolution',
    available: false,
    icon: BookOpen,
  },
];


function PracticeAreas() {
  return (
    <section id="practice-areas" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Practice Areas</h2>
          <p className="mt-4 text-xl text-gray-600">Comprehensive legal expertise for your business needs</p>
        </div>
        
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {practiceAreas.map((area, index) => {
            const IconComponent = area.icon;
            return (
              <div
                key={index}
                className="relative group bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 blur"></div>
                <div className="relative bg-white p-6 rounded-xl">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{area.title}</h3>
                  <p className="text-gray-600">{area.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default PracticeAreas;