from pydantic import BaseModel, Field
from typing import List


class PredictRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=500)
    temperature: float = Field(default=1.0, ge=0.1, le=2.0)
    top_k: int = Field(default=5, ge=1, le=10)


class WordProbability(BaseModel):
    word: str
    probability: float


class PredictResponse(BaseModel):
    predicted_word: str
    confidence: float
    top_predictions: List[WordProbability]
    latency_ms: float


class GenerateRequest(BaseModel):
    seed_text: str = Field(..., min_length=1, max_length=500)
    num_words: int = Field(default=10, ge=1, le=50)
    temperature: float = Field(default=1.0, ge=0.1, le=2.0)


class GenerateResponse(BaseModel):
    seed_text: str
    generated_words: List[str]
    full_text: str
    latency_ms: float


class HealthResponse(BaseModel):
    status: str
    model_loaded: bool
    vocabulary_size: int
    sequence_length: int


class ModelInfoResponse(BaseModel):
    vocabulary_size: int
    sequence_length: int
    architecture: str
    dataset: str
    embedding_dim: int
    lstm_units: List[int]
    dropout: float
