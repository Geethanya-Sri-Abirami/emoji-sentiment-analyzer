import { Card, CardContent, Typography, Fade } from "@mui/material";

export default function ResultCard({ result }) {
  if (!result) return null;

  return (
    <Fade in timeout={500}>
      <Card
        sx={{
          mt: 4,
          p: 2,
          textAlign: "center",
          borderRadius: 4,
          boxShadow: 4,
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Sentiment: <strong>{result.sentiment}</strong>
          </Typography>

          <Typography variant="h6" sx={{ mb: 2 }}>
            Score: {result.score}
          </Typography>

          <Typography variant="h2" sx={{ mt: 1 }}>
            {result.emoji}
          </Typography>
        </CardContent>
      </Card>
    </Fade>
  );
}
