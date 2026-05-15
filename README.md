# OneTool — The Ultimate AI-Powered Productivity Ecosystem

OneTool is a billion-dollar startup-level SaaS ecosystem designed to replace dozens of utility websites and apps. It provides AI tools, file tools, creator tools, and business tools in a single, premium, high-performance platform.

## 🚀 Key Features

- **200+ Productivity Tools**: PDF, Image, Video, Audio, Developer, and Business tools.
- **AI-Native Experience**: Integrated GPT-4, Claude, Stable Diffusion, and Whisper AI.
- **Cross-Platform**: Web (Next.js 15), Mobile (iOS & Android via Expo).
- **Enterprise-Ready**: Team workspaces, RBAC, API Marketplace, and advanced analytics.
- **Premium Design**: "Glass White" and "Midnight AI" dual-theme design system.

## 🛠 Tech Stack

### Web Frontend
- **Framework**: Next.js 15 (App Router)
- **Styling**: TailwindCSS, ShadCN UI, Framer Motion
- **State**: Zustand, React Query
- **Auth**: Clerk

### Mobile
- **Framework**: React Native Expo
- **Router**: Expo Router
- **Design**: Shared design system tokens

### Backend
- **Framework**: NestJS (Microservices Ready)
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Cache**: Redis
- **Queue**: BullMQ

## 📁 Project Structure

```
onetool/
├── app/                  # Next.js 15 Web Application
│   ├── src/app/          # App Router (Pages & API)
│   ├── src/components/   # Design System & UI Components
│   └── prisma/           # Database Schema
├── mobile/               # React Native Expo Mobile App (Initializing...)
└── infrastructure/       # Docker & K8s Configs
```

## 🚥 Getting Started

### 1. Prerequisites
- Node.js 18+
- PostgreSQL
- Redis (Optional for local dev)

### 2. Installation
```bash
git clone https://github.com/your-username/onetool.git
cd onetool
cd app && npm install
cd ../mobile && npm install
```

### 3. Environment Setup
Copy `.env.example` to `.env` in the `app` directory and fill in the keys:
- Clerk API Keys
- Database URL
- Stripe API Keys

### 4. Database Setup
```bash
cd app
npx prisma db push
```

### 5. Run the Project
**Web**:
```bash
cd app
npm run dev
```

**Mobile**:
```bash
cd mobile
npx expo start
```

## 🏗 System Architecture
See the detailed [Architecture Blueprint](./artifacts/onetool_architecture.md) for microservices design, database ER diagrams, and scaling strategies.

## 📈 Roadmap
- [x] Phase 1: Foundation & Design System
- [x] Phase 2: Core Tools & Auth Integration
- [ ] Phase 3: AI Processing Pipelines
- [ ] Phase 4: Mobile App Features
- [ ] Phase 5: Team Collaboration & Enterprise Features

---

Built by **Antigravity** — The Elite-Level AI Coding Assistant.
