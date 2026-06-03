import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Contact() {
  const [result, setResult] = useState("");
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1, once: true });

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);
    formData.append("access_key", "f428a7c0-2282-4b30-a9b3-89bb28670aea");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      setResult("Error");
    }
  };

  return (
    <section id="contact" className="c-space mt-20 mb-20 relative overflow-hidden">
      {/* Decorative Magic Orbs */}
      <div className="magic-glow-orb -top-20 -left-20 animate-pulse" />
      <div className="magic-glow-orb bottom-0 right-0 opacity-10 animate-pulse" style={{ background: 'radial-gradient(circle, var(--color-coral), transparent)' }} />

      <div ref={sectionRef} className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-royal via-aqua to-coral animate-gradient">
            Let's Create Magic Together
          </h2>
          <p className="subtext mt-4 text-lg max-w-xl mx-auto">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
        </div>

        <div className="flex justify-center animate-float">
          <div className="magic-container w-full max-w-xl">
            <div className="magic-card-inner">
              <form onSubmit={onSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="field-label text-white/80">Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      required
                      className="field-input field-input-focus"
                    />
                  </div>
                  <div>
                    <label className="field-label text-white/80">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      required
                      className="field-input field-input-focus"
                    />
                  </div>
                </div>
                <div>
                  <label className="field-label text-white/80">Message</label>
                  <textarea
                    name="message"
                    placeholder="Tell me about your project..."
                    required
                    rows="5"
                    className="field-input field-input-focus resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold text-white transition-all duration-300 relative group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-royal to-aqua group-hover:scale-110 transition-transform duration-500" />
                  <span className="relative z-10">Send Message</span>
                </button>
                <span className="text-center text-sm font-medium text-aqua animate-pulse">{result}</span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

