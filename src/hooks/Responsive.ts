import { useTheme, useMediaQuery } from "@mui/material";
import { Theme } from "@mui/material/styles";

export const getSmallDeviceBreakpoint = (theme: Theme): string =>
  theme.breakpoints.down("md");
export const getMediumDeviceBreakpoint = (theme: Theme): string =>
  theme.breakpoints.down("lg");

export const useIsSmallDevice = (): boolean => {
  const theme = useTheme();
  return useMediaQuery(getSmallDeviceBreakpoint(theme));
};

export const useIsMediumDevice = (): boolean => {
  const theme = useTheme();
  return useMediaQuery(getMediumDeviceBreakpoint(theme));
};
