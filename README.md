# Kisan Alert 360°

**A multilingual AI farm companion that protects small farmers' crops and connects them to livelihood support.**

Team **CodeXTech** · Theme: Rural Development & Livelihoods
Live prototype: https://kisan-app-eight.vercel.app

---

## The problem

In Odisha, paddy is the staple crop and most farmers are small or marginal (about 86% of Indian farmers; average holding about 1.08 ha). One pest outbreak, flood or dry spell can wipe out a household's whole season. Advice is usually English-only or text-heavy, warnings arrive late, scheme benefits are missed, and farmers without smartphones are left out.

## What Kisan Alert 360° does

One voice-first app, in **Odia, Hindi and English**, that combines what most tools do separately:

| Module | What it gives the farmer |
|---|---|
| **Voice Assistant** | Ask farming questions by voice or text and hear the answer in Odia, Hindi or English (Gemini + browser speech) |
| **Water Budget Planner** | Irrigation planning to use water more efficiently |
| **Community Intelligence** | Neighbours share pest/flood/disease alerts so others can act early |
| **Schemes Portal** | Local-language guidance on PM-KISAN, PMFBY, Kisan Credit Card, etc. Applications stay on the official portals |
| **Analytics** | Simple farm risk and activity insight |
| **Crop-leaf analysis** | Photo-based disease suggestion via Gemini Vision, with a confidence indicator |

**Planned (not in this prototype):** Kisan Mitra village agents for farmers without smartphones, offline-first mode, SMS/IVR alerts, multiple-report verification and local moderation of community alerts.

> **Prototype notice.** Sensor readings, community alerts and scheme records in the demo are **simulated** (see `sample-data/`). AI suggestions can be wrong. Confirm important decisions, especially pesticide use, with a qualified agriculture expert or your local Krishi Vigyan Kendra (KVK).

## Tech stack

- **Frontend:** React + TypeScript (Vite)
- **AI:** Google Gemini / Gemini Vision
- **Data & auth:** Firebase Authentication + Firestore
- **Backend:** Node.js / Express (deployed on Cloud Run); frontend on Vercel
- **Location:** Google Maps Platform
- **Voice:** Browser Web Speech APIs (recognition and synthesis; support varies by browser and language)

Architecture and data flow: [`docs/TECHNICAL_DESIGN.md`](docs/TECHNICAL_DESIGN.md)

## Getting started

### Prerequisites
- Node.js 20 or newer and npm
- A Gemini API key, a Firebase project (Auth + Firestore) and a Google Maps Platform key

### Install and run
```bash
git clone https://github.com/Sumit-Kumar-Panigrahi/Kisan-Alert-360.git
cd Kisan-Alert-360
npm install
cp .env.example .env      # then fill in your own keys
npm run dev
```
Open the URL printed by Vite (usually http://localhost:5173). Restart the dev server after changing `.env`.

### Other commands
```bash
npm run build     # production build
npm run preview   # serve the production build locally
npm run lint      # lint
npm test          # automated tests (see docs/SAMPLE_DATA_AND_TESTS.md)
```

### Environment variables

Copy `.env.example` to `.env`. **Never commit `.env`.**

| Variable | Used for |
|---|---|
| `VITE_GEMINI_API_KEY` | Voice Assistant and crop-leaf analysis (Gemini) |
| `VITE_FIREBASE_API_KEY` | Firebase web config |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth |
| `VITE_FIREBASE_PROJECT_ID` | Firestore |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase web config |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase web config |
| `VITE_FIREBASE_APP_ID` | Firebase web config |
| `VITE_GOOGLE_MAPS_API_KEY` | Maps / location features |

Variables starting with `VITE_` are bundled into the browser build and are visible to users. Restrict each key by HTTP referrer and set quotas in its provider console, and route Gemini calls through the backend for production use.

## Sample data and tests

- Simulated data used by the demo: [`sample-data/`](sample-data/)
- Test plan, automated data checks and results table: [`docs/SAMPLE_DATA_AND_TESTS.md`](docs/SAMPLE_DATA_AND_TESTS.md)

## Impact and measurement

No impact figures are claimed yet. A planned pilot (2 villages in Odisha, about 50 farmers, one Kharif paddy season, with FPO / SHG / KVK partners) will measure water use per acre, crop loss, response time, scheme uptake, adoption and income change.

Supported SDGs: 1 No Poverty · 2 Zero Hunger · 5 Gender Equality · 6 Clean Water and Sanitation · 8 Decent Work and Economic Growth.

## Privacy

The design uses minimal, consent-based data collection, aligned with the Digital Personal Data Protection Act, 2023. Do not put real farmer data in test records or screenshots.

## AI assistance disclosure

The prototype was built with the help of Google Antigravity (AI-assisted IDE); in-product AI uses the Gemini API. Estimated AI assistance is about 60% of the code. All output was reviewed by the team.

## Team

| Name | Role |
|---|---|
| Sumit Kumar Panigrahi | Full Stack Developer, Team Leader |
| Siriparapu Ritesh Kumar | Business Architect |
| Supriya Panda | UI/UX Designer |

GIFT Autonomous, Bhubaneswar.

## References

Agriculture Census 2015-16 (Govt. of India); Odisha Agriculture Statistics 2015-16; FAO on crop losses to pests and diseases; official scheme portals (pmkisan.gov.in, pmfby.gov.in); Digital Personal Data Protection Act, 2023.

## License

Released under the MIT License. See [`LICENSE`](LICENSE).
