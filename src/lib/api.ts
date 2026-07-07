const API_BASE = "http://localhost:4000/api";

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Login failed");
  }

  return res.json();
}

// Helper: get auth headers with the stored token
function authHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// Staff: get all service requests
export async function getServiceRequests() {
  const res = await fetch(`${API_BASE}/service-requests`, {
    headers: authHeaders(),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to load requests");
  }

  return res.json();
}

// Download a document (returns a blob we can save)
export async function downloadDocument(docId: string, fileName: string) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE}/service-requests/documents/${docId}/download`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error("Failed to download document");
  }

  // Turn the response into a downloadable file
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}

// Update a request's status
export async function updateStatus(requestId: string, status: string) {
  const res = await fetch(`${API_BASE}/service-requests/${requestId}/status`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to update status");
  }

  return res.json();
}

// Upload an acknowledgement file to a request
export async function uploadAcknowledgement(requestId: string, file: File, referenceNo?: string) {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("file", file);
  if (referenceNo) formData.append("referenceNo", referenceNo);

  const res = await fetch(`${API_BASE}/service-requests/${requestId}/acknowledgement`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` }, // NOTE: no Content-Type here
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to upload acknowledgement");
  }

  return res.json();
}

// Client: get my own requests
export async function getMyRequests() {
  const res = await fetch(`${API_BASE}/service-requests/mine`, {
    headers: authHeaders(),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to load your requests");
  }

  return res.json();
}

// Client: download the acknowledgement for a request
export async function downloadAcknowledgement(requestId: string, fileName: string) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE}/service-requests/${requestId}/acknowledgement/download`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to download acknowledgement");

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}

// Client: create a new service request
export async function createRequest(title: string, actName: string, notes: string) {
  const res = await fetch(`${API_BASE}/service-requests`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ title, actName, notes }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to create request");
  }

  return res.json();
}

// Client: upload a document to one of their requests
export async function uploadDocument(requestId: string, file: File) {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/service-requests/${requestId}/documents`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` }, // no Content-Type — browser sets it for FormData
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to upload document");
  }

  return res.json();
}

// Log out: clear stored auth and return to login
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
}