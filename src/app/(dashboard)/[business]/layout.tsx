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
  const business_uuid = params.business;
  const business_uuid_isvalid =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      business_uuid
    );
  const session = await auth();
  const business = session?.user?.businesses?.find(
    (buss) => buss.uuid == business_uuid
  );

  if (
    !business_uuid_isvalid ||
    !business ||
    !["manager", "employee"].includes(business?.BusinessUser?.role)
  )
    return (
      <NoBusinessError
        message={
          business_uuid_isvalid
            ? "شما مجوز لازم برای دسترسی به پنل را ندارید!"
            : "شناسه کسب و کار نامعتبر است!"
        }
      />
    );
  return (
    <BusinessProvider session={session!} business={business}>
      <PanelTemplate session={session!}>{children}</PanelTemplate>
    </BusinessProvider>
  );
};

export default DashboardLayout;
