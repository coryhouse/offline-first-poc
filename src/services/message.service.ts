export async function saveMessage(message: string) {
  const resp = await fetch("http://localhost:3001/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: message }),
  });
  if (resp.ok) return resp.json();
  throw new Error("Error posting message");
}
