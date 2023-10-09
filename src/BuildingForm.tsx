import { get, set } from "idb-keyval";
import "./App.css";
import { useOfflineState } from "./useOfflineState";
import toast from "react-hot-toast";
import { Building, saveBuilding } from "./services/building.service";
import { buildingQueueKey } from "./utils/processQueue";

const newBuilding: Building = {
  id: "",
  name: "",
};

const buildingIdbKey = "building";

export default function App() {
  const [building, setBuilding] = useOfflineState(newBuilding, buildingIdbKey);

  function resetForm() {
    setBuilding(newBuilding);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (navigator.onLine) {
      try {
        await saveBuilding(building);
        toast.success("Record saved.");
        resetForm();
      } catch (e) {
        toast.error("Failed to send. Try clicking save again.");
      }
    } else {
      // If offline, save to the queue
      await set(buildingQueueKey, [
        ...((await get(buildingQueueKey)) || []),
        building,
      ]);
      toast.success("Record queued.");
      resetForm();
    }
  }

  return (
    <>
      <h1>Offline First POC</h1>

      <p
        style={{
          color: navigator.onLine ? "green" : "red",
          fontWeight: "bold",
        }}
      >
        {navigator.onLine ? "On" : "Off"}line
      </p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Building Name</label>
          <br />
          <input
            type="text"
            value={building.name}
            onChange={(e) => {
              setBuilding({ ...building, name: e.target.value });
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
