# Deployment Guide

Complete step-by-step instructions for deploying the LSTM Predictor to Render (backend) and Vercel (frontend).

---

## Part 1: Backend → Render

### Prerequisites
- GitHub account
- Render account (render.com) — free tier works
- `artifacts/lstm_model.keras` and `artifacts/hamlet.txt` committed to your repo

### Step 1: Prepare the repo

Ensure your `backend/` directory is pushed to GitHub with the model artifacts included.

> **Note:** `lstm_model.keras` is ~10MB — fine for GitHub. If larger, use Render's disk mount.

### Step 2: Create Render Web Service

1. Go to [render.com](https://render.com) → New → Web Service
2. Connect your GitHub repository
3. Set **Root Directory** to `backend`
4. Configure:
   - **Runtime:** Python 3
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Select **Free** instance tier
6. Click **Create Web Service**

### Step 3: Environment Variables

In Render dashboard → Environment:

```
PYTHON_VERSION=3.11.0
```

### Step 4: Wait for deployment

First deploy takes ~3–5 minutes. Watch logs for:
```
Loading model and tokenizer...
Model loaded successfully.
```

### Step 5: Test the API

```bash
curl https://your-api.onrender.com/health
# {"status":"ok","model_loaded":true,...}

curl -X POST https://your-api.onrender.com/predict \
  -H "Content-Type: application/json" \
  -d '{"text":"to be or not","temperature":1.0,"top_k":5}'
```

### Render Troubleshooting

| Error | Fix |
|-------|-----|
| `ModuleNotFoundError: tensorflow` | Check requirements.txt has `tensorflow==2.17.0` |
| `FileNotFoundError: lstm_model.keras` | Ensure artifacts/ folder is committed |
| Port binding error | Use `$PORT` env var in start command (already set) |
| Slow first request | Free tier sleeps after 15min inactivity — first request wakes it |
| Memory error | Upgrade to Starter ($7/mo) for 512MB RAM |

---

## Part 2: Frontend → Vercel

### Prerequisites
- Vercel account (vercel.com) — free tier works
- Render API URL from Part 1

### Step 1: Set environment variable in Vercel

Before or during import, add:
```
NEXT_PUBLIC_API_URL=https://your-api-name.onrender.com
```

### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repository
3. Set **Root Directory** to `frontend`
4. Framework preset: **Next.js** (auto-detected)
5. Add environment variable:
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://your-api-name.onrender.com`
6. Click **Deploy**

### Step 3: Configure CORS on backend

Once you have your Vercel URL, update `backend/app/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-app.vercel.app"],  # Replace wildcard
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Redeploy the backend after this change.

### Vercel Troubleshooting

| Error | Fix |
|-------|-----|
| `NEXT_PUBLIC_API_URL is undefined` | Set env var in Vercel dashboard → Settings → Environment Variables |
| CORS errors in browser | Update `allow_origins` on FastAPI backend |
| Build failure | Check Node version — Vercel uses Node 20 by default |
| API returns 503 | Render free tier sleeping — first request takes ~30s to wake |

---

## Part 3: Performance Optimization

### Backend
- Tokenizer is cached as `artifacts/tokenizer.pkl` after first build — subsequent restarts are fast
- Model loaded once at startup via `lifespan` context manager
- `model.predict(verbose=0)` suppresses TF logging per request
- numpy operations are in-memory — no disk I/O during inference

### Frontend
- All sections except `PredictionInterface` are Server Components — no JS hydration
- Fonts loaded with `display: swap` and `next/font/google` (self-hosted by Vercel)
- `Suspense` boundary wraps the Client Component with skeleton fallback
- TailwindCSS purges unused CSS at build time

---

## Environment Variables Reference

### Backend
```env
PORT=8000
```

### Frontend
```env
NEXT_PUBLIC_API_URL=https://your-api.onrender.com
```

---

## Common Issues

### "Model not yet loaded" (503)
The model takes a few seconds to load. The `/health` endpoint reports `model_loaded: false` until ready. Add a health check retry in production.

### Render free tier cold starts
Free Render services sleep after 15 minutes of inactivity. The first request after sleep takes ~30 seconds. Upgrade to Starter ($7/mo) or use UptimeRobot to ping `/health` every 10 minutes.

### TensorFlow version mismatch
The saved `lstm_model.keras` was trained with TF 2.x. Ensure `requirements.txt` pins the same major version. If you see layer errors, regenerate the model with the pinned version.
