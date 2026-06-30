import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Posters = () => {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1, once: true });
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <section
      ref={sectionRef}
      id="posters"
      className={`c-space mt-20 mb-20 scroll-reveal-scale ${isVisible ? 'visible' : ''}`}
    >
      <div className="text-center">
        <h2 className="text-heading mb-12">Check Out My Stuffs and Resume here</h2>
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
          <button
            onClick={() => setIsResumeModalOpen(true)}
            className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            View Resume
          </button>
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

      {isResumeModalOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm transition-opacity">
          <div className="relative w-full max-w-5xl h-[90vh] bg-gray-900 rounded-xl shadow-2xl flex flex-col overflow-hidden border border-white/10">
            <div className="flex justify-between items-center p-4 border-b border-white/10 bg-gray-900/50 backdrop-blur-md">
              <h3 className="text-xl text-white font-bold tracking-wide">Resume</h3>
              <div className="flex gap-3">
                <a
                  href="/assets/resume.pdf"
                  download="resume_abhijithkumar.pdf"
                  className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20"
                >
                  Download Resume
                </a>
                <button
                  onClick={() => setIsResumeModalOpen(false)}
                  className="px-5 py-2 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="flex-1 w-full bg-white relative">
              <iframe
                src="/assets/resume.pdf"
                className="absolute inset-0 w-full h-full border-0"
                title="Resume PDF"
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default Posters;
