import { CheckCircle } from 'lucide-react';

const About = () => {
  const features = [
    'Specialized Expertise in Intellectual Property & Startup Advisory',
    'Diverse Legal Practice Covering Corporate, Criminal, Real Estate, Banking & More',
    'Strategic Legal Navigation for Businesses & Individuals',
    'Experienced, Client-Centered, and Results-Driven Approach',
    'Transparent Communication & Personalized Solutions'
  ];

  return (
    <section id="about" className="py-16 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900 sm:text-4xl mb-4">
            Your Trusted Legal Navigation, Advocates and IP Attorneys
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Description */}
          <div className="prose prose-lg">
            <p className="text-blue-800 mb-6">
              Welcome to Legal Navigation, a dynamic law firm dedicated to providing comprehensive 
              legal solutions for individuals, businesses, and startups. Our team of highly skilled 
              attorneys specializes in a wide range of legal areas, including Intellectual Property 
              Rights (IPR), corporate and commercial law, banking, real estate, civil and criminal 
              law, Prevention of Money Laundering Act (PMLA), property law, family law and business 
              advisory.
            </p>
            <p className="text-blue-800">
              At Legal Navigation, we understand that every legal matter is unique. Whether you need 
              assistance with IP protection, business transactions, personal injury, or family law, 
              we take a personalized approach to ensure the best possible outcome for your case. 
              Our firm is built on the principles of integrity, advocacy, and results, and we pride 
              ourselves on delivering strategic legal counsel tailored to your specific needs.
            </p>
          </div>

          {/* Feature List */}
          <div className="bg-blue-100 rounded-xl p-8 shadow-md">
            <h3 className="text-2xl font-semibold text-blue-900 mb-6">Why Choose Us?</h3>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="ml-3 text-blue-800">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
