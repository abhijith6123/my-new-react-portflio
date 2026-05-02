import { useState } from 'react';
import { Particles } from '../components/Particles';
import { motion } from 'motion/react';

export default function Contact() {
  const [result, setResult] = useState("");

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
    <section id="contact" className="relative c-space section-spacing overflow-hidden">
      {/* Magic Background Effects */}
      <div className="absolute inset-0 z-0">
        <Particles
          className="absolute inset-0"
          quantity={150}
          staticity={30}
          ease={50}
          color="#7a57db"
        />
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-royal/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-coral/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-heading text-white">Get In Touch</h2>
          <p className="subtext mt-4 max-w-lg mx-auto">
            Have a project in mind or just want to say hi? Feel free to reach out!
          </p>
        </div>

        <div className="flex justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative group max-w-xl w-full"
          >
            {/* Animated Border Glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-royal via-lavender to-coral rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative bg-[#06091f]/80 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl">
              <form onSubmit={onSubmit} className="flex flex-col gap-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="field-label text-neutral-300">Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      required
                      className="field-input bg-white/5 border-white/10 focus:border-royal/50 focus:ring-royal/20"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="field-label text-neutral-300">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      required
                      className="field-input bg-white/5 border-white/10 focus:border-royal/50 focus:ring-royal/20"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="field-label text-neutral-300">Message</label>
                  <textarea
                    name="message"
                    placeholder="Tell me about your project..."
                    required
                    rows="5"
                    className="field-input bg-white/5 border-white/10 focus:border-royal/50 focus:ring-royal/20 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="relative group/btn overflow-hidden px-8 py-4 bg-gradient-to-r from-royal to-lavender text-white font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-royal/20"
                >
                  <span className="relative z-10">Send Message</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                </button>
                
                {result && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`text-center font-medium ${result.includes('Error') ? 'text-coral' : 'text-mint'}`}
                  >
                    {result}
                  </motion.span>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

