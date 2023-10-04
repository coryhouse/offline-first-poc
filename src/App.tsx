import "./App.css";
import { useOfflineState } from "./useOfflineState";

export default function App() {
  const [message, setMessage] = useOfflineState("", "message");

  return (
    <>
      <h1>Offline First POC</h1>

      <p>{navigator.onLine ? "On" : "Off"}line</p>

      <div>
        <label>Message</label>
        <br />
        <input
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        ></input>
      </div>

      <div>
        <label>Image</label>
        <br />
        <input type="file" />
      </div>
    </>
  );
}
