import { useState, useEffect } from "react";
import { getServiceRequests } from "../lib/api";

export default function Dashboard() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRequests() {
      try {
        const data = await getServiceRequests();
        setRequests(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load");
      } finally {
        setLoading(false);
      }
    }
    loadRequests();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F6] p-12">
      <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Staff Dashboard</h1>
      <p className="text-neutral-600 mb-8">All service requests</p>

      {loading && <p className="text-neutral-500">Loading requests...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="space-y-3">
          {requests.length === 0 ? (
            <p className="text-neutral-500">No requests yet.</p>
          ) : (
            requests.map((req) => (
              <div key={req.id} className="bg-white rounded-xl border border-neutral-200 p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-[#1A1A1A]">{req.title}</h3>
                    <p className="text-sm text-neutral-500 mt-1">
                      {req.client?.name} · {req.actName || "General request"}
                    </p>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#F7F1E1] text-[#B8932E]">
                    {req.status}
                  </span>
                </div>
                {req.notes && <p className="text-sm text-neutral-600 mt-3">{req.notes}</p>}
                <p className="text-xs text-neutral-400 mt-2">
                  {req.documents?.length || 0} document(s)
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}