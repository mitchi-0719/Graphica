import { GraphContextProvider } from "../context/graphContext/GraphContextProvider";
import { ImportContextProvider } from "../context/importContext/ImportContextProvider";

export const Provider = ({ children }) => {
  return (
    <GraphContextProvider>
      <ImportContextProvider>{children}</ImportContextProvider>
    </GraphContextProvider>
  );
};
