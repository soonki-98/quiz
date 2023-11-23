/*
 * Created on Thu Nov 23 2023
 *
 * Copyright (c) 2023 Your Company
 */

import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Button,
  FormControl,
  FormLabel,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { decode } from "he";
import { useRecoilCallback } from "recoil";

import { getQuiz } from "../../apis/quiz";
import { Column, Row, Skeleton, WhatIF } from "../../components";
import QuizList from "./QuizList";
import { myAnswerAtom } from "../../atom/myAnswers";

export default function Solve() {
  const [searchParams] = useSearchParams();
  const [activeStep, setActiveStep] = useState(0);
  const [checkedAnswer, setCheckedAnswer] = useState<string | null>(null);
  const navigate = useNavigate();

  const solveQueries = useMemo(() => {
    const result: Record<string, string> = {};
    searchParams.forEach((searchValue, searchKey) => {
      result[searchKey] = searchValue;
    });
    return result;
  }, [searchParams]);

  const { data, ...rest } = useQuery({
    queryKey: ["solve", solveQueries],
    queryFn: () => {
      const { amount, category, difficulty, type } = solveQueries;
      return getQuiz({ amount, category, difficulty, type });
    },
  });

  const handleClickNextButton = useRecoilCallback(
    ({ set }) =>
      () => {
        if (!data?.results) return;
        if (activeStep < data.results.length - 1) {
          set(myAnswerAtom, (prev) => {
            const [myAnswer, correctAnswer] = [
              checkedAnswer || "",
              data?.results[activeStep].correct_answer || "",
            ];
            return [
              ...prev,
              {
                myAnswer,
                correctAnswer,
                question: data.results[activeStep].question,
                isCorrect: myAnswer === correctAnswer,
              },
            ];
          });
          setActiveStep(activeStep + 1);
          setCheckedAnswer(null);
          return;
        }
        navigate("/result");
      },
    [checkedAnswer, data?.results]
  );

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedAnswer(ev.target.value);
  };

  if (!data || rest.failureReason) return <Skeleton />;
  return (
    <Column style={{ width: "100vw", height: "100vh" }}>
      <Column
        verticalAlign="center"
        horizonAlign="center"
        gap={16}
        style={{
          width: "100%",
          maxWidth: "600px",
          height: "100%",
          margin: "0 auto",
        }}
      >
        <Stepper activeStep={activeStep}>
          {data?.results.map((quiz, index) => {
            return (
              <Step
                key={index}
                style={{ display: activeStep !== index ? "none" : undefined }}
              >
                <StepLabel color="red" style={{ margin: "20px 0" }}>
                  <Typography variant="h6"> {quiz.category}</Typography>
                </StepLabel>

                <Column horizonAlign="center">
                  {/**
                   * 문제 리스트
                   */}
                  <FormControl>
                    <FormLabel>
                      <Typography variant="body1" color="CaptionText">
                        {decode(quiz.question)}
                      </Typography>
                    </FormLabel>
                    <QuizList
                      incorrectAnswers={quiz.incorrect_answers}
                      correctAnswer={quiz.correct_answer}
                      onChange={handleChange}
                    />
                  </FormControl>

                  {/**
                   * 퀴즈 난이도
                   */}
                  <Row gap={10}>
                    <Typography
                      variant="h6"
                      color={
                        quiz.difficulty === "easy"
                          ? "green"
                          : quiz.difficulty === "medium"
                            ? "orange"
                            : "red"
                      }
                    >
                      {quiz.difficulty}
                    </Typography>
                  </Row>
                </Column>
              </Step>
            );
          })}
        </Stepper>
        {checkedAnswer && (
          <WhatIF
            condition={
              checkedAnswer === data.results[activeStep].correct_answer
            }
            falsy={<Typography color="red">InCorrect</Typography>}
          >
            <Typography color="green">Correct</Typography>
          </WhatIF>
        )}
        <Button
          disabled={checkedAnswer === null}
          onClick={handleClickNextButton}
          variant="contained"
        >
          {activeStep < data.results.length - 1 ? "Solve Next" : "Submit"}
        </Button>
      </Column>
    </Column>
  );
}
