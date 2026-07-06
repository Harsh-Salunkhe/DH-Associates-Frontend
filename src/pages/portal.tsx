import { useState, useEffect } from "react";
import { getMyRequests, downloadAcknowledgement, createRequest, uploadDocument } from "../lib/api";
export default function Portal() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
const [actName, setActName] = useState("");
const [notes, setNotes] = useState("");
const [submitting, setSubmitting] = useState(false);
  async function loadRequests() {
    try {
      const data = await getMyRequests();
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

  async function handleCreate() {
  if (!title.trim()) {
    alert("Please enter a title for your request");
    return;
  }
  setSubmitting(true);
  try {
    await createRequest(title, actName, notes);
    // Clear the form
    setTitle("");
    setActName("");
    setNotes("");
    await loadRequests(); // refresh to show the new request
  } catch (err) {
    alert(err instanceof Error ? err.message : "Failed to create request");
  } finally {
    setSubmitting(false);
  }
}

async function handleDocUpload(requestId: string, file: File) {
  try {
    await uploadDocument(requestId, file);
    await loadRequests(); // refresh to show the new document
    alert("Document uploaded");
  } catch (err) {
    alert(err instanceof Error ? err.message : "Upload failed");
  }
}

  return (
    <div className="min-h-screen bg-[#FAF9F6] p-12">
      <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Client Portal</h1>
      <p className="text-neutral-600 mb-8">Your compliance requests</p>
      <div className="bg-white rounded-xl border border-neutral-200 p-6 mb-8">
  <h2 className="font-bold text-[#1A1A1A] mb-4">New Request</h2>

  <div className="mb-3">
    <label className="block text-sm font-semibold text-neutral-700 mb-1">
      Title <span className="text-red-500">*</span>
    </label>
    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="e.g. ESI Registration help"
      className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-sm focus:outline-none focus:border-[#B8932E]"
    />
  </div>

  <div className="mb-3">
    <label className="block text-sm font-semibold text-neutral-700 mb-1">
      Act / Service (optional)
    </label>
    <input
      type="text"
      value={actName}
      onChange={(e) => setActName(e.target.value)}
      placeholder="e.g. Employees' State Insurance Act, 1948"
      className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-sm focus:outline-none focus:border-[#B8932E]"
    />
  </div>

  <div className="mb-4">
    <label className="block text-sm font-semibold text-neutral-700 mb-1">
      Details (optional)
    </label>
    <textarea
      value={notes}
      onChange={(e) => setNotes(e.target.value)}
      placeholder="Describe what you need help with..."
      rows={3}
      className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-sm focus:outline-none focus:border-[#B8932E]"
    />
  </div>

  <button
    onClick={handleCreate}
    disabled={submitting}
    className="px-5 py-2.5 rounded-lg bg-[#B8932E] text-white font-semibold text-sm hover:bg-[#C9A94A] transition-colors disabled:opacity-60"
  >
    {submitting ? "Creating..." : "Submit Request"}
  </button>
</div>
      {loading && <p className="text-neutral-500">Loading your requests...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="space-y-3">
          {requests.length === 0 ? (
            <p className="text-neutral-500">
              You have no requests yet. Create one to get started.
            </p>
          ) : (
            requests.map((req) => (
              <div key={req.id} className="bg-white rounded-xl border border-neutral-200 p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-[#1A1A1A]">{req.title}</h3>
                    <p className="text-sm text-neutral-500 mt-1">
                      {req.actName || "General request"}
                    </p>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#F7F1E1] text-[#B8932E]">
                    {req.status}
                  </span>
                </div>

                {req.notes && <p className="text-sm text-neutral-600 mt-3">{req.notes}</p>}

                <p className="text-xs text-neutral-400 mt-2">
                  {req.documents?.length || 0} document(s) uploaded
                </p>
                <div className="mt-3">
  <label className="text-xs font-medium text-neutral-600">
    Upload a document:
    <input
      type="file"
      accept=".pdf,.jpg,.jpeg,.png"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) handleDocUpload(req.id, file);
      }}
      className="block mt-1 text-xs text-neutral-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-neutral-800 file:text-white file:font-medium file:cursor-pointer hover:file:bg-neutral-700"
    />
  </label>
</div>
                {/* Acknowledgement download — only when it exists */}
                {req.acknowledgement && (
                  <div className="mt-3 pt-3 border-t border-neutral-100">
                    <button
                     onClick={() => downloadAcknowledgement(req.id, req.acknowledgement.fileName)}
                      className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#B8932E] text-white hover:bg-[#C9A94A] transition-colors"
                    >
                      ↓ Download Acknowledgement
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}