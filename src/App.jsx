import { Box } from "@mui/material";
import { Header } from "./common/Header";
import { Setting } from "./components/setting/Setting";
import { Chart } from "./components/chart/Chart";
import { useIsSmallDevice } from "./hooks/Responsive";

const App = () => {
  const nodes = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

  const links = [
    { source: 1, target: 2 },
    { source: 2, target: 3 },
    { source: 3, target: 4 },
  ];

  const isSmallDevice = useIsSmallDevice();

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Header />
      {isSmallDevice ? (
        <Box display="flex" flexDirection="column" flex={1}>
          <Setting />
          <Chart nodes={nodes} links={links} />
        </Box>
      ) : (
        <Box display="flex" flex={1}>
          <Setting />
          <Chart nodes={nodes} links={links} />
        </Box>
      )}
    </Box>
  );
};

export default App;
