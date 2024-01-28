import "@/assets/styles/globals.scss";
import type { Metadata } from "next";
import LocalFont from "next/font/local";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { GeneralProvider } from "@/providers/general/provider";
import { RouteChangeProvider } from "@/providers/routeChange/provider";
const vazirMatn = LocalFont({
  display: "swap",
  variable: "--font-vazirmatn",
  src: [
    {
      path: "../assets/fonts/vazirFD-100.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../assets/fonts/vazirFD-300.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/vazirFD-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/vazirFD-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/vazirFD-700.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/vazirFD-900.woff2",
      weight: "900",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "داشبورد - منوما",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={vazirMatn.className}>
      <body
        className={vazirMatn.className}
        style={{
          fontFamily: "var(--font-vazirmatn)",
        }}
      >
        <AntdRegistry>
          <RouteChangeProvider>
            <ConfigProvider
              theme={{
                token: {
                  fontFamily: vazirMatn.style.fontFamily,
                  colorPrimary: "#3177FF",
                  fontSize: 16,
                },
                components: {
                  Input: {
                    paddingBlock: 6,
                  },
                },
              }}
            >
              <GeneralProvider theme_fontFamily={vazirMatn.style.fontFamily}>
                {children}
              </GeneralProvider>
            </ConfigProvider>
          </RouteChangeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
