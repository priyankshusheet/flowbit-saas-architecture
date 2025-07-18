
# 🏢 Multi-Tenant SaaS App — Flowbit Technical Challenge

This project is a complete multi-tenant SaaS application that includes:

- 🔐 Authentication & RBAC with JWT
- 🏢 Strict Tenant Data Isolation
- 🧩 Microfrontend Architecture via Webpack Module Federation
- 🔁 n8n Workflow Engine Integration
- 🐳 Fully Containerized with Docker Compose

---

## 🧠 Architecture Overview

```

┌─────────────┐   ┌──────────────────┐   ┌────────────────┐
│ React Shell │ → │ SupportTicketsApp│ → │ Other MFEs     │
│ (3000)      │   │ (3001)           │   │                │
└────┬────────┘   └──────────────────┘   └────────────────┘
│
▼
┌────────────────────────┐
│      Node.js API       │
│       (5000)           │
└────────┬───────────────┘
▼
┌──────────────┐   ┌─────────────┐
│   MongoDB    │   │    n8n      │
│   (27017)    │   │   (5678)    │
└──────────────┘   └────┬────────┘
▼
┌────────────┐
│   ngrok    │
│  (4040)    │
└────────────┘

````

---

## 🚀 Quick Start Guide

### 🛠️ Prerequisites
- [Node.js](https://nodejs.org/) v18+
- [Docker & Docker Compose](https://docs.docker.com/get-docker/)
- Optional: `ngrok` for webhook tunneling

### ⚙️ 1. Clone & Setup
```bash
git clone https://github.com/your-username/flowbit-challenge.git
cd flowbit-challenge
````

### 🐳 2. Start All Containers

```bash
docker-compose up --build
```

Wait for \~30 seconds. You can watch logs via:

```bash
docker-compose logs -f
```

### 🌱 3. Seed Users

```bash
# Inside api/scripts/seed.js (run only once)
node api/scripts/seed.js
```

---

## 🔑 Demo Credentials

### 🏢 LogisticsCo

* Admin: `admin@logisticsco.com` / `admin123`
* User: `user@logisticsco.com` / `user123`

### 🛒 RetailGmbH

* Admin: `admin@retailgmbh.com` / `admin123`
* User: `user@retailgmbh.com` / `user123`

---

## 📁 Project Structure

```
flowbit-challenge/
├── api/                 # Backend (Node.js + Express)
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── registry.json
│   └── server.js
│
├── react-shell/         # Main React App (host)
│   ├── src/
│   ├── webpack.config.js
│   └── package.json
│
├── support-tickets-app/ # Microfrontend (remote)
│   ├── src/
│   ├── webpack.config.js
│   └── package.json
│
├── docker-compose.yml
├── README.md
└── .env
```

---

## ⚙️ API Overview

### Auth

* `POST /auth/login` – Login with email/password
* `GET /me` – Get current user
* `GET /me/screens` – Get tenant-specific screens (from `registry.json`)

### Tickets (Tenant-aware)

* `GET /api/tickets` – Get tickets for tenant
* `POST /api/tickets` – Create ticket → Triggers n8n
* `POST /webhook/ticket-done` – Callback from n8n to update ticket

---

## 🧩 Microfrontend Setup

### React Shell (`react-shell`)

* Auth + Navigation Sidebar
* Loads MFEs dynamically via `ModuleFederationPlugin`

```js
// webpack.config.js in shell
remotes: {
  supportMfe: 'supportMfe@http://localhost:3001/remoteEntry.js'
}
```

### Support Tickets App (`support-tickets-app`)

* Remote MFE
* Exposes: `./SupportTicketsApp`

```js
// webpack.config.js in support MFE
exposes: {
  './SupportTicketsApp': './src/SupportTicketsApp'
}
```

---

## 🔁 n8n Workflow Integration

* Ticket creation triggers a workflow via HTTP node
* n8n calls `/webhook/ticket-done` with a secret
* Backend verifies, updates status in Mongo
* React polls (or WebSocket) for status update

---

## 🧪 Testing

### ✅ Unit Test for Data Isolation

* Run `npm test` inside `api/`
* Confirms Admin A can't read Admin B’s data

---

## 📦 Tech Stack

| Layer    | Tech                            |
| -------- | ------------------------------- |
| Frontend | React + Webpack MFE + Tailwind  |
| Backend  | Node.js + Express + JWT + Mongo |
| Workflow | [n8n.io](https://n8n.io)        |
| Database | MongoDB                         |
| DevOps   | Docker, Docker Compose          |

---

## 🔐 Security Features

* JWT Auth with tenant & role info
* Role-based route restriction (`/admin/*`)
* Webhook secret validation
* `customerId` added to every DB doc

---

## ✅ Requirements Coverage

| Feature                            | Status |
| ---------------------------------- | ------ |
| Auth & RBAC                        | ✅      |
| Tenant Data Isolation              | ✅      |
| Registry-based MFE Routing         | ✅      |
| Dynamic MFE Loading via Webpack    | ✅      |
| n8n Workflow Round-trip            | ✅      |
| Containerized Environment          | ✅      |
| Unit Test for Data Isolation       | ✅      |
| README + Architecture + Demo Video | ✅      |

---

## 🆘 Troubleshooting

| Problem                  | Solution                                   |
| ------------------------ | ------------------------------------------ |
| Port already in use      | Change in `docker-compose.yml`             |
| n8n not triggering       | Ensure ngrok is forwarding properly        |
| MFE not loading          | Check remote URL, module name in shell     |
| Token missing or invalid | Check `.env` for `JWT_SECRET` and re-login |

---

## 👨‍💻 Author

**Priyankshu Sheet**
[LinkedIn](https://www.linkedin.com/in/priyankshusheet) | [GitHub](https://github.com/priyankshusheet)
Email: [priyankshu.sheet123@gmail.com](mailto:priyankshu.sheet123@gmail.com)

---

**🚀 Built with love for Flowbit — July 2025**

```

---

Let me know if you’d like me to:
- Customize this for FastAPI (if you're using Python, though right now you're on Node)
- Add visuals or badges (e.g. Docker, MongoDB, etc.)
- Auto-generate a diagram for `README.md`

You're 99% done. Time to shine on that demo video 🌟
```
