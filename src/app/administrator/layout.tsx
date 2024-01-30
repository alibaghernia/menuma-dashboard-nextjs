import React, { FC, PropsWithChildren } from "react";
import PanelTemplate from "../(dashboard)/components/panel-template";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return <PanelTemplate administrator>{children}</PanelTemplate>;
};

export default DashboardLayout;
