import React from 'react';
import { liveDesigns } from '../constants';
import { useScrollReveal } from '../hooks/useScrollReveal';

const LiveDesigns = () => {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1, once: true });

  return (
    <section id="livedesigns" className="c-space mt-20 mb-20">
      <div ref={sectionRef} className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="text-heading mb-12"> My Live Designs</h2>
        
        <div className="flex overflow-x-auto gap-8 pb-2 scrollbar-hide snap-x snap-mandatory cursor-grab active:cursor-grabbing">
          {liveDesigns.map((design) => (
            <a
              key={design.id}
              href={design.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-[300px] md:w-[450px] snap-center group"
            >
              <div className="magic-container h-[250px] md:h-[320px]">
                <div className="magic-card-inner !p-0 relative overflow-hidden h-full">
                  <img
                    src={design.image}
                    alt={design.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight/95 via-midnight/20 to-transparent flex items-end p-8">
                    <div className="transition-transform duration-300 group-hover:-translate-y-2">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{design.title}</h3>
                      <p className="text-xs md:text-sm text-aqua font-medium tracking-wider flex items-center gap-2">
                        VISIT WEBSITE <span className="text-lg">→</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
          {/* Spacer to allow full scroll */}
          <div className="flex-shrink-0 w-1 md:w-10" />
        </div>
        
        <div className="flex items-center justify-center gap-4 mt-8">
          <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-royal" />
          <p className="text-sm font-medium text-neutral-400 tracking-[0.2em] uppercase">
            Swipe left to explore
          </p>
          <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-royal" />
        </div>
      </div>
    </section>
  );
};

export default LiveDesigns;
