import { useState, useEffect } from "react";
import { getServiceRequests, downloadDocument, updateStatus, uploadAcknowledgement } from "../lib/api";
export default function Dashboard() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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

useEffect(() => {
  loadRequests();
}, []);

async function handleStatusChange(requestId: string, newStatus: string) {
  // Update the UI immediately
  setRequests((prev) =>
    prev.map((r) => (r.id === requestId ? { ...r, status: newStatus } : r))
  );
  try {
    await updateStatus(requestId, newStatus);
  } catch (err) {
    alert("Failed to update");
    await loadRequests(); // revert by re-fetching if it failed
  }
}

async function handleAckUpload(requestId: string, file: File) {
  try {
    await uploadAcknowledgement(requestId, file);
    await loadRequests(); // refresh to show COMPLETED status
    alert("Acknowledgement uploaded");
  } catch (err) {
    alert(err instanceof Error ? err.message : "Upload failed");
  }
}
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
                  <select
  value={req.status}
  onChange={(e) => handleStatusChange(req.id, e.target.value)}
  className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-neutral-300 bg-white text-neutral-700 cursor-pointer"
>
  <option value="PENDING">PENDING</option>
  <option value="DOCUMENTS_RECEIVED">DOCUMENTS_RECEIVED</option>
  <option value="IN_PROGRESS">IN_PROGRESS</option>
  <option value="COMPLETED">COMPLETED</option>
</select>
                </div>
                {req.notes && <p className="text-sm text-neutral-600 mt-3">{req.notes}</p>}
                {req.documents && req.documents.length > 0 && (
  <div className="mt-3 flex flex-wrap gap-2">
    {req.documents.map((doc: any) => (
      <button
        key={doc.id}
        onClick={() => downloadDocument(doc.id, doc.fileName)}
        className="text-xs font-medium px-3 py-1.5 rounded-lg border border-neutral-300 text-neutral-700 hover:border-[#B8932E] hover:text-[#B8932E] transition-colors"
      >
        ↓ {doc.fileName}
      </button>
    ))}
  </div>
  
)}
<div className="mt-3 pt-3 border-t border-neutral-100">
                  <label className="text-xs font-medium text-neutral-600">
                    Upload acknowledgement:
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleAckUpload(req.id, file);
                      }}
                      className="block mt-1 text-xs text-neutral-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-[#B8932E] file:text-white file:font-medium file:cursor-pointer hover:file:bg-[#C9A94A]"
                    />
                  </label>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}