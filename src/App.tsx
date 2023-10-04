import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./About";
import Form from "./Form";
import { processQueue } from "./utils/processQueue";

// Run every 5 seconds
setInterval(() => processQueue(), 5000);

export default function App() {
  return (
    <>
      <nav>
        <Link to="/">Form</Link> | <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}
