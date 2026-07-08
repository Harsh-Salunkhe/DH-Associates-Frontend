# DH Associates — Frontend

React frontend for **DH Associates**, a full-stack statutory-compliance and HR consultancy platform built for a real business. This repository contains the client-facing web application — the login flow, staff dashboard, and client portal.

> **Backend repository:** [DH-Associates](https://github.com/Harsh-Salunkhe/DH-Associates) — the Express/TypeScript API this app consumes.

---

## Overview

DH Associates is a two-sided platform for a statutory-compliance consultancy. This frontend provides two role-specific interfaces behind a single login:

- **Client Portal** — clients submit compliance requests, upload their documents, track request status, and download the acknowledgement once the firm completes the work.
- **Staff Dashboard** — admins and employees view all incoming requests, download client documents, advance request status, and deliver acknowledgements.

Which interface a user sees is determined by their role, returned by the backend at login.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React |
| Build tool | Vite |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Routing | React Router |
| Auth | JWT (stored client-side) |

---

## Key Features

- **JWT-based login** with role-based redirect — staff land on the dashboard, clients on their portal.
- **Protected, role-gated routes**: unauthenticated visitors are redirected to login, and users can't access interfaces meant for other roles.
- **Authenticated data fetching** — every request sends the stored token; the app handles loading, error, and empty states.
- **Secure file upload & download** — clients upload documents and download acknowledgements; staff download documents and deliver acknowledgements, all via authenticated requests.
- **Optimistic UI updates** for a responsive feel (e.g. instant status changes with re-fetch fallback on failure).
- **Session management** — logout clears stored credentials and returns to login.

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- The [DH Associates backend](https://github.com/Harsh-Salunkhe/DH-Associates) running locally

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/Harsh-Salunkhe/DH-Associates-Frontend.git
cd DH-Associates-Frontend

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

The app runs on `http://localhost:5173` and expects the backend at `http://localhost:4000`.

---

## Application Flow

1. A user logs in; the backend returns a JWT and their role.
2. The token is stored client-side and attached to all subsequent requests.
3. The user is routed to the interface for their role (staff → dashboard, client → portal).
4. **Client:** create a request → upload documents → download acknowledgement when ready.
5. **Staff:** review requests → download documents → advance status → upload acknowledgement (which completes the request).

---

## Project Status

**In active development.** The core consultancy workflow — login, role-based portals, document upload/download, and acknowledgement delivery — is complete and functional. Planned enhancements include a self-service (DIY) compliance path, payment integration, and public act-information pages.

---

## Author

**Harsh Salunkhe**
[GitHub](https://github.com/Harsh-Salunkhe) · [LinkedIn](https://linkedin.com/in/harsh-salunkhe-136638337)
