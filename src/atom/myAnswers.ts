/*
 * Created on Thu Nov 23 2023
 *
 * Copyright (c) 2023 Your Company
 */

import { atom } from "recoil";

type Answer = {
  myAnswer: string;
  isCorrect: boolean;
  correctAnswer: string;
  question: string;
};

export const myAnswerAtom = atom<Answer[]>({
  key: "myAnswerAtom",
  default: [],
});
