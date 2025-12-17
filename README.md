# App Graph Builder (ReactFlow Canvas)

A responsive **App Graph Builder UI** developed as part of a **Frontend Intern take-home assignment**.  
The application allows users to select an app, visualize its service graph using ReactFlow, and inspect/configure nodes via an interactive side panel.

🔗 **Live Demo:** https://graph-canvas.vercel.app/

---

## 🚀 Features

- **Structured Layout**
  - Top navigation bar
  - Left sidebar navigation
  - Central ReactFlow canvas with dotted background
  - Right-side inspector panel

- **ReactFlow Canvas**
  - Render 3+ nodes and 2+ edges
  - Drag, select, zoom, and pan nodes
  - Delete selected node using `Delete / Backspace`
  - Fit view on initial load
  - Clean empty state when no app is selected

- **Node Inspector**
  - Status badge (Healthy / Degraded / Down)
  - Tab-based UI (Config & Runtime)
  - Editable node name field
  - Slider and numeric input synced bidirectionally
  - Updates persisted to node data

- **State Management (Zustand)**
  - Selected app ID
  - Selected node ID
  - Mobile panel open/close state
  - Active inspector tab

- **Data Fetching (TanStack Query)**
  - Mock APIs with simulated latency
  - App list and graph fetching
  - Loading and error handling
  - Cached responses

- **Responsive Design**
  - Right panel converts into a slide-over drawer on mobile screens

---
## 🛠 Tech Stack

- React + Vite
- TypeScript
- ReactFlow (xyflow)
- Zustand
- TanStack Query
- shadcn/ui
- Tailwind CSS

---

## 📦 Getting Started (Local Setup)

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Steps

```bash
https://github.com/anujashirahatti5-jpg/graph-canvas-buddy.git
cd app-graph-builder
npm install
npm run dev
## ⚠️ TypeScript Strict Mode Note

## ⚠️ TypeScript Strict Mode Note

In the initial project setup, certain TypeScript configuration files were not editable in the hosted development environment:

- tsconfig.json  
- tsconfig.app.json  
- package.json  

After exporting the project to GitHub, **TypeScript strict mode was enabled locally** by updating:

```json
{
  "compilerOptions": {
    "strict": true
  }
}

 ## 📁 Project Structure (High Level)
src/
├─ components/
│  ├─ AppSelector.tsx
│  ├─ NodeInspector.tsx
│  └─ Layout.tsx
├─ store/
│  └─ useAppStore.ts
├─ hooks/
│  └─ useAppsQuery.ts
├─ mocks/
│  └─ api.ts
├─ pages/
│  └─ AppGraph.tsx
└─ main.tsx
```

## 🎯 Key Engineering Decisions

- Zustand used for UI-level state management to avoid prop drilling
- TanStack Query used for async data fetching, caching, and error handling
- Mock APIs implemented using in-memory data with artificial delay
- ReactFlow isolated to canvas concerns for clean separation of logic
- shadcn/ui used for consistent, accessible UI components

---

## 📌 Known Limitations

- Mock APIs only (no backend persistence)
- Basic node types
- TypeScript strict mode requires local enablement after export

---

## 👩‍💻 Author

**Anuja Shirahatti**  
Frontend / ECE Student  
Interested in building scalable, interactive web applications using modern React tools.

