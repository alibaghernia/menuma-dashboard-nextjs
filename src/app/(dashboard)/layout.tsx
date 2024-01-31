import React, { FC, PropsWithChildren } from "react";
import PanelTemplate from "./components/panel-template";
import auth from "@/middleware";
import { redirect } from "next/navigation";

const DashboardLayout: FC<PropsWithChildren> = async ({ children }) => {
  const session = await auth();
  if (session?.user?.role == "admin") return redirect("/administrator");
  return <PanelTemplate>{children}</PanelTemplate>;
};

export default DashboardLayout;
