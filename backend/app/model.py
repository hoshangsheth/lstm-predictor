import numpy as np
import pickle
import os
import logging
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.preprocessing.text import Tokenizer
import nltk
from nltk.corpus import gutenberg

logger = logging.getLogger(__name__)

ARTIFACTS_DIR = os.path.join(os.path.dirname(__file__), "..", "artifacts")
MODEL_PATH = os.path.join(ARTIFACTS_DIR, "lstm_model.keras")
TOKENIZER_PATH = os.path.join(ARTIFACTS_DIR, "tokenizer.pkl")
TEXT_PATH = os.path.join(ARTIFACTS_DIR, "hamlet.txt")


class ModelService:
    def __init__(self):
        self.model = None
        self.tokenizer = None
        self.max_sequence_len = None
        self.total_words = None
        self._loaded = False

    def load(self):
        if self._loaded:
            return

        # Load or build tokenizer
        if os.path.exists(TOKENIZER_PATH):
            with open(TOKENIZER_PATH, "rb") as f:
                self.tokenizer = pickle.load(f)
            logger.info("Tokenizer loaded from cache.")
        else:
            logger.info("Building tokenizer from text...")
            self._build_tokenizer()

        # Load model
        self.model = load_model(MODEL_PATH)
        self.max_sequence_len = self.model.input_shape[1] + 1
        self.total_words = len(self.tokenizer.word_index) + 1
        logger.info(f"Model loaded. vocab={self.total_words}, max_seq={self.max_sequence_len}")
        self._loaded = True

    def _build_tokenizer(self):
        with open(TEXT_PATH, "r") as f:
            text = f.read().lower()
        tokenizer = Tokenizer(num_words=5000, oov_token="<OOV>")
        tokenizer.fit_on_texts([text])
        self.tokenizer = tokenizer
        os.makedirs(ARTIFACTS_DIR, exist_ok=True)
        with open(TOKENIZER_PATH, "wb") as f:
            pickle.dump(tokenizer, f)
        logger.info("Tokenizer built and cached.")

    def _tokenize_and_pad(self, text: str) -> np.ndarray:
        token_list = self.tokenizer.texts_to_sequences([text])[0]
        if len(token_list) >= self.max_sequence_len:
            token_list = token_list[-(self.max_sequence_len - 1):]
        return pad_sequences([token_list], maxlen=self.max_sequence_len - 1, padding="pre")

    def predict_next_word(self, text: str, temperature: float = 1.0, top_k: int = 5):
        padded = self._tokenize_and_pad(text)
        probs = self.model.predict(padded, verbose=0)[0]

        # Temperature scaling
        if temperature != 1.0:
            probs = np.log(probs + 1e-10) / temperature
            probs = np.exp(probs)
            probs = probs / probs.sum()

        top_indices = np.argsort(probs)[::-1][:top_k]
        top_words = []
        for idx in top_indices:
            word = self.tokenizer.index_word.get(idx, "<UNK>")
            top_words.append({"word": word, "probability": float(probs[idx])})

        predicted_idx = int(np.argmax(probs))
        predicted_word = self.tokenizer.index_word.get(predicted_idx, "<UNK>")
        confidence = float(probs[predicted_idx])

        return {
            "predicted_word": predicted_word,
            "confidence": confidence,
            "top_predictions": top_words,
        }

    def generate_text(self, seed_text: str, num_words: int, temperature: float = 1.0):
        current_text = seed_text
        generated_words = []

        for _ in range(num_words):
            padded = self._tokenize_and_pad(current_text)
            probs = self.model.predict(padded, verbose=0)[0]

            if temperature != 1.0:
                probs = np.log(probs + 1e-10) / temperature
                probs = np.exp(probs)
                probs = probs / probs.sum()

            # Sample from distribution
            predicted_idx = np.random.choice(len(probs), p=probs)
            next_word = self.tokenizer.index_word.get(predicted_idx, "<UNK>")
            generated_words.append(next_word)
            current_text += " " + next_word

        return {
            "seed_text": seed_text,
            "generated_words": generated_words,
            "full_text": current_text,
        }

    def get_model_info(self):
        return {
            "vocabulary_size": self.total_words,
            "sequence_length": self.max_sequence_len - 1,
            "architecture": "Embedding → LSTM(100) → Dropout(0.3) → LSTM(50) → Dropout(0.3) → Dense(softmax)",
            "dataset": "Shakespeare's Hamlet (NLTK Gutenberg)",
            "embedding_dim": 100,
            "lstm_units": [100, 50],
            "dropout": 0.3,
        }
