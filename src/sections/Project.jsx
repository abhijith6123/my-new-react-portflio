import { useState, useCallback } from "react";
import Projects from "../components/Projects";
import { myProjects } from "../constants";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const Project = () => {
  // Smoother spring — higher damping, moderate stiffness
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 25, stiffness: 200, mass: 0.5 });
  const springY = useSpring(y, { damping: 25, stiffness: 200, mass: 0.5 });

  const handleMouseMove = useCallback((e) => {
    x.set(e.clientX + 24);
    y.set(e.clientY + 24);
  }, [x, y]);

  const [preview, setPreview] = useState(null);
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1, once: true });

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative c-space mt-20 mb-20"
      id="projects"
    >
      <h2 className="text-heading mb-12">My Selected Projects</h2>

      {/* animated divider */}
      <div
        ref={sectionRef}
        className={`bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full scroll-reveal-fade ${
          isVisible ? "visible" : ""
        }`}
      />

      {myProjects.map((project, index) => (
        <Projects
          key={project.id}
          {...project}
          setPreview={setPreview}
          index={index}
        />
      ))}

      {/* Smooth fade + scale preview image */}
      <AnimatePresence mode="wait">
        {preview && (
          <motion.div
            key={preview}
            className="fixed top-0 left-0 z-50 pointer-events-none"
            style={{ x: springX, y: springY }}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <img
              src={preview}
              alt="Project preview"
              className="w-72 h-48 object-cover object-top rounded-xl shadow-2xl"
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(92,51,204,0.2)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Project;
