import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { createSearchParams, useNavigate } from "react-router-dom";

import { Column } from "../components";
import { getCategories } from "../apis/quiz";
import { quizDifficulty, quizType } from "../constant";

type QuizQuery = {
  amount: string;
  category: string;
  difficulty?: string;
  type?: string;
};

export default function Main() {
  const { data } = useQuery({
    queryKey: ["getCategories"],
    queryFn: () => getCategories(),
  });

  const [quizQueries, setQuizQueries] = useState<QuizQuery>({
    amount: "10",
    category: "9",
  });

  const navigate = useNavigate();

  const handleChange = (ev: SelectChangeEvent | React.ChangeEvent) => {
    const target = ev.target as HTMLInputElement;
    const name = target.name as keyof QuizQuery;
    setQuizQueries({ ...quizQueries, [name]: target.value });
  };

  const handleSubmit = () => {
    navigate({
      pathname: "/solve",
      search: createSearchParams({
        ...quizQueries,
      }).toString(),
    });
  };

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
        <Typography variant="h3" component="h1" data-testid="solve-quiz">
          Solve Quiz
        </Typography>
        {/** 문제의 갯수 */}
        <FormControl fullWidth>
          <TextField
            name="amount"
            onChange={handleChange}
            defaultValue="10"
            variant="outlined"
            label="Number of Questions"
          />
        </FormControl>

        {/** 문제 카테고리 */}
        <FormControl fullWidth>
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            defaultValue={`${data?.trivia_categories[0].id}`}
            label="Category"
            name="category"
            onChange={handleChange}
          >
            {data?.trivia_categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/** 문제 난이도*/}
        <FormControl fullWidth>
          <InputLabel id="difficulty-select-label">Difficulty</InputLabel>
          <Select
            defaultValue="any"
            label="Difficulty"
            name="difficulty"
            onChange={handleChange}
          >
            {quizDifficulty.map((difficulty) => (
              <MenuItem key={difficulty.id} value={difficulty.value}>
                {difficulty.id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/** 문제 풀이 종류*/}
        <FormControl fullWidth>
          <InputLabel id="type-select-label">Type</InputLabel>
          <Select
            defaultValue="any"
            label="Type"
            name="type"
            onChange={handleChange}
          >
            {quizType.map((type) => (
              <MenuItem key={type.id} value={type.value}>
                {type.id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/** 문제풀이 시작 버튼*/}
        <Button
          variant="contained"
          onClick={handleSubmit}
          data-testid="start-solve-quiz"
        >
          Solve Quiz
        </Button>
      </Column>
    </Column>
  );
}
