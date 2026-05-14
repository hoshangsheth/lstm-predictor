import axios from "axios";
import type {
  PredictResponse,
  GenerateResponse,
  ModelInfo,
  HealthResponse,
} from "@/types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

export async function predictNextWord(
  text: string,
  temperature: number,
  topK = 5
): Promise<PredictResponse> {
  const { data } = await api.post<PredictResponse>("/predict", {
    text,
    temperature,
    top_k: topK,
  });
  return data;
}

export async function generateText(
  seedText: string,
  numWords: number,
  temperature: number
): Promise<GenerateResponse> {
  const { data } = await api.post<GenerateResponse>("/generate", {
    seed_text: seedText,
    num_words: numWords,
    temperature,
  });
  return data;
}

export async function getModelInfo(): Promise<ModelInfo> {
  const { data } = await api.get<ModelInfo>("/model-info");
  return data;
}

export async function getHealth(): Promise<HealthResponse> {
  const { data } = await api.get<HealthResponse>("/health");
  return data;
}
