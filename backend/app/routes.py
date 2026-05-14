import time
from fastapi import APIRouter, Request, HTTPException
from app.schemas import (
    PredictRequest, PredictResponse,
    GenerateRequest, GenerateResponse,
    HealthResponse, ModelInfoResponse,
)

router = APIRouter()


def get_service(request: Request):
    svc = request.app.state.model_service
    if not svc._loaded:
        raise HTTPException(status_code=503, detail="Model not yet loaded.")
    return svc


@router.get("/health", response_model=HealthResponse)
def health(request: Request):
    svc = request.app.state.model_service
    loaded = svc._loaded
    return {
        "status": "ok" if loaded else "loading",
        "model_loaded": loaded,
        "vocabulary_size": svc.total_words or 0,
        "sequence_length": (svc.max_sequence_len - 1) if svc.max_sequence_len else 0,
    }


@router.post("/predict", response_model=PredictResponse)
def predict(body: PredictRequest, request: Request):
    svc = get_service(request)
    t0 = time.perf_counter()
    result = svc.predict_next_word(body.text, body.temperature, body.top_k)
    latency = (time.perf_counter() - t0) * 1000
    return {**result, "latency_ms": round(latency, 2)}


@router.post("/generate", response_model=GenerateResponse)
def generate(body: GenerateRequest, request: Request):
    svc = get_service(request)
    t0 = time.perf_counter()
    result = svc.generate_text(body.seed_text, body.num_words, body.temperature)
    latency = (time.perf_counter() - t0) * 1000
    return {**result, "latency_ms": round(latency, 2)}


@router.get("/model-info", response_model=ModelInfoResponse)
def model_info(request: Request):
    svc = get_service(request)
    return svc.get_model_info()
