import React from 'react';
import { uiuxResearch } from '../constants';
import { useScrollReveal } from '../hooks/useScrollReveal';

const UiUxResearch = () => {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1, once: true });

  return (
    <section id="research" className="c-space mt-16 mb-16">
      <div 
        ref={sectionRef}
        className={`transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* heading */}
        <div className="flex items-center gap-4 mb-10 relative z-10">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-fuchsia mb-1">
              Methodology
            </p>
            <h2 className="text-heading">UI/UX Research</h2>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent ml-4" />
        </div>

        {/* cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {uiuxResearch.map((item, index) => {
            const delay = index * 150;
            return (
              <div 
                key={item.id}
                className="research-card group"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                  transition: `opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
                }}
              >
                <div className="flex items-start gap-5 relative z-10">
                  <div className="text-4xl md:text-5xl group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-500">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-aqua transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm font-semibold text-fuchsia mb-2 tracking-wide">
                      {item.summary}
                    </p>
                    <p className="text-sm md:text-base text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {item.description}
                    </p>
                  </div>
                </div>
                
                {/* smooth background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent rounded-2xl group-hover:from-aqua/[0.08] transition-colors duration-500 pointer-events-none" />
                
                {/* border glow */}
                <div className="absolute inset-0 border border-white/5 rounded-2xl group-hover:border-aqua/40 shadow-[0_0_0_transparent] group-hover:shadow-[0_0_30px_rgba(51,194,204,0.15)] transition-all duration-500 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UiUxResearch;
