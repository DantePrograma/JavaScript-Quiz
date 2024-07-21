import { Button } from "@mui/material";
import { useQuestionsData } from "../hooks/useQuestionsData";
import { useQuestions } from "../store/questions";

export const Footer = () => {
  const { correct, incorrect, unanswered } = useQuestionsData();
  const resetGame = useQuestions((state) => state.resetGame);

  return (
    <footer
      style={{
        marginTop: "20px",
        fontSize: "1.1rem",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <strong>
        {`✅ ${correct} correctas - ❌ ${incorrect} incorrectas - ❓ ${unanswered}
        sin responder`}
      </strong>
      <Button sx={{ fontSize: "1.1rem" }} onClick={resetGame}>
        reset game
      </Button>
    </footer>
  );
};
