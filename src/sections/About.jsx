import React from "react";
import { Globe } from "../components/Globe";
import CopyEmailButton from "../components/CopyEmailButton";
import { Frameworks } from "../components/Frameworks";
import { useScrollReveal } from "../hooks/useScrollReveal";
import MarioGame from "../components/MarioGame";
import AboutCard from "../components/AboutCard";

const About = () => {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1, once: true });

  return (
    <section id="about" className="c-space mt-20 mb-20">
      <h2 className="text-heading mb-12">About Me</h2>

      <div
        ref={sectionRef}
        className={`grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] scroll-reveal ${isVisible ? "visible" : ""}`}
      >
        {/* Grid 1 */}
        <div className="grid-default-color grid-1 !p-0 overflow-hidden">
          <AboutCard />
        </div>

        {/* Grid 2 — Mini Game */}
        <div className="grid-default-color grid-2 !p-0 overflow-hidden">
          <MarioGame />
        </div>

        {/* Grid 3 */}
        <div className="grid-black-color grid-3">
          <div className="z-10 w-[50%]">
            <p className="headtext">Time Zone</p>
            <p className="subtext">
              I am currently based in the INDIA, and open to work in bangalore
            </p>
          </div>
          <figure className="absolute left-[30%] top-[10%]">
            <Globe />
          </figure>
        </div>

        {/* Grid 4 */}
        <div className="grid-black-color grid-4 relative overflow-hidden group border border-white/5 shadow-[0_0_40px_rgba(51,194,204,0.05)] hover:shadow-[0_0_60px_rgba(51,194,204,0.15)] transition-shadow duration-500">
          {/* Animated Background Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-0 flex items-center justify-center opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 pointer-events-none">
            <div className="absolute w-[150%] pt-[150%] rounded-full border border-aqua/30 animate-[spin_10s_linear_infinite]" />
            <div className="absolute w-[100%] pt-[100%] rounded-full border border-[#9c27b0]/30 animate-[spin_7s_linear_infinite_reverse]" />
          </div>

          <div className="relative z-20 flex flex-col items-center justify-center h-full gap-4 text-center p-4">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              Let's build <br />
              <span className="text-[#33c2cc]">something amazing.</span>
            </h2>

            <p className="text-gray-300 text-xs sm:text-sm font-medium max-w-[95%] drop-shadow-md">
              Whether you have a project in mind or just want to chat, I'm always open to new opportunities.
            </p>

            <div className="mt-3 transform group-hover:-translate-y-1 transition-transform duration-300 relative z-30">
              <CopyEmailButton />
            </div>
          </div>
        </div>

        {/* Grid 5 */}
        <div className="grid-default-color grid-5">
          <div className="z-1 w-[50%]">
            <p className="headtext">MY TECH</p>
            <p className="subtext">
              I specialize in a variety of languages,web designs,frameworks and tools that allow me to build robust and scalable applications
            </p>
          </div>

          <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125">
            <Frameworks />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

