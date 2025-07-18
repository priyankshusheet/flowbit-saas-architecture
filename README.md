Here is the **improved and polished version of your README.md**, with enhanced formatting, clarity, structure, and emphasis on professional tone, while preserving your content:

---

# 🏢 Multi-Tenant SaaS App – Flowbit Technical Challenge

A full-stack multi-tenant SaaS platform designed for the Flowbit technical challenge, showcasing:

* 🔐 **Authentication & Role-Based Access Control** (JWT + Bcrypt)
* 🏢 **Strict Tenant Data Isolation**
* 🧩 **Microfrontend Architecture** using Webpack Module Federation
* 🔁 **n8n Workflow Engine Integration**
* 🐳 **Containerized Deployment** via Docker Compose

---

## 🧠 Architecture Overview

```
┌─────────────┐   ┌──────────────────┐   ┌────────────────┐
│ React Shell │ → │ SupportTicketsApp│ → │ Other MFEs     │
│   (3000)    │   │    (3001)        │   │    (future)    │
└────┬────────┘   └──────────────────┘   └────────────────┘
     │
     ▼
┌────────────────────────┐
│       Node.js API      │
│        (5000)          │
└────────┬───────────────┘
         ▼
┌──────────────┐     ┌─────────────┐
│   MongoDB    │     │     n8n     │
│   (27017)    │     │   (5678)    │
└──────────────┘     └────┬────────┘
                          ▼
                   ┌────────────┐
                   │   ngrok    │
                   │  (4040)    │
                   └────────────┘
```

---

## 🚀 Quick Start

### 🛠️ Prerequisites

* [Node.js v18+](https://nodejs.org/)
* [Docker & Docker Compose](https://docs.docker.com/get-docker/)
* (Optional) [ngrok](https://ngrok.com/) – for webhook testing

---

### ⚙️ Step 1: Clone & Setup

```bash
git clone https://github.com/priyankshusheet/flowbit-saas-architecture.git
cd flowbit-saas-architecture
```

---

### 🐳 Step 2: Start All Containers

```bash
docker-compose up --build
```

> Wait \~30 seconds for all services to initialize.

Check logs:

```bash
docker-compose logs -f
```

---

### 🌱 Step 3: Seed Initial Users

```bash
# One-time seed script
node api/scripts/seed.js
```

---

## 🔑 Demo Credentials

### 🏢 LogisticsCo

* **Admin:** `admin@logisticsco.com` / `admin123`
* **User:** `user@logisticsco.com` / `user123`

### 🛒 RetailGmbH

* **Admin:** `admin@retailgmbh.com` / `admin123`
* **User:** `user@retailgmbh.com` / `user123`

---

## 📁 Project Structure

```
flowbit-saas-architecture/
├── api/                      # Node.js backend
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── registry.json
│   └── server.js
│
├── react-shell/              # Main React app (host)
│   ├── src/
│   ├── webpack.config.js
│   └── package.json
│
├── support-tickets-app/      # Microfrontend (remote)
│   ├── src/
│   ├── webpack.config.js
│   └── package.json
│
├── docker-compose.yml        # Service orchestration
├── .env                      # Secrets & config
└── README.md
```

---

## ⚙️ API Overview

### 🧾 Authentication

* `POST /auth/login` – User login
* `GET /me` – Get current user
* `GET /me/screens` – Get screens based on tenant

### 🎟️ Ticket System (Multi-Tenant Aware)

* `GET /api/tickets` – List tickets (by tenant)
* `POST /api/tickets` – Create a new ticket → triggers n8n
* `POST /webhook/ticket-done` – Webhook from n8n → update ticket

---

## 🧩 Microfrontend Setup

### React Shell (`react-shell`)

* Handles login, navigation
* Loads MFEs using Module Federation

```js
// webpack.config.js (Shell)
remotes: {
  supportMfe: 'supportMfe@http://localhost:3001/remoteEntry.js',
}
```

---

### SupportTicketsApp (`support-tickets-app`)

* Microfrontend that handles support ticket UI
* Exposes `./SupportTicketsApp`

```js
// webpack.config.js (MFE)
exposes: {
  './SupportTicketsApp': './src/SupportTicketsApp',
}
```

---

## 🔁 Workflow Integration – n8n

1. Ticket created via POST `/api/tickets`
2. Backend sends webhook to n8n
3. n8n processes ticket (delay, priority check, etc.)
4. n8n calls `/webhook/ticket-done` with `X-Webhook-Secret`
5. Backend validates, updates Mongo
6. Frontend polls or listens for status update

---

## ✅ Unit Testing

* Run tests to verify tenant isolation logic

```bash
cd api/
npm test
```

✅ Ensures Admin A cannot access Admin B’s data.

---

## 🛠️ Tech Stack

| Layer    | Stack                                          |
| -------- | ---------------------------------------------- |
| Frontend | React, Tailwind CSS, Webpack Module Federation |
| Backend  | Node.js, Express, MongoDB, JWT                 |
| Workflow | [n8n](https://n8n.io/)                         |
| DevOps   | Docker, Docker Compose, ngrok                  |
| Testing  | Jest, Custom Middleware                        |

---

## 🔐 Security Highlights

* JWT with embedded `customerId` & `role`
* Role-based access: Admin vs User
* Route protection via middleware
* All data tagged by tenant
* Webhook secret header validation

---

## ✅ Feature Checklist

| Requirement                       | Status |
| --------------------------------- | ------ |
| ✅ Authentication + RBAC           | ✅      |
| ✅ Tenant Data Isolation           | ✅      |
| ✅ Microfrontend Routing           | ✅      |
| ✅ Webpack Module Federation       | ✅      |
| ✅ n8n Round-trip Integration      | ✅      |
| ✅ Webhook Verification            | ✅      |
| ✅ Unit Test: Tenant Isolation     | ✅      |
| ✅ Docker + Compose + Setup Script | ✅      |
| ✅ Architecture Diagram + Docs     | ✅      |

---

## 🆘 Troubleshooting

| Problem                | Solution                                |
| ---------------------- | --------------------------------------- |
| Port already in use    | Update `docker-compose.yml`             |
| MFE not loading        | Check remoteEntry.js path & port        |
| Webhook not received   | Ensure ngrok is running & forwarding    |
| Token missing/invalid  | Re-login or check JWT\_SECRET in `.env` |
| Mongo connection error | Confirm Mongo container is running      |

---

## 🙋‍♂️ Author

**Priyankshu Sheet**
📬 [priyankshu.sheet123@gmail.com](mailto:priyankshu.sheet123@gmail.com)
🔗 [LinkedIn](https://www.linkedin.com/in/priyankshusheet)
💻 [GitHub](https://github.com/priyankshusheet)

---

## 🏁 Final Note

This is a fully working multi-tenant SaaS app built for Flowbit’s technical challenge, featuring modular microfrontend architecture, secure APIs, tenant-specific UI, and n8n integration – all packed in a Dockerized environment with seamless dev experience.

---

**🚀 Built with love for Flowbit – July 2025**
**🎬 Demo video submitted as part of final deliverables**

---
