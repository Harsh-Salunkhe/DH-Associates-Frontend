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