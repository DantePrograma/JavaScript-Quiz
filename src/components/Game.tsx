import {
  Card,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useQuestions } from "../store/questions";
import { Question } from "../types";
import SyntaxHighlighter from "react-syntax-highlighter";
import { obsidian } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { Footer } from "./Footer";

const getBackgroundColor = (info: Question, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info;

  if (userSelectedAnswer == null) return "transparent";

  if (index !== correctAnswer && index !== userSelectedAnswer)
    return "transparent";

  if (index === correctAnswer) return "green";

  if (index === userSelectedAnswer) return "red";

  return "transparent";
};

const QuestionTable = ({ info }: { info: Question }) => {
  const selectAnswer = useQuestions((state) => state.selectAnswer);

  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex);
  };

  return (
    <Card sx={{ bgcolor: "#222", p: 2, textAlign: "left" }} variant="outlined">
      <Typography variant="h5">{info.question}</Typography>

      <SyntaxHighlighter language="javascript" style={obsidian}>
        {info.code}
      </SyntaxHighlighter>

      <List sx={{ bgcolor: "#333" }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              disabled={info.userSelectedAnswer != null}
              sx={{
                textAlign: "center",
                backgroundColor: getBackgroundColor(info, index),
              }}
              onClick={createHandleClick(index)}
            >
              <ListItemText primary={answer} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export const Game = () => {
  const questions = useQuestions((state) => state.questions);
  const currentQuestion = useQuestions((state) => state.currentQuestion);
  const goNextQuestion = useQuestions((state) => state.goNextQuestion);
  const goPreviousQuestion = useQuestions((state) => state.goPreviousQuestion);

  const questionInfo = questions[currentQuestion];

  return (
    <>
      <Stack
        direction="row"
        gap={2}
        alignItems="center"
        justifyContent="center"
        marginBottom={4}
      >
        <IconButton
          onClick={goPreviousQuestion}
          disabled={currentQuestion === 0}
        >
          <ArrowBackIosNew />
        </IconButton>
        {currentQuestion + 1} / {questions.length}
        <IconButton
          onClick={goNextQuestion}
          disabled={currentQuestion >= questions.length - 1}
        >
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <QuestionTable info={questionInfo} />

      <Footer />
    </>
  );
};
