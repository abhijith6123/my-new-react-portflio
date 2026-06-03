import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Posters = () => {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1, once: true });

  return (
    <section
      ref={sectionRef}
      id="posters"
      className={`c-space mt-20 mb-20 scroll-reveal-scale ${isVisible ? 'visible' : ''}`}
    >
      <div className="text-center">
        <h2 className="text-heading mb-12">Check Out My Poster figma file and Resume here</h2>
        <p className="text-lg text-gray-300 mb-8">
          Explore my collection of posters, figma files and designs.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://drive.google.com/drive/folders/1NwCxxBSVSYSD6pL9E9yHv-Uij4aqLmVk?usp=drive_link"
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View My works (Open Here)
          </a>
          <a
            href="/assets/resume.pdf"
            download
            className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Download Resume
          </a>
          <a
            href="https://medium.com/@abijithkumar23"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            Medium Blog
          </a>
          <a
            href="https://www.figma.com/design/711EV8CEwkqjTvnwOfkTUS/MINE?node-id=0-1&t=S1kOFizdDtrysvsZ-1"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            View Figma Design
          </a>
        </div>
      </div>
    </section>
  );
};

export default Posters;
