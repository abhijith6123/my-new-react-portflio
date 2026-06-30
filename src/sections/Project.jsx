import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { myProjects } from '../constants';

const Project = () => {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1, once: true });
  const [hoveredProject, setHoveredProject] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (project) => (e) => {
    setHoveredProject(project);
    setCursorPos({ x: e.clientX, y: e.clientY });
  };
  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };
  const handleMouseLeave = () => setHoveredProject(null);

  return (
    <section id="projects" ref={sectionRef} className={`c-space py-20 scroll-reveal-scale ${isVisible ? 'visible' : ''}`}>
      <h2 className="text-center text-4xl font-extrabold text-white mb-12">My Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {myProjects.map(project => (
          <div
            key={project.id}
            className="bg-gray-950 border border-white/10 rounded-xl overflow-hidden p-4 cursor-pointer"
            onMouseEnter={handleMouseEnter(project)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            
            <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-gray-400 text-sm line-clamp-2 mb-2">{project.description}</p>
            <div className="flex flex-wrap gap-1">
              {project.tags?.map(t => (
                <span key={t.id} className="px-2 py-1 bg-aqua/10 border border-aqua/30 rounded text-xs text-aqua">{t.name}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      {hoveredProject && (
        <img
          src={hoveredProject.image}
          alt={hoveredProject.title}
          className="fixed pointer-events-none rounded-lg shadow-xl z-50"
          style={{
            top: cursorPos.y + 20,
            left: cursorPos.x + 20,
            width: '200px',
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}
    </section>
  );
};

export default Project;
