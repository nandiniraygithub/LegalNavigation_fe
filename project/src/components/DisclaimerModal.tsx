import React from 'react';


interface DisclaimerModalProps {
  onAccept: () => void;
}

const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ onAccept }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl mx-auto shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Disclaimer</h2>
        <div className="prose prose-sm">
          <p className="text-gray-700 leading-relaxed">
            The Bar Council of India does not permit advertisement or solicitation by advocates in any form or manner.
            By accessing this website, www.legalnavigation.co.in, you acknowledge and confirm that you are seeking
            information relating to Legal Navigation of your own accord and that there has been no form of solicitation,
            advertisement or inducement by Legal Navigation or its members.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            The content of this website is for informational purposes only and should not be interpreted as soliciting
            or advertisement. No material/information provided on this website should be construed as legal advice.
            Legal Navigation shall not be liable for consequences of any action taken by relying on the
            material/information provided on this website.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            The contents of this website are the intellectual property of Legal Navigation.
          </p>
        </div>
        <button
          onClick={onAccept}
          className="mt-6 w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
        >
          I Accept
        </button>
      </div>
    </div>
  );
};

export default DisclaimerModal;
