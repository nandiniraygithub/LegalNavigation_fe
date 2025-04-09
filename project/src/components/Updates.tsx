import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

const updates = [
  {
    date: "March 15, 2024",
    title: "Understanding Intellectual Property Rights in the Digital Age",
    excerpt: "A comprehensive guide to protecting your digital assets through patents, trademarks, and copyrights.",
    category: "Intellectual Property"
  },
  {
    date: "March 10, 2024",
    title: "Recent Changes in Corporate Compliance Laws",
    excerpt: "Key updates to corporate compliance regulations and their impact on businesses in 2024.",
    category: "Corporate Law"
  },
  {
    date: "March 5, 2024",
    title: "Family Law: Navigating Modern Relationships",
    excerpt: "Understanding the evolving landscape of family law in contemporary society.",
    category: "Family Law"
  }
];

const Updates = () => {
  return (
    <section id="updates" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Legal Updates & Insights</h2>
          <p className="mt-4 text-xl text-gray-600">Stay informed with our latest legal news and analysis</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {updates.map((post, index) => (
            <article
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{post.date}</span>
                </div>
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 text-sm font-semibold text-primary bg-primary/10 rounded-full">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center text-primary hover:text-primary-dark transition-colors duration-200"
                >
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-white rounded-lg transition-colors duration-200"
          >
            View All Updates
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Updates;