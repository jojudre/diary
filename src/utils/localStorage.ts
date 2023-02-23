import { Note } from "types";

export const loadState = () => {
  try {
      const serializedState = localStorage.getItem("state");
      if (serializedState === null) {
        return [];
      }
      return JSON.parse(serializedState);
    
  } catch (err) {
    console.warn("Failed to retrieve persisted state:", err);
    return undefined;
  }
};

export const saveState = (notes: Note[]) => {
  try {
    localStorage.setItem("state", JSON.stringify(notes));
  } catch (e) {
    console.error("Error saving notes to local storage:", e);
  }
};
