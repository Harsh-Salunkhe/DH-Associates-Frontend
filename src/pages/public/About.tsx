const values = [
  { title: "Vision", desc: "To be the most trusted compliance and HR partner for organisations that value integrity, accuracy and accountability." },
  { title: "Mission", desc: "To deliver dependable, end-to-end statutory compliance and HR solutions that let our clients operate with confidence." },
  { title: "Goal", desc: "To safeguard every client from compliance risk through proactive, meticulous and ethical service." },
];

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-7 py-20">
      <p className="text-[13px] font-semibold tracking-[0.18em] uppercase text-[#B8932E] mb-3">About DH Associates</p>
      <h1 className="font-serif text-5xl font-semibold text-[#1A1A1A] mb-6 max-w-3xl leading-[1.1]">
        Compliance is a relationship, not a transaction.
      </h1>
      <p className="text-lg text-[#4A4742] max-w-2xl mb-16 leading-relaxed">
        We are a Navi Mumbai based statutory-compliance and HR advisory firm, founded on a simple principle — trust, backed by dependable service.
      </p>

      <div className="grid md:grid-cols-2 gap-12 mb-20">
        <div>
          <p className="text-[13px] font-semibold tracking-[0.18em] uppercase text-[#B8932E] mb-3">Our Philosophy</p>
          <h2 className="font-serif text-3xl font-semibold text-[#1A1A1A] leading-snug">Disciplined, transparent, and always accountable.</h2>
        </div>
        <div className="space-y-4 text-[#4A4742] leading-relaxed">
          <p>Labour law is detailed, ever-changing and unforgiving of oversight. DH Associates exists to absorb that complexity on behalf of our clients — translating statutes into clear actions, deadlines and documentation.</p>
          <p>We combine deep knowledge of statutory compliance with practical HR experience, so the advice we give is grounded in how organisations actually operate.</p>
          <p>The result is peace of mind: our clients know their obligations are met, their records are sound, and their people are managed fairly.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {values.map((v) => (
          <div key={v.title} className="bg-white rounded-2xl border border-[#E8E4DC] p-7">
            <p className="font-serif text-xl font-semibold text-[#B8932E] mb-3">{v.title}</p>
            <p className="text-[#8A857C] text-sm leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}