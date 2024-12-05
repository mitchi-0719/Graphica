import { useKey } from "react-use";

// 指定された複数のキーを押下したときに指定されたハンドラを呼び出すhooks
export const useMultipleKeys = (keys, handler) => {
  useKey((event) => keys.includes(event.key), handler);
};
