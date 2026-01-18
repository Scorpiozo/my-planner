# 🔘 PLANNER CORE
### High-Fidelity Task Orchestration | [System Access](https://scorpiozo-todo-planner.vercel.app/)

![System Status](https://img.shields.io/badge/System_Status-Active-00FFC3?style=for-the-badge)
![UI Architecture](https://img.shields.io/badge/Architecture-Glassmorphism-white?style=for-the-badge)
![Deployment](https://img.shields.io/badge/Deployment-Live-00FFC3?style=for-the-badge)

**PLANNER CORE** is a high-performance productivity HUD (Heads-Up Display). It eliminates the friction of traditional task management by providing an immersive, glassmorphic environment where objectives are managed with zero latency and high visual precision.

---

### 🛡️ Core Engine (Vanilla JS)
The system operates on a zero-dependency architecture focused on algorithmic efficiency.

* **Heuristic Priority Sorting:** Implements a custom weight-based sort. **Urgent** objectives are automatically bubbled to the top of the stack, followed by a secondary reverse-chronological ID sort.
* **Contextual UX Logic:** Utilizes the CSS `:has()` parent-selector and dynamic DOM injection to provide intelligent guidance when a filtered category is empty, eliminating "Interface Dead-Ends."
* **Watchdog Protocol:** An automated 30-second monitoring loop that cross-references `ISO 8601` task metadata with the system clock to trigger real-time visual alerts and bell-ring animations.
* **Native OS Integration:** Leverages the Browser Notification API to deliver mission-critical pings directly to the OS environment.

---

### 🎨 HUD & Interface Engineering
The system is built for personalization via a modular theme engine and adaptive architecture.

* **Adaptive Layout Transformation:** Re-architects the navigation stack based on screen real estate, shifting from a Desktop sidebar to a Mobile bottom-docked dashboard using `dvh` (Dynamic Viewport Height) units.
* **Global Variable Injection:** Real-time CSS variable manipulation allows for a total system re-skin—from icon glows to ambient background orbs.
* **Glassmorphism UI:** Precision 1px borders with hardware-accelerated `backdrop-filter` layers for a premium hardware feel.

---

### 💾 Local-First Persistence
* **Zero-Latency Data:** No database round-trips. Objectives are stored in client-side `localStorage` via JSON serialization for instant access and total user privacy.

---

## 💎 Design Philosophy
PLANNER CORE is built on three pillars of interface engineering:
1. **Visual Depth:** Utilizing multi-layered transparency to create a structured, non-intrusive workspace.
2. **Atmospheric Feedback:** A dual-tone background engine provides ambient glow syncing with the system theme.
3. **Tactile Response:** Every interaction—from a task completion to a theme shift—is met with subtle CSS transitions to reinforce system feedback.

---

## ⚡ Technical Specifications

| Module | Protocol | Description |
| :--- | :--- | :--- |
| **Logic Engine** | ES6+ Vanilla JS | Object-Oriented state management and DOM reconciliation. |
| **Priority Sort** | Heuristic Algorithm | Weight-based bubbling (`Urgent` > `Standard`). |
| **Interface** | HTML5 / CSS3 | Advanced Flexbox & `:has()` parent selectors. |
| **Persistence** | LocalStorage API | Zero-latency JSON serialization for offline-first data. |
| **Monitoring** | Watchdog Timer | Background polling for temporal task accuracy. |

---

## 🚀 Deployment & Operation

No installation or environment configuration required.

1. **Direct Access:** [scorpiozo-todo-planner.vercel.app/](https://scorpiozo-todo-planner.vercel.app/)
2. **Local Execution:**
   ```bash
   git clone [https://github.com/scorpiozo/my-planner.git](https://github.com/scorpiozo/my-planner.git)
   cd my-planner
   # Open index.html via Live Server for full Notification API support

---

## 📜 Professional Standard
> "The interface is the environment. The environment dictates the output."

**PLANNER CORE** represents a shift from "software as a tool" to "software as a workspace." Designed with intent, coded with precision.

---
Created by a well wisher
