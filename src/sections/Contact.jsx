import { useState } from 'react';

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
    <section id="contact" className="c-space section-spacing">
      <h2 className="text-heading">Contact Me</h2>
      <div className="mt-12 flex justify-center">
        <div className="grid-default-color p-6 rounded-2xl max-w-md w-full">
          <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <div>
              <label className="field-label">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="field-input field-input-focus"
              />
            </div>
            <div>
              <label className="field-label">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="field-input field-input-focus"
              />
            </div>
            <div>
              <label className="field-label">Message</label>
              <textarea
                name="message"
                placeholder="Your Message"
                required
                rows="5"
                className="field-input field-input-focus resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn"
            >
              Submit Form
            </button>
            <span className="text-center text-sm text-neutral-400">{result}</span>
          </form>
        </div>
      </div>
    </section>
  );
}

