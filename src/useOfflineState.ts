import { useEffect, useState } from "react";
import { get, set } from "idb-keyval";

// Automatically write state changes to IndexedDB
export function useOfflineState<TState>(
  initialState: TState,
  indexDbKey: string
) {
  const [state, setState] = useState<TState>(initialState);

  useEffect(() => {
    get<TState>(indexDbKey).then((val) => {
      setState(val ?? initialState);
    });
  }, [indexDbKey, initialState]);

  const setStateAndPersist = (newState: TState) => {
    setState(newState);
    set(indexDbKey, newState);
  };

  return [state, setStateAndPersist] as const;
}
