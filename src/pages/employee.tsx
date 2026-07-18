import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getEmployees, createEmployee, deactivateEmployee, reactivateEmployee, logout } from "../lib/api";
export default function Employees() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function loadEmployees() {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  async function handleCreate() {
    if (!email.trim() || !password.trim() || !name.trim()) {
      alert("Email, password, and name are required");
      return;
    }
    setSubmitting(true);
    try {
      await createEmployee({ email, password, name, designation, department });
      setEmail(""); setPassword(""); setName(""); setDesignation(""); setDepartment("");
      await loadEmployees();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to create");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeactivate(id: string, empName: string) {
  try {
    await deactivateEmployee(id);
    await loadEmployees();
  } catch (err) {
    alert(err instanceof Error ? err.message : "Failed to deactivate");
  }
}
  async function handleReactivate(id: string, empName: string) {
  try {
    await reactivateEmployee(id);
    await loadEmployees();
  } catch (err) {
    alert(err instanceof Error ? err.message : "Failed to reactivate");
  }
}
  return (
    <div className="min-h-screen bg-[#FAF9F6] p-12">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Employee Management</h1>
          <p className="text-neutral-600">Add and manage staff accounts</p>
        </div>
        <div className="flex gap-3">
          <Link to="/dashboard" className="text-sm font-semibold px-4 py-2 rounded-lg border border-neutral-300 text-neutral-700 hover:border-[#B8932E] hover:text-[#B8932E] transition-colors">
            ← Dashboard
          </Link>
          <button onClick={logout} className="text-sm font-semibold px-4 py-2 rounded-lg border border-neutral-300 text-neutral-700 hover:border-[#B8932E] hover:text-[#B8932E] transition-colors">
            Log Out
          </button>
        </div>
      </div>

      {/* Add employee form */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 mb-8">
        <h2 className="font-bold text-[#1A1A1A] mb-4">Add New Employee</h2>
        <div className="grid md:grid-cols-2 gap-3 mb-3">
          <input placeholder="Full name *" value={name} onChange={(e) => setName(e.target.value)}
            className="px-3 py-2 rounded-lg border border-neutral-300 text-sm focus:outline-none focus:border-[#B8932E]" />
          <input placeholder="Email *" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-2 rounded-lg border border-neutral-300 text-sm focus:outline-none focus:border-[#B8932E]" />
          <input placeholder="Temporary password *" value={password} onChange={(e) => setPassword(e.target.value)}
            className="px-3 py-2 rounded-lg border border-neutral-300 text-sm focus:outline-none focus:border-[#B8932E]" />
          <input placeholder="Designation" value={designation} onChange={(e) => setDesignation(e.target.value)}
            className="px-3 py-2 rounded-lg border border-neutral-300 text-sm focus:outline-none focus:border-[#B8932E]" />
          <input placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)}
            className="px-3 py-2 rounded-lg border border-neutral-300 text-sm focus:outline-none focus:border-[#B8932E]" />
        </div>
        <button onClick={handleCreate} disabled={submitting}
          className="px-5 py-2.5 rounded-lg bg-[#B8932E] text-white font-semibold text-sm hover:bg-[#C9A94A] transition-colors disabled:opacity-60">
          {submitting ? "Adding..." : "Add Employee"}
        </button>
      </div>

      {/* Employee list */}
      {loading && <p className="text-neutral-500">Loading employees...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="space-y-3">
          {employees.length === 0 ? (
            <p className="text-neutral-500">No employees yet.</p>
          ) : (
            employees.map((emp) => (
              <div key={emp.id} className="bg-white rounded-xl border border-neutral-200 p-5 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-[#1A1A1A]">{emp.user?.name}</h3>
                  <p className="text-sm text-neutral-500">
                    {emp.user?.email} · {emp.designation || "—"} · {emp.department || "—"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    emp.status === "ACTIVE" ? "bg-green-100 text-green-700" : "bg-neutral-100 text-neutral-500"
                  }`}>
                    {emp.status}
                  </span>
                 {emp.status === "ACTIVE" ? (
  <button onClick={() => handleDeactivate(emp.id, emp.user?.name)}
    className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors">
    Deactivate
  </button>
) : (
  <button onClick={() => handleReactivate(emp.id, emp.user?.name)}
    className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-green-200 text-green-600 hover:bg-green-50 transition-colors">
    Reactivate
  </button>
)}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}