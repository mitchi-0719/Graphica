import { useMemo, useState } from "react";

export const useStateMap = (initialState) => {
  const [state, setState] = useState(initialState);
  const stateMap = useMemo(() => {
    // TODO ここがめっちゃレンダリングされてる。対策できるならしたい
    const obj = {};
    state.forEach((v, i) => {
      if (v.id) {
        obj[v.id] = i;
      }
    });
    return obj;
  }, [state]);

  return [state, setState, stateMap];
};
