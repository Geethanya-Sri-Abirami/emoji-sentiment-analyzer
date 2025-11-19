from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from sentiment import analyze_sentiment
from emoji_mapper import map_sentiment_to_emoji

app = FastAPI()

# -----------------------
# CORS SETTINGS
# -----------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],     # Allow frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------
# Request Model
# -----------------------
class TextInput(BaseModel):
    text: str

# -----------------------
# SENTIMENT ANALYSIS API
# -----------------------
@app.post("/analyze")
def analyze_text(data: TextInput):

    # Run the sentiment analyzer
    sentiment_score, sentiment_label = analyze_sentiment(data.text)

    # Map emoji
    emoji = map_sentiment_to_emoji(sentiment_score)

    # Return API response
    return {
        "sentiment": sentiment_label,
        "score": sentiment_score,
        "emoji": emoji
    }
