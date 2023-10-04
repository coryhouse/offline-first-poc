import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./About";
import Form from "./Form";
import { get, set } from "idb-keyval";
import toast from "react-hot-toast";

export default function App() {
  async function processQueue() {
    const messages = await get<string[]>("messageQueue");
    if (!messages) return;
    for (const message of messages) {
      const resp = await fetch("http://localhost:3001/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: message }),
      });
      if (resp.ok) {
        toast.success("Queued message saved.");
      }
      // remove message from queue
      await set(
        "messageQueue",
        messages.filter((m) => m !== message)
      );
    }
  }

  // run processQueue every 5 seconds when online
  setInterval(() => {
    if (navigator.onLine) processQueue();
  }, 5000);

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
