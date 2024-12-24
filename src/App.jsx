import { Box } from "@mui/material";
import { Header } from "./common/Header";
import { Setting } from "./components/setting/Setting";
import { Chart } from "./components/chart/Chart";
import { useIsSmallDevice } from "./hooks/Responsive";
import { Provider } from "./provider/Provider";
import { GraphImportDialog } from "./components/import/GraphImportDialog";
import { useToggle } from "react-use";
import { useRef } from "react";

const App = () => {
  const isSmallDevice = useIsSmallDevice();
  const [isOpen, toggle] = useToggle(false);
  const svgRef = useRef(null);
  return (
    <Provider>
      <Box display="flex" flexDirection="column" height="100vh">
        <Header toggleSideMenu={toggle} />
        {isSmallDevice ? (
          <Box display="flex" flexDirection="column" flex={1}>
            {isOpen && <Setting svgRef={svgRef} />}
            <Chart svgRef={svgRef} />
          </Box>
        ) : (
          <Box display="flex" flex={1}>
            {isOpen && <Setting svgRef={svgRef} />}
            <Chart svgRef={svgRef} />
          </Box>
        )}
        <GraphImportDialog />
      </Box>
    </Provider>
  );
};

export default App;
