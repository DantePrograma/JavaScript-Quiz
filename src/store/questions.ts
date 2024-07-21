import { create } from "zustand";
import { Question } from "../types";
import confetti from "canvas-confetti";
import { persist } from "zustand/middleware";

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answer: number) => void;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
  resetGame: () => void;
}

const API_URL = import.meta.env.PROD
  ? "https://javascript-quiz-six.vercel.app"
  : "http://localhost:5173";

export const useQuestions = create<State>()(
  persist(
    (set, get) => {
      return {
        questions: [],
        currentQuestion: 0,

        fetchQuestions: async (limit: number) => {
          const res = await fetch(`${API_URL}/public/data.json`);
          const json = await res.json();

          const questions = json
            .sort(() => Math.random() - 0.5)
            .slice(0, limit);
          set({ questions });
        },

        selectAnswer: (questionId: number, answerIndex: number) => {
          const { questions } = get();

          const newQuestions = structuredClone(questions);
          const questionIndex = newQuestions.findIndex(
            (q) => q.id === questionId
          );
          const questionInfo = newQuestions[questionIndex];

          const isCorrectUserAnswer =
            questionInfo.correctAnswer === answerIndex;

          if (isCorrectUserAnswer) confetti();

          newQuestions[questionIndex] = {
            ...questionInfo,
            isCorrectUserAnswer,
            userSelectedAnswer: answerIndex,
          };

          set({ questions: newQuestions });
        },

        goNextQuestion: () => {
          const { currentQuestion, questions } = get();
          const nextQuestion = currentQuestion + 1;

          if (nextQuestion < questions.length) {
            set({ currentQuestion: nextQuestion });
          }
        },

        goPreviousQuestion: () => {
          const { currentQuestion } = get();
          const previousQuestion = currentQuestion - 1;

          if (previousQuestion >= 0) {
            set({ currentQuestion: previousQuestion });
          }
        },

        resetGame: () => {
          set({ currentQuestion: 0, questions: [] });
        },
      };
    },
    {
      name: "questions",
    }
  )
);
