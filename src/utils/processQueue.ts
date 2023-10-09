import toast from "react-hot-toast";
import { Building, saveBuilding } from "../services/building.service";
import { get, set } from "idb-keyval";

export const buildingQueueKey = "buildingQueue";

export async function processQueue() {
  if (!navigator.onLine) return; // Only process queue when online
  const buildings = await get<Building[]>(buildingQueueKey);
  if (!buildings) return;
  const savedBuildings: Building[] = [];
  try {
    for (const building of buildings) {
      await saveBuilding(building);
      toast.success("Queued building saved: " + building.id);
      savedBuildings.push(building);
    }
    // Remove saved records from queue
    await set(
      buildingQueueKey,
      buildings.filter((b) => savedBuildings.indexOf(b) === -1)
    );
  } catch (e) {
    toast.error("Some queued records failed to send. We'll try again later.");
    return;
  }
}
