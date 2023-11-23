import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Main, Solve } from "./pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/solve" element={<Solve />} />
      </Routes>
    </div>
  );
}

export default App;
