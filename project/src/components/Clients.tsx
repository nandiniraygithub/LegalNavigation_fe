import React from 'react';
import { Building2, Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Johnson",
    company: "Tech Innovations Inc.",
    role: "CEO",
    content: "Legal Navigation has been instrumental in protecting our intellectual property rights. Their expertise in tech law is unmatched.",
    rating: 5
  },
  {
    name: "Michael Chen",
    company: "Global Ventures Ltd.",
    role: "Managing Director",
    content: "Outstanding corporate law services. Their team's attention to detail and strategic approach has helped us navigate complex mergers successfully.",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    company: "StartUp Solutions",
    role: "Founder",
    content: "As a startup founder, having Legal Navigation's guidance has been invaluable. They understand the unique challenges faced by growing businesses.",
    rating: 5
  }
];

const Clients = () => {
  return (
    <section id="clients" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Client Success Stories</h2>
          <p className="mt-4 text-xl text-gray-600">Trusted by leading businesses and entrepreneurs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="mr-4">
                  <Building2 className="h-12 w-12 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.role}</p>
                  <p className="text-sm text-primary">{testimonial.company}</p>
                </div>
              </div>

              <div className="mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="inline-block h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>

              <blockquote className="text-gray-600 italic">
                "{testimonial.content}"
              </blockquote>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-primary/5 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Ready to Work Together?</h3>
          <p className="text-gray-600 mb-6">
            Join our growing list of satisfied clients and experience exceptional legal services.
          </p>
          <a
            href="#contact"
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200"
          >
            Contact Us Today
          </a>
        </div>
      </div>
    </section>
  );
};

export default Clients;