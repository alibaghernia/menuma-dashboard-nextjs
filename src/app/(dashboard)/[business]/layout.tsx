import React, { FC, PropsWithChildren } from "react";
import PanelTemplate from "./components/panel-template";
import { redirect, useParams } from "next/navigation";
import NoBusinessError from "./components/no-business-error";
import { BusinessProvider } from "@/providers/business/provider";
import auth from "@/middleware";

const DashboardLayout: FC<PropsWithChildren> = async ({
  children,
  params,
}: any) => {
  const session = await auth();
  const business = session?.user?.businesses?.find(
    (buss) => buss.uuid == params.business
  );

  if (
    !business ||
    !["manager", "employee"].includes(business?.BusinessUser.role)
  )
    return <NoBusinessError />;
  return (
    <BusinessProvider session={session!} business={business}>
      <PanelTemplate session={session!}>{children}</PanelTemplate>
    </BusinessProvider>
  );
};

export default DashboardLayout;
