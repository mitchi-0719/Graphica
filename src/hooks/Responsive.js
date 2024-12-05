import { useTheme, useMediaQuery } from "@mui/material";

export const getSmallDeviceBreakpoint = (theme) => theme.breakpoints.down("md");
export const getMediumDeviceBreakpoint = (theme) =>
  theme.breakpoints.down("lg");

export const useIsSmallDevice = () => {
  const theme = useTheme();
  return useMediaQuery(getSmallDeviceBreakpoint(theme));
};

export const useIsMediumDevice = () => {
  const theme = useTheme();
  return useMediaQuery(getMediumDeviceBreakpoint(theme));
};
