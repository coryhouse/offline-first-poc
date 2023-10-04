import { get, set } from "idb-keyval";
import "./App.css";
import { useOfflineState } from "./useOfflineState";
import toast from "react-hot-toast";
import { saveMessage } from "./services/message.service";

export default function App() {
  const [message, setMessage] = useOfflineState("", "message");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (navigator.onLine) {
      try {
        await saveMessage(message);
        toast.success("Message saved.");
        setMessage(""); // clear the form so the user can enter a new message
      } catch (e) {
        toast.error("Message failed to send. Try clicking save again.");
      }
    } else {
      // If offline, save the message to the queue
      await set("messageQueue", [
        ...((await get("messageQueue")) || []),
        message,
      ]);
      toast.success("Message queued.");
      setMessage(""); // clear the form so the user can enter a new message
    }
  }

  return (
    <>
      <h1>Offline First POC</h1>

      <p>{navigator.onLine ? "On" : "Off"}line</p>

      <form onSubmit={handleSubmit}>
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
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) set("image", file);
            }}
          />
        </div>

        <button type="submit">Save</button>
      </form>
    </>
  );
}
