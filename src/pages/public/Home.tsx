import { Link } from "react-router-dom";

const services = [
  { title: "HR Consultancy", desc: "Strategic HR advisory, policy design and workforce structuring tailored to your organisation." },
  { title: "Temporary Staffing", desc: "Reliable contractual and temporary manpower, fully managed for payroll and compliance." },
  { title: "Labour Law Compliance", desc: "End-to-end management of registrations, returns, registers and statutory obligations." },
  { title: "Liaisoning & IR", desc: "Government liaisoning and industrial-relations support to keep operations on track." },
];

const steps = [
  { n: "1", title: "Reach out", desc: "Tell us about your organisation and current compliance position." },
  { n: "2", title: "We assess", desc: "We review your obligations and present a clear, prioritised plan." },
  { n: "3", title: "We deliver", desc: "We execute filings, registers and audits — and stay on as your partner." },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-[#E8E4DC]">
        <div className="max-w-6xl mx-auto px-7 py-24 text-center">
          <p className="text-[13px] font-semibold tracking-[0.2em] uppercase text-[#B8932E] mb-5">
            Founded on Trust and Services
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-semibold leading-[1.1] tracking-tight text-[#1A1A1A] max-w-3xl mx-auto mb-6">
            End-to-end HR &amp; statutory compliance, handled with care.
          </h1>
          <p className="text-lg text-[#4A4742] max-w-xl mx-auto mb-9 leading-relaxed">
            DH Associates partners with organisations across Navi Mumbai and beyond to keep them fully compliant — from labour-law registers to staffing, audits and industrial relations.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/services" className="px-7 py-3.5 rounded-[10px] bg-[#B8932E] text-white font-semibold hover:bg-[#C9A94A] transition-all hover:-translate-y-0.5">
              Explore Services
            </Link>
            <Link to="/contact" className="px-7 py-3.5 rounded-[10px] border-[1.5px] border-[#B8932E] text-[#B8932E] font-semibold hover:bg-[#B8932E] hover:text-white transition-colors">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="max-w-6xl mx-auto px-7 py-24">
        <p className="text-[13px] font-semibold tracking-[0.18em] uppercase text-[#B8932E] mb-3">What We Do</p>
        <h2 className="font-serif text-4xl font-semibold text-[#1A1A1A] mb-12">Comprehensive compliance solutions</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {services.map((c) => (
            <article key={c.title} className="group bg-white rounded-2xl border border-[#E8E4DC] p-7 transition-all hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(26,22,15,0.10)]">
              <div className="w-9 h-0.5 bg-[#B8932E] mb-5 scale-x-0 group-hover:scale-x-100 origin-left transition-transform"></div>
              <h3 className="font-serif text-xl font-semibold text-[#1A1A1A] mb-3">{c.title}</h3>
              <p className="text-sm text-[#8A857C] leading-relaxed">{c.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="max-w-6xl mx-auto px-7 pb-24">
        <p className="text-[13px] font-semibold tracking-[0.18em] uppercase text-[#B8932E] mb-3 text-center">How To Get Started</p>
        <h2 className="font-serif text-4xl font-semibold text-[#1A1A1A] mb-12 text-center">Three simple steps</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.n} className="text-center px-6">
              <div className="w-14 h-14 rounded-full bg-[#F7F1E1] text-[#B8932E] font-serif font-semibold text-2xl flex items-center justify-center mx-auto mb-5">
                {s.n}
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#1A1A1A] mb-2">{s.title}</h3>
              <p className="text-sm text-[#8A857C] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}