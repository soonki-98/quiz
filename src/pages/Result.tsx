/*
 * Created on Thu Nov 23 2023
 *
 * Copyright (c) 2023 Your Company
 */

import { useRecoilValue } from "recoil";
import { myAnswerAtom } from "../atom/myAnswers";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Check, Clear } from "@mui/icons-material";
import { Column } from "../components";
import { decode } from "he";

export default function Result() {
  const myAnswers = useRecoilValue(myAnswerAtom);

  return (
    <Column
      verticalAlign="center"
      horizonAlign="center"
      style={{ width: "100vw", height: "100vh" }}
    >
      <TableContainer component={Paper} style={{ width: "650px" }}>
        <Table sx={{ maxWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell align="left">Question</TableCell>
              <TableCell align="left">Your Answer</TableCell>
              <TableCell align="left">Correct Answer</TableCell>
              <TableCell align="left">Correct</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myAnswers.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{decode(row.question)}</TableCell>
                <TableCell align="left">{row.myAnswer}</TableCell>
                <TableCell align="left">{row.correctAnswer}</TableCell>
                <TableCell align="left">
                  {row.isCorrect ? (
                    <Check color="success" />
                  ) : (
                    <Clear color="error" />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Column>
  );
}
