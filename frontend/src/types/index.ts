export interface WordProbability {
  word: string;
  probability: number;
}

export interface PredictResponse {
  predicted_word: string;
  confidence: number;
  top_predictions: WordProbability[];
  latency_ms: number;
}

export interface GenerateResponse {
  seed_text: string;
  generated_words: string[];
  full_text: string;
  latency_ms: number;
}

export interface ModelInfo {
  vocabulary_size: number;
  sequence_length: number;
  architecture: string;
  dataset: string;
  embedding_dim: number;
  lstm_units: number[];
  dropout: number;
}

export interface HealthResponse {
  status: string;
  model_loaded: boolean;
  vocabulary_size: number;
  sequence_length: number;
}

export type TemperatureMode = "conservative" | "balanced" | "creative";

export const TEMPERATURE_VALUES: Record<TemperatureMode, number> = {
  conservative: 0.5,
  balanced: 1.0,
  creative: 1.5,
};
