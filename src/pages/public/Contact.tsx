import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit() {
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert("Please fill in all fields");
      return;
    }
    // For now: just show success. Email sending can be added later.
    setSent(true);
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <p className="text-sm font-semibold tracking-widest uppercase text-[#B8932E] mb-2">Contact Us</p>
      <h1 className="text-4xl font-bold text-[#1A1A1A] mb-4">Let's talk about your compliance</h1>
      <p className="text-lg text-neutral-600 max-w-2xl mb-12">
        Reach us by phone, email or the form below.
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Details */}
        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold text-[#B8932E] mb-1">Office Address</p>
            <p className="text-neutral-600">Shop No. 5, Mansi CHS Ltd., Plot B-35, Sector-9, Diva Gaon, Airoli, Navi Mumbai – 400708</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#B8932E] mb-1">Phone</p>
            <p className="text-neutral-600">(022) 27640413 · +91 99304 40413</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#B8932E] mb-1">Email</p>
            <p className="text-neutral-600">info@dhassociates.co.in</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#B8932E] mb-1">Working Hours</p>
            <p className="text-neutral-600">Monday – Friday, 9:00 AM – 5:30 PM</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          {sent ? (
            <div className="text-center py-12">
              <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 text-2xl flex items-center justify-center mx-auto mb-4">✓</div>
              <h2 className="font-bold text-[#1A1A1A] text-lg mb-2">Thank you</h2>
              <p className="text-neutral-600 text-sm">Your message has been received. We'll be in touch soon.</p>
            </div>
          ) : (
            <>
              <h2 className="font-bold text-[#1A1A1A] mb-4">Send us a message</h2>
              <div className="mb-3">
                <label className="block text-sm font-semibold text-neutral-700 mb-1">Full name</label>
                <input value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-sm focus:outline-none focus:border-[#B8932E]" />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-semibold text-neutral-700 mb-1">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-sm focus:outline-none focus:border-[#B8932E]" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-neutral-700 mb-1">Message</label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-sm focus:outline-none focus:border-[#B8932E]" />
              </div>
              <button onClick={handleSubmit}
                className="px-5 py-2.5 rounded-lg bg-[#B8932E] text-white font-semibold text-sm hover:bg-[#C9A94A] transition-colors">
                Send message
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}