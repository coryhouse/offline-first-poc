import toast from "react-hot-toast";
import { saveMessage } from "../services/message.service";
import { get, set } from "idb-keyval";

export async function processQueue() {
  if (!navigator.onLine) return; // Only process queue when online
  const messages = await get<string[]>("messageQueue");
  if (!messages) return;
  const savedMessages: string[] = [];
  try {
    for (const message of messages) {
      await saveMessage(message);
      toast.success("Queued message saved: " + message);
      savedMessages.push(message);
    }
    // remove saved messages from queue
    await set(
      "messageQueue",
      messages.filter((m) => savedMessages.indexOf(m) === -1)
    );
  } catch (e) {
    toast.error("Some queued messages failed to send. We'll try again later.");
    return;
  }
}
