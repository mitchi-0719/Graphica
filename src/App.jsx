import { Box } from "@mui/material";
import { Header } from "./common/Header";
import { Setting } from "./components/setting/Setting";
import { Chart } from "./components/chart/Chart";
import { useIsSmallDevice } from "./hooks/Responsive";
import { Provider } from "./provider/Provider";
import { GraphImportDialog } from "./components/import/GraphImportDialog";

const App = () => {
  const isSmallDevice = useIsSmallDevice();

  return (
    <Provider>
      <Box display="flex" flexDirection="column" height="100vh">
        <Header />
        {isSmallDevice ? (
          <Box display="flex" flexDirection="column" flex={1}>
            <Setting />
            <Chart />
          </Box>
        ) : (
          <Box display="flex" flex={1}>
            <Setting />
            <Chart />
          </Box>
        )}
        <GraphImportDialog />
      </Box>
    </Provider>
  );
};

export default App;
