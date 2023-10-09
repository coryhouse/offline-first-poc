import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./About";
import BuildingForm from "./BuildingForm";

export default function App() {
  return (
    <>
      <nav>
        <Link to="/">Form</Link> | <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<BuildingForm />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}
