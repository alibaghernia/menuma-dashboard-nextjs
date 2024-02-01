import React, { FC, PropsWithChildren } from "react";
import PanelTemplate from "../(dashboard)/components/panel-template";
import auth from "@/middleware";
import { redirect } from "next/navigation";
import Forbidden from "./components/forbidden";

const DashboardLayout: FC<PropsWithChildren> = async ({ children }) => {
  const session = await auth();
  if (session?.user?.role != "admin") return <Forbidden />;
  return (
    <PanelTemplate session={session} administrator>
      {children}
    </PanelTemplate>
  );
};

export default DashboardLayout;
