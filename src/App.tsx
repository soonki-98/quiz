import { useQuery } from "@tanstack/react-query";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import "./App.css";
import { Column } from "./components";
import { getCategories } from "./apis/quiz";
import { quizDifficulty, quizType } from "./constant";

function App() {
  const { data } = useQuery({
    queryKey: ["getCategories"],
    queryFn: () => getCategories(),
  });

  return (
    <div className="App">
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
          <Typography variant="h3" component="h1">
            Solve Quiz
          </Typography>
          {/** 문제의 갯수 */}
          <FormControl fullWidth>
            <TextField
              defaultValue={10}
              variant="outlined"
              label="Number of Questions"
            />
          </FormControl>

          {/** 문제 카테고리 */}
          <FormControl fullWidth>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              defaultValue={data?.trivia_categories[0].id}
              label="Category"
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
            <Select defaultValue="any" label="Category">
              {quizDifficulty.map((category) => (
                <MenuItem key={category.id} value={category.value}>
                  {category.id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/** 문제 풀이 종류*/}
          <FormControl fullWidth>
            <InputLabel id="type-select-label">Type</InputLabel>
            <Select defaultValue="any" label="Type">
              {quizType.map((category) => (
                <MenuItem key={category.id} value={category.value}>
                  {category.id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/** 문제풀이 시작 버튼*/}
          <Button variant="contained">Solve Quiz</Button>
        </Column>
      </Column>
    </div>
  );
}

export default App;
