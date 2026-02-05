import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Posters = () => {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1, once: true });

  return (
    <div
      ref={sectionRef}
      id="posters"
      className={`w-full py-20 scroll-reveal-scale ${isVisible ? 'visible' : ''}`}
    >
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-8">Check Out My Poster Videos and Resume here</h2>
        <p className="text-lg text-gray-300 mb-4">
          Explore my collection of posters,videos and designs.
        </p>
        <a
          href="https://drive.google.com/drive/folders/1NwCxxBSVSYSD6pL9E9yHv-Uij4aqLmVk?usp=drive_link"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          View My works (Open Here)
        </a>
        <a
          href="/assets/ABHIJITHKUMAR N resume.pdf"
          download
          className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors ml-4"
        >
          Download Resume
        </a>
      </div>
    </div>
  );
};

export default Posters;
