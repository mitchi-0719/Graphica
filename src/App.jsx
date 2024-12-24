import { Box } from "@mui/material";
import { Header } from "./common/Header";
import { Setting } from "./components/setting/Setting";
import { Chart } from "./components/chart/Chart";
import { useIsSmallDevice } from "./hooks/Responsive";
import { Provider } from "./provider/Provider";
import { GraphImportDialog } from "./components/import/GraphImportDialog";
import { useRef } from "react";

const App = () => {
  const isSmallDevice = useIsSmallDevice();
  const svgRef = useRef(null);
  return (
    <Provider>
      <Box display="flex" flexDirection="column" height="100vh">
        <Header />
        {isSmallDevice ? (
          <Box display="flex" flexDirection="column" flex={1}>
            <Setting svgRef={svgRef} />
            <Chart svgRef={svgRef} />
          </Box>
        ) : (
          <Box display="flex" flex={1}>
            <Setting svgRef={svgRef} />
            <Chart svgRef={svgRef} />
          </Box>
        )}
        <GraphImportDialog />
      </Box>
    </Provider>
  );
};

export default App;
