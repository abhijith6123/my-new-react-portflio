import React, { useState } from 'react';
import { liveDesigns } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const LiveDesigns = () => {
  const [showAll, setShowAll] = useState(false);
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1, once: true });

  const visibleDesigns = showAll ? liveDesigns : liveDesigns.slice(0, 3);

  return (
    <section id="live-designs" className="c-space section-spacing">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
          <h2 className="text-heading">My Designs Currently Live</h2>
          <p className="subtext mt-4 max-w-xl">
            Explore a selection of live websites and platforms I've designed and developed, 
            demonstrating real-world impact and functional excellence.
          </p>
        </div>
      </div>

      <div
        ref={sectionRef}
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 scroll-reveal ${isVisible ? 'visible' : ''}`}
      >
        <AnimatePresence mode="popLayout">
          {visibleDesigns.map((site, index) => (
            <motion.div
              key={site.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: showAll ? 0 : index * 0.1 }}
              className="group relative"
            >
              <a
                href={site.href}
                target="_blank"
                rel="noreferrer"
                className="block overflow-hidden rounded-2xl bg-indigo border border-white/10 hover:border-royal/50 transition-all duration-300 shadow-xl hover:shadow-royal/20"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={site.image}
                    alt={site.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = "https://placehold.co/600x400/06091f/white?text=" + site.title;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="flex items-center gap-2 text-white font-medium">
                      <span>Visit Site</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-white group-hover:text-royal transition-colors">{site.title}</h3>
                  <p className="text-sm text-neutral-400 mt-1 truncate">{site.href.replace('https://www.', '').replace('https://', '')}</p>
                </div>
              </a>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {liveDesigns.length > 3 && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setShowAll(!showAll)}
            className="group relative flex items-center gap-2 px-8 py-3 bg-white/5 border border-white/10 rounded-full text-white font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-300 active:scale-95"
          >
            {showAll ? 'Show Less' : 'Show More'}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className={`transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      )}
    </section>
  );
};

export default LiveDesigns;
