import tailwindConfig from "@/../tailwind.config";
import { GeneralProviderContext } from "@/providers/general/provider";
import { Grid } from "antd";
import { useContext, useMemo } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
export const useTailwindColor = (color: string) => {
  const resolvedTailwindConfig = resolveConfig(tailwindConfig);

  //@ts-ignore
  return resolvedTailwindConfig.theme.colors[color]?.toString();
};

export const useFontFamily = () => {
  const { theme_fontFamily } = useContext(GeneralProviderContext);

  return theme_fontFamily;
};

export const useCurrentBreakpoints = () => {
  const breakpoints = Grid.useBreakpoint();

  const currentBreakpoints = useMemo(
    () =>
      Object.entries(breakpoints)
        .filter(([, v]) => !!v)
        .map(([k]) => k),
    [breakpoints]
  );

  return {
    breakpoints: currentBreakpoints,
    isXs: currentBreakpoints.includes("xs"),
    isSm: currentBreakpoints.includes("sm"),
    isMd: currentBreakpoints.includes("md"),
    isLg: currentBreakpoints.includes("lg"),
    isXlg: currentBreakpoints.includes("xlg"),
    last: currentBreakpoints.slice(-1).toString(),
  };
};
