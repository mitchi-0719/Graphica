import { useMemo, useState } from "react";
import { isNotNullOrUndefined } from "./nullOrUndefined";

export const useStateMap = (initialState) => {
  const [state, setState] = useState(initialState);
  const stateMap = useMemo(() => {
    // TODO ここがめっちゃレンダリングされてる。対策できるならしたい
    const obj = {};
    state.forEach((v, i) => {
      if (isNotNullOrUndefined(v.id)) {
        obj[v.id] = i;
      }
    });
    return obj;
  }, [state]);

  return [state, setState, stateMap];
};
