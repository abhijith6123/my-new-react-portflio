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
        <div className="grid-black-color grid-4 relative overflow-hidden group border border-white/5 shadow-[0_0_40px_rgba(51,194,204,0.05)] hover:shadow-[0_0_80px_rgba(92,51,204,0.2)] transition-shadow duration-700">
          
          {/* Advanced Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-aqua/20 via-royal/20 to-transparent z-0 animate-[gradient-bg_8s_ease_infinite] bg-[length:200%_200%]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(51,194,204,0.15),transparent_70%)] animate-[pulse_4s_ease-in-out_infinite] z-0" />
          
          {/* Comets inside the box */}
          <div className="absolute top-[-10px] left-[20%] w-[2px] h-[60px] bg-gradient-to-b from-transparent to-aqua opacity-0 animate-[comet-fall_3s_linear_infinite]" />
          <div className="absolute top-[-10px] right-[20%] w-[2px] h-[60px] bg-gradient-to-b from-transparent to-lavender opacity-0 animate-[comet-fall_4.5s_linear_infinite_1.5s]" />
          <div className="absolute top-[-10px] left-[60%] w-[2px] h-[80px] bg-gradient-to-b from-transparent to-coral opacity-0 animate-[comet-fall_5s_linear_infinite_3s]" />
          
          <div className="relative z-20 flex flex-col items-center justify-center h-full gap-5 text-center p-6">
            <div className="relative w-full">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight transition-transform duration-500 group-hover:-translate-y-2">
                <span className="text-white drop-shadow-md block mb-1">Let's build</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-aqua to-lavender group-hover:from-lavender group-hover:to-aqua transition-all duration-1000 relative inline-block">
                  something amazing.
                  {/* Underline glow effect */}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-aqua to-lavender group-hover:w-full transition-all duration-700 ease-in-out shadow-[0_0_10px_rgba(51,194,204,0.8)]" />
                </span>
              </h2>
            </div>

            <p className="text-gray-400 text-xs sm:text-sm font-medium max-w-[95%] opacity-80 group-hover:opacity-100 group-hover:text-white transition-all duration-500">
              Whether you have a project in mind or just want to chat, I'm always open to new opportunities.
            </p>

            <div className="mt-2 transform group-hover:-translate-y-1 group-hover:scale-110 transition-all duration-500 relative z-30">
              <div className="absolute inset-0 bg-gradient-to-r from-aqua to-royal rounded-lg blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
              <div className="relative">
                <CopyEmailButton />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;

