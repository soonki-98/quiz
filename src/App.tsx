import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Main, Solve, Result } from "./pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/solve" element={<Solve />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;
