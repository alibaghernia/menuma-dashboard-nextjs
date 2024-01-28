import tailwindConfig from "@/../tailwind.config";
import { GeneralProviderContext } from "@/providers/general/provider";
import useRouteChange from "@/providers/routeChange/hooks";
import { useRouteChangeContext } from "@/providers/routeChange/provider";
import { Grid } from "antd";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
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

export const useCustomRouter = () => {
  const { onRouteChangeStart } = useRouteChangeContext();
  const router = useRouter();

  const push = (...params: [string, NavigateOptions?]) => {
    const { pathname, search, hash } = window.location;
    const hrefCurrent = `${pathname}${search}${hash}`;
    const hrefTarget = params[0] as string;
    if (hrefTarget !== hrefCurrent) {
      onRouteChangeStart();
    }
    router.push(...params);
  };
  const replace = (...params: [string, NavigateOptions?]) => {
    const { pathname, search, hash } = window.location;
    const hrefCurrent = `${pathname}${search}${hash}`;
    const hrefTarget = params[0] as string;
    if (hrefTarget !== hrefCurrent) {
      onRouteChangeStart();
    }
    router.replace(...params);
  };

  return {
    ...router,
    push,
    replace,
  };
};
