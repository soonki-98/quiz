import { useQuery } from "@tanstack/react-query";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import "./App.css";
import { Column } from "./components";
import { getCategories } from "./apis/quiz";

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
          gap={8}
          style={{ width: "100%", height: "100%" }}
        >
          <FormControl>
            <InputLabel id="category-select-label">Select Category</InputLabel>
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
          <Button variant="contained">Solve Quiz</Button>
        </Column>
      </Column>
    </div>
  );
}

export default App;
