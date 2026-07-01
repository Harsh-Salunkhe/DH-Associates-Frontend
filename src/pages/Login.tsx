import { useState } from "react";
import { login } from "../lib/api";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function handleSubmit() {
    setError("");
    setLoading(true);
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      // Redirect based on role
if (data.user.role === "CLIENT") {
  navigate("/portal");
} else {
  navigate("/dashboard"); // ADMIN or EMPLOYEE
}
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] p-4">
      <div className="flex w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-neutral-200">

        {/* Left: brand panel */}
        <div className="hidden md:flex flex-col justify-between flex-1 bg-gradient-to-br from-[#1A1A1A] to-[#262320] text-white p-12 relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#B8932E] flex items-center justify-center text-[#1A1A1A] font-extrabold">
              DH
            </div>
            <span className="font-bold tracking-wide">DH ASSOCIATES</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold leading-snug mb-3">
              Staffing,<br />managed with <span className="text-[#C9A94A]">trust.</span>
            </h1>
            <p className="text-neutral-400 text-sm max-w-xs leading-relaxed">
              Your team, your clients, your records — organised in one secure place.
            </p>
          </div>
          <div className="text-xs tracking-widest uppercase text-[#C9A94A] font-semibold">
            Founded on Trust and Services
          </div>
        </div>

        {/* Right: form */}
        <div className="flex-1 bg-white p-12 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-1">Welcome back</h2>
          <p className="text-neutral-500 text-sm mb-8">Sign in to your DH Associates account</p>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-neutral-700 mb-2">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@dhassociates.com"
              className="w-full px-4 py-3 rounded-lg border border-neutral-200 bg-neutral-50 text-sm focus:outline-none focus:border-[#B8932E] focus:ring-2 focus:ring-[#B8932E]/20"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-semibold text-neutral-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
              className="w-full px-4 py-3 rounded-lg border border-neutral-200 bg-neutral-50 text-sm focus:outline-none focus:border-[#B8932E] focus:ring-2 focus:ring-[#B8932E]/20"
            />
          </div>
          {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
         <button
  onClick={handleSubmit}
  disabled={loading}
  className="w-full py-3 mt-4 bg-[#B8932E] hover:bg-[#C9A94A] text-[#1A1A1A] font-bold rounded-lg text-sm transition-colors disabled:opacity-60"
>
  {loading ? "Signing in..." : "Sign In"}
</button>

          <p className="text-xs text-neutral-500 text-center mt-5">
            Accounts are created by your administrator
          </p>
        </div>
      </div>
    </div>
  );
}