import { useKey } from "react-use";

export const useMultipleKeys = (keys, handler) => {
  useKey((event) => keys.includes(event.key), handler);
};
