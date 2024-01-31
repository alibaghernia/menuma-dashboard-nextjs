import React, { FC, PropsWithChildren } from "react";
import PanelTemplate from "./components/panel-template";
import auth from "@/middleware";
import { redirect } from "next/navigation";
import NoBusinessError from "./components/no-business-error";
import { BusinessProvider } from "@/providers/business/provider";

const DashboardLayout: FC<PropsWithChildren> = async ({ children }) => {
  const session = await auth();
  if (session?.user?.role == "admin") return redirect("/administrator");
  const business = session?.user?.businesses?.[0];
  if (!business) return <NoBusinessError />;
  return (
    <BusinessProvider business={business}>
      <PanelTemplate>{children}</PanelTemplate>
    </BusinessProvider>
  );
};

export default DashboardLayout;
