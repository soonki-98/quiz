/*
 * Created on Thu Nov 23 2023
 *
 * Copyright (c) 2023 Your Company
 */

import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { decode } from "he";
import React, { useMemo } from "react";

function shuffle<T>(array: T[]) {
  return array.sort(() => Math.random() - 0.5);
}

export default React.memo(function QuizList({
  incorrectAnswers,
  correctAnswer,
  onChange,
}: {
  incorrectAnswers: string[];
  correctAnswer: string;
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const quizList = useMemo(() => {
    return shuffle([...incorrectAnswers, correctAnswer]);
  }, [incorrectAnswers, correctAnswer]);

  return (
    <RadioGroup>
      {quizList.map((answer) => {
        return (
          <FormControlLabel
            value={answer}
            key={answer}
            control={<Radio data-testid="select-answer" onChange={onChange} />}
            label={decode(answer)}
          />
        );
      })}
    </RadioGroup>
  );
});
