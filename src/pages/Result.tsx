/*
 * Created on Thu Nov 23 2023
 *
 * Copyright (c) 2023 Your Company
 */

import { useRecoilState } from "recoil";
import { myAnswerAtom } from "../atom/myAnswers";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Check, Clear } from "@mui/icons-material";
import { Column } from "../components";
import { decode } from "he";
import { Doughnut } from "react-chartjs-2";
import { useMemo } from "react";
import "chart.js/auto";
import { useNavigate } from "react-router-dom";
export default function Result() {
  const [myAnswers, setMyAnswers] = useRecoilState(myAnswerAtom);
  const navigate = useNavigate();

  const correctCount = useMemo(
    () => myAnswers.filter((el) => el.isCorrect).length,
    [myAnswers]
  );

  return (
    <Column
      verticalAlign="center"
      horizonAlign="center"
      style={{ width: "100vw", height: "100vh" }}
      gap={16}
    >
      <Typography variant="h3">Your Result!</Typography>
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

      <div style={{ width: "300px", height: "300px" }}>
        <Doughnut
          data={{
            labels: ["Correct", "In Correct"],
            datasets: [
              {
                data: [correctCount, myAnswers.length - correctCount],
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>

      <Button
        variant="contained"
        onClick={() => {
          navigate("/");
          setMyAnswers([]);
        }}
      >
        ReStart
      </Button>
    </Column>
  );
}
