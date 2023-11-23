/*
 * Created on Thu Nov 23 2023
 *
 * Copyright (c) 2023 Your Company
 */

import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { decode } from "he";

import { getQuiz } from "../apis/quiz";
import { Column, Row } from "../components";

function shuffle<T>(array: T[]) {
  return array.sort(() => Math.random() - 0.5);
}

export default function Solve() {
  const [searchParams] = useSearchParams();
  const [activeStep, setActiveStep] = useState(0);

  const solveQueries = useMemo(() => {
    const result: Record<string, string> = {};
    searchParams.forEach((searchValue, searchKey) => {
      result[searchKey] = searchValue;
    });
    return result;
  }, [searchParams]);

  const { data } = useQuery({
    queryKey: ["solve", solveQueries],
    queryFn: () => {
      const { amount, category, difficulty, type } = solveQueries;
      return getQuiz({ amount, category, difficulty, type });
    },
  });

  if (!data) return null;
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
                  <FormControl>
                    <FormLabel>
                      <Typography variant="body1" color="CaptionText">
                        {decode(quiz.question)}
                      </Typography>
                    </FormLabel>
                    <RadioGroup>
                      {shuffle([
                        ...quiz.incorrect_answers,
                        quiz.correct_answer,
                      ]).map((answer) => {
                        return (
                          <FormControlLabel
                            value={answer}
                            key={answer}
                            control={<Radio />}
                            label={answer}
                          />
                        );
                      })}
                    </RadioGroup>
                  </FormControl>

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
        <Button
          onClick={() => setActiveStep(activeStep + 1)}
          variant="contained"
        >
          {activeStep < data.results.length - 1 ? "Solve Next" : "Submit"}
        </Button>
      </Column>
    </Column>
  );
}
