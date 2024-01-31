import "@/assets/styles/globals.scss";
import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { GeneralProvider } from "@/providers/general/provider";
import { RouteChangeProvider } from "@/providers/routeChange/provider";
import faIR from "antd/locale/fa_IR";
import _ from "lodash";
import LocaleProvider from "antd/lib/locale";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "داشبورد - منوما",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <AntdRegistry>
          <LocaleProvider locale={faIR}>
            <ConfigProvider
              direction="rtl"
              theme={{
                token: {
                  colorPrimary: "#3177FF",
                  fontSize: 16,
                },
                components: {
                  Input: {
                    paddingBlock: 6,
                  },
                },
              }}
              locale={faIR}
            >
              <SessionProvider>
                <RouteChangeProvider>
                  <GeneralProvider>{children}</GeneralProvider>
                </RouteChangeProvider>
              </SessionProvider>
            </ConfigProvider>
          </LocaleProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
