import { useState } from "react";
import InputBox from "./components/InputBox";
import ResultCard from "./components/ResultCard";
import { Container } from "@mui/material";

function App() {
  const [result, setResult] = useState(null);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8f9fa",
        paddingTop: "20px",
      }}
    >
      <Container maxWidth="sm">
        <InputBox setResult={setResult} />
        <ResultCard result={result} />
      </Container>
    </div>
  );
}

export default App;
