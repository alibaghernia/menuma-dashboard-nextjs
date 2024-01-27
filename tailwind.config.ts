import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#3177FF",
        typography: "#434343",
        secondary: "#EEB33F",
        background: "#FBFBFB",
        more: "#EEB33F",
      },
    },
    fontFamily: {
      sans: ["vazirmatn"],
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
  important: true,
};
export default config;
