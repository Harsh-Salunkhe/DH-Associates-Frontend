import { useState } from "react";

// ─────────────────────────────────────────────────────────────
// PF CONFIGURATION — ALL VALUES TO BE CONFIRMED BY DH ASSOCIATES
// These are placeholders based on the standard EPF structure.
// When the firm provides the current statutory rates, update here.
// ─────────────────────────────────────────────────────────────
const PF_CONFIG = {
  wageCeiling: 15000,      // ₹ — statutory wage ceiling (confirm)
  employeeRate: 0.12,      // 12% employee share
  employerRate: 0.12,      // 12% total employer share
  epsRate: 0.0833,         // 8.33% → pension (EPS), capped at ceiling
  adminRate: 0.005,        // 0.5% EPF admin charges (confirm)
  edliRate: 0.005,         // 0.5% EDLI (confirm)
};

export default function PFCalculator() {
  const [wages, setWages] = useState("");
  const [capAtCeiling, setCapAtCeiling] = useState(true);
  const [result, setResult] = useState<null | ReturnType<typeof compute>>(null);

  function compute(basicWage: number) {
    // The wage on which PF is calculated
    const pfWage = capAtCeiling ? Math.min(basicWage, PF_CONFIG.wageCeiling) : basicWage;

    // Employee contribution
    const employee = pfWage * PF_CONFIG.employeeRate;

    // Employer split: EPS is always on the ceiling-capped wage
    const epsWage = Math.min(basicWage, PF_CONFIG.wageCeiling);
    const eps = epsWage * PF_CONFIG.epsRate;
    const employerEpf = pfWage * PF_CONFIG.employerRate - eps;

    // Employer admin costs
    const admin = pfWage * PF_CONFIG.adminRate;
    const edli = pfWage * PF_CONFIG.edliRate;

    const totalEmployer = employerEpf + eps + admin + edli;
    const totalToPfAccount = employee + employerEpf + eps;

    return {
      pfWage,
      employee,
      eps,
      employerEpf,
      admin,
      edli,
      totalEmployer,
      totalToPfAccount,
    };
  }

  function handleCalculate() {
    const w = parseFloat(wages);
    if (isNaN(w) || w <= 0) {
      alert("Please enter a valid wage amount");
      return;
    }
    setResult(compute(w));
  }

  const money = (n: number) =>
    "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 2 });

  return (
    <div className="max-w-3xl mx-auto px-7 py-16">
      <p className="text-[13px] font-semibold tracking-[0.18em] uppercase text-[#B8932E] mb-3">Statutory Calculator</p>
      <h1 className="font-serif text-4xl font-semibold text-[#1A1A1A] mb-3">Provident Fund (PF) Calculator</h1>
      <p className="text-[#4A4742] mb-10 leading-relaxed">
        Estimate monthly EPF contributions from an employee's basic wages. Results are indicative.
      </p>

      {/* Input */}
      <div className="bg-white rounded-2xl border border-[#E8E4DC] p-7 mb-6">
        <label className="block text-sm font-semibold text-[#4A4742] mb-1.5">
          Monthly Basic Wages + DA (₹)
        </label>
        <input
          type="number"
          value={wages}
          onChange={(e) => setWages(e.target.value)}
          placeholder="e.g. 20000"
          className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8E4DC] bg-[#FCFBF9] text-sm focus:outline-none focus:border-[#B8932E] mb-4"
        />

        <label className="flex items-center gap-2.5 text-sm text-[#4A4742] mb-5 cursor-pointer">
          <input
            type="checkbox"
            checked={capAtCeiling}
            onChange={(e) => setCapAtCeiling(e.target.checked)}
            className="w-4 h-4 accent-[#B8932E]"
          />
          Cap contribution at the wage ceiling (₹{PF_CONFIG.wageCeiling.toLocaleString("en-IN")})
        </label>

        <button
          onClick={handleCalculate}
          className="px-6 py-3 rounded-lg bg-[#B8932E] text-white font-semibold text-sm hover:bg-[#C9A94A] transition-colors"
        >
          Calculate
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="bg-white rounded-2xl border border-[#E8E4DC] p-7">
          <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-5">Monthly Breakdown</h2>

          <div className="space-y-3">
            {[
              { label: "PF wage used", value: result.pfWage },
              { label: "Employee contribution (12%)", value: result.employee },
              { label: "Employer → EPF", value: result.employerEpf },
              { label: "Employer → Pension (EPS, 8.33%)", value: result.eps },
              { label: "EPF admin charges", value: result.admin },
              { label: "EDLI", value: result.edli },
            ].map((row) => (
              <div key={row.label} className="flex justify-between text-sm border-b border-[#F0ECE3] pb-2.5">
                <span className="text-[#8A857C]">{row.label}</span>
                <span className="font-semibold text-[#1A1A1A]">{money(row.value)}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t-2 border-[#E8E4DC] space-y-3">
            <div className="flex justify-between">
              <span className="font-semibold text-[#4A4742]">Total employer cost</span>
              <span className="font-bold text-[#B8932E] text-lg">{money(result.totalEmployer)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-[#4A4742]">Total to PF account</span>
              <span className="font-bold text-[#1A1A1A] text-lg">{money(result.totalToPfAccount)}</span>
            </div>
          </div>

          {/* Assumptions — transparency */}
          <div className="mt-6 pt-4 border-t border-[#F0ECE3] text-xs text-[#8A857C] leading-relaxed">
            <p className="font-semibold mb-1">Calculated using:</p>
            <p>
              Wage ceiling ₹{PF_CONFIG.wageCeiling.toLocaleString("en-IN")} · Employee 12% ·
              Employer 12% (EPS 8.33%) · Admin 0.5% · EDLI 0.5%.
              These rates are indicative and subject to statutory revision. This is not legal or financial advice.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}