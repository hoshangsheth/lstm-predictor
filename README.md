# Neural Language Model — LSTM Next Word Predictor

> An interactive LSTM-based next word prediction system trained on Shakespeare's Hamlet, deployed as a full-stack AI web application.

<!-- Screenshots -->
<!-- ![Hero](docs/screenshot-hero.png) -->
<!-- ![Playground](docs/screenshot-playground.png) -->

---

## Overview

This project transforms a trained Keras LSTM model into a production-style AI demo application — demonstrating the full stack from NLP inference to deployed web product.

**Live Demo:** `https://your-app.vercel.app`  
**API Docs:** `https://your-api.onrender.com/docs`

---

## Architecture

```
┌─────────────────────────────────────────────┐
│             Next.js 15 Frontend              │
│  ┌──────────────┐  ┌────────────────────┐   │
│  │ Server Comps │  │  Client Components  │   │
│  │  (Static)    │  │ (Prediction UI)     │   │
│  └──────────────┘  └────────────────────┘   │
└─────────────────────────────────────────────┘
                      │ Axios HTTP
┌─────────────────────────────────────────────┐
│            FastAPI Backend (Render)          │
│  ┌──────────────────────────────────────┐   │
│  │          ModelService                 │   │
│  │  Tokenizer → LSTM → Temperature       │   │
│  │  Sampling → Softmax → Response        │   │
│  └──────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

### Why this architecture?

- **Server Components** for all static sections (hero, insights, engineering) — zero JS overhead
- **Client Components** only where interactivity is needed (prediction interface)
- **Model preloaded at startup** — no per-request reload
- **Tokenizer cached on disk** — built once, reused across restarts

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, TypeScript, TailwindCSS, Framer Motion |
| Backend | FastAPI, Python 3.11, TensorFlow 2.17 |
| Model | Keras LSTM (trained on Hamlet) |
| Frontend Deploy | Vercel |
| Backend Deploy | Render |

---

## Project Structure

```
lstm-predictor/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx       # Root layout, font loading
│   │   │   ├── page.tsx         # Main page (Server Component)
│   │   │   └── globals.css      # Design tokens, animations
│   │   ├── components/
│   │   │   ├── sections/
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── PredictionInterface.tsx  # "use client"
│   │   │   │   ├── ModelInsights.tsx
│   │   │   │   ├── EngineeringSection.tsx
│   │   │   │   ├── LimitationsSection.tsx
│   │   │   │   └── FooterSection.tsx
│   │   │   └── ui/
│   │   │       └── NavBar.tsx
│   │   ├── lib/
│   │   │   ├── api.ts           # Axios API client
│   │   │   └── utils.ts         # cn() helper
│   │   └── types/
│   │       └── index.ts         # TypeScript types
│   ├── package.json
│   ├── tailwind.config.js
│   ├── next.config.mjs
│   ├── tsconfig.json
│   ├── vercel.json
│   └── .env.example
│
└── backend/
    ├── app/
    │   ├── main.py              # FastAPI app + lifespan
    │   ├── model.py             # ModelService (load/predict/generate)
    │   ├── routes.py            # API endpoints
    │   └── schemas.py           # Pydantic models
    ├── artifacts/
    │   ├── lstm_model.keras     # Trained model
    │   ├── hamlet.txt           # Training corpus
    │   └── tokenizer.pkl        # Auto-generated on first run
    ├── requirements.txt
    ├── render.yaml
    └── .env.example
```

---

## Local Setup

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Place your model:
# artifacts/lstm_model.keras
# artifacts/hamlet.txt

uvicorn app.main:app --reload --port 8000
```

API available at: `http://localhost:8000`  
Swagger UI: `http://localhost:8000/docs`

### Frontend

```bash
cd frontend
npm install

# Create .env.local:
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

npm run dev
```

App at: `http://localhost:3000`

---

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Model status + vocab size |
| POST | `/predict` | Next word prediction |
| POST | `/generate` | Text continuation |
| GET | `/model-info` | Architecture details |

**POST /predict**
```json
{
  "text": "To be or not to be",
  "temperature": 1.0,
  "top_k": 5
}
```

**POST /generate**
```json
{
  "seed_text": "To be or not to be",
  "num_words": 10,
  "temperature": 0.8
}
```

---

## Deployment

See `DEPLOYMENT.md` for full step-by-step guide.

Quick summary:
1. Push `backend/` to GitHub
2. Create Render Web Service → connect repo → set build/start commands
3. Push `frontend/` to GitHub  
4. Import to Vercel → set `NEXT_PUBLIC_API_URL` env var

---

## Performance

- Lighthouse Score: 90+ (static sections fully server-rendered)
- FCP: < 1s (no blocking JS on initial load)
- Backend inference: ~50–200ms (CPU, Render free tier)
- Model preloaded at startup — no cold-path loading per request

---

## Future Roadmap

- [ ] GPT-2 fine-tuning migration
- [ ] Attention visualization layer
- [ ] RAG integration (LangChain + FAISS)
- [ ] Email subject line predictor
- [ ] ONNX export for faster inference
- [ ] Multi-dataset domain switching
- [ ] Personalized fine-tuning pipeline

---

## Engineering Decisions

**Why FastAPI over Flask?**  
Async-native, automatic OpenAPI docs, Pydantic validation, and production performance.

**Why Next.js App Router over Vite SPA?**  
Server Components eliminate hydration cost for static sections. Only the prediction interface ships client JS.

**Why tokenizer rebuilt from text (not saved)?**  
TensorFlow's `Tokenizer` doesn't have a standard cross-platform serialization format — pickle on the same Python version is the most reliable approach.

**Why temperature sampling over beam search?**  
Simpler to implement, more controllable via UI, and demonstrates the key concept of randomness in generation.

---

*Built as a GenAI Engineer portfolio project demonstrating NLP fundamentals, sequence modeling, and full-stack deployment.*
