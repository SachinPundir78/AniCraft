import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import Editor from "./Editor";
import GhibliConverter from "./GhibliConverter";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/overlay" element={<Editor />} />
        <Route path="/ghibli" element={<GhibliConverter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
