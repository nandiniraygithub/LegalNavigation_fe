/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { X } from 'lucide-react';

// Define the props type for the ContactForm component
interface ContactFormProps {
  onClose: () => void;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function Contact() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [resultMsg, setResultMsg] = useState('');
  const [resultColor, setResultColor] = useState('text-gray-500');

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
        <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>

        <div className="flex justify-center">
          <button
            onClick={() => setShowContactForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Open Contact Form
          </button>
        </div>

        {/* Contact Form Modal */}
        {showContactForm && (
          <ContactForm
            onClose={() => setShowContactForm(false)} // Pass onClose as a prop
          />
        )}
      </div>
    </div>
  );
}

// Define ContactForm as a functional React component
function ContactForm({ onClose }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [resultMsg, setResultMsg] = useState('');
  const [resultColor, setResultColor] = useState('text-gray-500');

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
        setTimeout(() => onClose(), 3000); // Close the form after submission
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
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Contact Information</h2>
          <button
            onClick={onClose} // Close the modal using the onClose function
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-semibold">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-semibold">
              Message
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows={4}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </form>

        {resultMsg && (
          <p className={`mt-4 text-center text-sm ${resultColor}`}>
            {resultMsg}
          </p>
        )}
      </div>
    </div>
  );
}
