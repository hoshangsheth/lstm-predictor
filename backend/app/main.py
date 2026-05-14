from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.model import ModelService
from app.routes import router
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

model_service = ModelService()


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Loading model and tokenizer...")
    model_service.load()
    logger.info("Model loaded successfully.")
    yield
    logger.info("Shutting down.")


app = FastAPI(
    title="LSTM Next Word Predictor API",
    description="Production inference API for LSTM-based next word prediction trained on Hamlet.",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict in production to your Vercel domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
app.state.model_service = model_service
