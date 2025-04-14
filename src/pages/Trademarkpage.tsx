import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function Trademark() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [resultMsg, setResultMsg] = useState('');
  const [resultColor, setResultColor] = useState('text-gray-500');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowContactForm(true);
  };

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
        setTimeout(() => setShowContactForm(false), 3000);
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Trademark Search</h1>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a trademark..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <Search className="h-5 w-5" />
              Search
            </button>
          </div>
        </form>

        {/* Contact Form Modal */}
        {showContactForm && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md relative shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Contact Information</h2>
                <button
                  onClick={() => setShowContactForm(false)}
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
    </div>
  );
}
