# 🌌 KhanBassim: Cinematic Portfolio & AI Core
> **v5.8 — "Furious" Design System**

Official high-fidelity portfolio and strategic execution showcase for **Baasim Fayaz Khan (Khan Basim)**. This project represents a fusion of cinematic web design and cutting-edge conversational AI.

![Cinematic Banner](https://img.shields.io/badge/Design-Ultra--Dark-black?style=for-the-badge)
![AI Powered](https://img.shields.io/badge/AI-Khan--Logic-blueviolet?style=for-the-badge)
![Status](https://img.shields.io/badge/Build-Passing-success?style=for-the-badge)

---

## 🎭 The Cinematic Experience

The portfolio is built on the **"Furious" Design System**, prioritizing high-contrast aesthetics, glassmorphism interaction layers, and fluid motion.

- **Immersive Hero Engine**: A custom video-driven landing system with synchronized ambient audio and typewriter execution logs.
- **SPA Fluidity**: Zero-latency routing via `main-v5.js`, utilizing the View Transitions API for seamless context swaps without full-page reloads.
- **Mesh Gradient Architecture**: Deeply layered backgrounds with dynamic blur filters for a premium "Apple-esque" feel.

## 🤖 Khan AI: Voice & Vision

At the heart of the portfolio is the **Khan AI System**, a sophisticated conversational engine.

- **Go Live (Voice Mode)**: Real-time, ultra-low latency voice interaction with neutral natural voices and vision-capable reasoning.
- **Session Intelligence**: Automatic handoff between voice and text modes, maintaining full conversational state and transcript context.
- **DeepThink Reasoning**: An optional engineering-mode that exposes the AI's internal thought processes for complex problem-solving.
- **BaasimDB (IndexedDB)**: A robust local-first storage solution for secure, persistent conversation history and user sessions.

## 🛠️ Technical Stack

| Layer | Technology |
| :--- | :--- |
| **Core** | Vanilla HTML5 / Modern JavaScript (ES6+) |
| **Styling** | Custom Glassmorphism CSS System |
| **AI Backend** | Groq Llama-3 (70b-versatile & Vision) |
| **Storage** | IndexedDB (BaasimDB) & LocalStorage |
| **Icons** | Lucide Vector Library |
| **Deployment** | Netlify Functions (Serverless Chat Proxy) |

## 🚀 Local Development

To run the full stack including Netlify Functions:

```bash
# Install Netlify CLI
npm install netlify-cli -g

# Start dev server
netlify dev
```

For a static-only preview:
```bash
python -m http.server 8080
```

---

## 🛡️ Maintenance & Operations

- **Cache Purging**: Append `?clear=true` to any URL to force-wipe the internal state and refresh the codebase.
- **Maintenance Logs**: Managed via `AGENTS.md` for automated development guidance.

---
*Created with passion by the Khan AI Engineering Team.*
