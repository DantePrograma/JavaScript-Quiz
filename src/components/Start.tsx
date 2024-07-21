import { Button } from "@mui/material";
import { useQuestions } from "../store/questions";

export const Start = () => {
  const fetch = useQuestions((state) => state.fetchQuestions);

  const handleClick = () => {
    fetch(10);
  };

  return (
    <Button variant="contained" onClick={handleClick}>
      ¡Empezar el juego!
    </Button>
  );
};
