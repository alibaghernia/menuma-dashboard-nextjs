import tailwindConfig from "@/../tailwind.config";
import { GeneralProviderContext } from "@/providers/general/provider";
import { useContext } from "react";
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
