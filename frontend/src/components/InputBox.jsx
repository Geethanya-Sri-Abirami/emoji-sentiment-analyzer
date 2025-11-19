import { useState } from "react";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";
import confetti from "canvas-confetti";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export default function InputBox({ setResult }) {
  const [text, setText] = useState("");

  const triggerEmojiShower = (emoji) => {
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 4,
        startVelocity: 20,
        spread: 360,
        ticks: 60,
        scalar: 2,
        shapes: ["text"],
        text: emoji,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2,
        },
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  const handleAnalyze = async () => {
    if (!text.trim()) return;

    const res = await axios.post("http://localhost:8000/analyze", { text });
    setResult(res.data);

    const emojiToShow = res.data.emoji[0];
    triggerEmojiShower(emojiToShow);
  };

  const startListening = () => {
    if (!SpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      setText(speechText);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.start();
  };

  return (
    <Card sx={{ p: 3, mt: 5, boxShadow: 5, borderRadius: 4 }}>
      <CardContent>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", textAlign: "center", color: "#333", mb: 2 }}
        >
          Emoji Sentiment Analyzer
        </Typography>

        <TextField
          label="Type your sentence or Speak 💬"
          fullWidth
          multiline
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          sx={{ mt: 2 }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3, py: 1.5, fontSize: 16 }}
          onClick={handleAnalyze}
        >
          Analyze
        </Button>

        <Button
          variant="outlined"
          fullWidth
          sx={{ mt: 2, py: 1.5, fontSize: 16 }}
          onClick={startListening}
        >
          🎤 Speak
        </Button>
      </CardContent>
    </Card>
  );
}
