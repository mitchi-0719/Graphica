import { GraphContextProvider } from "../context/graphContext/GraphContextProvider";

export const Provider = ({ children }) => {
  return <GraphContextProvider>{children}</GraphContextProvider>;
};
