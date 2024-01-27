import React, { FC, PropsWithChildren } from "react";
import PanelTemplate from "./components/panel-template";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return <PanelTemplate>{children}</PanelTemplate>;
};

export default DashboardLayout;
