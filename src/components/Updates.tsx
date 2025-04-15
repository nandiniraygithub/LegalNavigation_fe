import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const updates = [
  {
    date: "April 10, 2025",
    title: "Foreign Subsidiary Company Compliances",
    excerpt: "A company in India is considered a Foreign Subsidiary if a foreign company controls over 50% of its voting power, as per Section 2(87) of the Companies Act, 2013.",
    category: "Corporate Law"
  },
  {
    date: "April 7, 2025",
    title: "Trademark Registration Form TM-A",
    excerpt: "Under Section 2(1)(zb) of the Trademark Act, 1999, trademarks must be graphically representable and able to distinguish goods or services—like McDonald’s iconic yellow 'M'.",
    category: "Intellectual Property"
  },
  {
    date: "April 5, 2025",
    title: "Is Guarantor Liable if Borrower Dies?",
    excerpt: "Even if the borrower dies or is discharged through insolvency, the guarantor remains liable, as ruled by the Supreme Court in Lalit Kumar Jain v. Union of India, 2021.",
    category: "Banking Law"
  }
];

const Updates = () => {
  return (
    <section id="updates" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-800 sm:text-4xl">Our Blog</h2>
          <p className="mt-4 text-xl text-blue-600">Explore legal insights and recent developments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {updates.map((post, index) => (
            <article
              key={index}
              className="bg-blue-50 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center text-sm text-blue-500 mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{post.date}</span>
                </div>
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-2">
                  {post.title}
                </h3>
                <p className="text-blue-700 mb-4">
                  {post.excerpt}
                </p>
                <Link
                  to="/post-blog" // Optional: change this to `/post/:id` if dynamic posts exist
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium"
                >
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/post-blog"
            className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-colors duration-200"
          >
            View All Updates
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Updates;
