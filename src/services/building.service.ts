export type Building = {
  id: string;
  name: string;
};

export async function saveBuilding(building: Building) {
  const resp = await fetch("http://localhost:3001/buildings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(building),
  });
  if (resp.ok) return resp.json();
  throw new Error("Error posting building");
}
