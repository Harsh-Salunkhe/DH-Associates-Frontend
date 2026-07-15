const services = [
  { title: "HR Consultancy", desc: "Strategic and operational HR support, shaped around your organisation's size and sector.", items: ["HR policy & handbook design", "Payroll structuring", "Performance frameworks", "Onboarding & exit process"] },
  { title: "Temporary Staffing", desc: "Flexible, fully-managed manpower for short-term and project-based requirements.", items: ["Contractual workforce supply", "Managed payroll & statutory dues", "Documentation & compliance", "Headcount scaling"] },
  { title: "Labour Law Compliance", desc: "Complete management of statutory obligations under applicable central and state labour laws.", items: ["Registrations & licences", "Statutory returns & registers", "PF, ESIC & PT management", "Minimum wages & bonus"] },
  { title: "Liaisoning", desc: "Smooth coordination with government departments and authorities on your behalf.", items: ["Department liaisoning", "Inspection handling", "Approvals & renewals", "Representation support"] },
  { title: "Industrial Relations", desc: "Practical support to maintain healthy relations between management and workforce.", items: ["Dispute resolution support", "Disciplinary procedures", "Settlement & conciliation", "Union liaison"] },
  { title: "Compliance Audit", desc: "Independent review of your compliance position to surface and close gaps.", items: ["Vendor & contractor audits", "Record & register verification", "Gap assessment reports", "Corrective action plans"] },
  { title: "Digital Signature", desc: "Assistance with Digital Signature Certificates for statutory filings.", items: ["DSC issuance & renewal", "Class 3 certificates", "Filing support", "Token configuration"] },
];

export default function Services() {
  return (
    <div className="max-w-6xl mx-auto px-7 py-20">
      <p className="text-[13px] font-semibold tracking-[0.18em] uppercase text-[#B8932E] mb-3">Our Services</p>
      <h1 className="font-serif text-5xl font-semibold text-[#1A1A1A] mb-5 max-w-2xl leading-[1.1]">A complete suite of compliance &amp; HR services</h1>
      <p className="text-lg text-[#4A4742] max-w-2xl mb-14 leading-relaxed">
        Whether you need a one-time audit or an ongoing partner, we cover the full spectrum of statutory and people obligations.
      </p>

      <div className="space-y-6">
        {services.map((s, i) => (
          <article key={s.title} className="bg-white rounded-2xl border border-[#E8E4DC] p-8 transition-all hover:shadow-[0_16px_40px_rgba(26,22,15,0.08)]">
            <div className="flex items-baseline gap-4 mb-3">
              <span className="font-serif text-[#B8932E] font-semibold text-lg">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-serif text-2xl font-semibold text-[#1A1A1A]">{s.title}</h3>
            </div>
            <p className="text-[#4A4742] mb-5 leading-relaxed max-w-3xl">{s.desc}</p>
            <ul className="grid sm:grid-cols-2 gap-2.5">
              {s.items.map((item) => (
                <li key={item} className="text-sm text-[#8A857C] flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8932E] shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}