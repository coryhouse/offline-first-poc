import toast from "react-hot-toast";
import { saveMessage } from "../services/message.service";
import { get, set } from "idb-keyval";

export async function processQueue() {
  if (!navigator.onLine) return; // Only process queue when online
  const messages = await get<string[]>("messageQueue");
  if (!messages) return;
  for (const message of messages) {
    try {
      await saveMessage(message);
      toast.success("Queued message saved.");
      // remove message from queue
      await set(
        "messageQueue",
        messages.filter((m) => m !== message)
      );
    } catch (e) {
      toast.error("Queued message failed to send. We'll try again later.");
      return;
    }
  }
}
