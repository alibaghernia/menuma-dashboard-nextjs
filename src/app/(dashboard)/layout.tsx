import React, { FC, PropsWithChildren } from "react";
import auth from "@/middleware";
import { redirect, useParams } from "next/navigation";
import NoBusinessError from "./[business]/components/no-business-error";

const DashboardLayout = async ({ children }: any) => {
  const session = await auth();
  if (session?.user?.role == "admin") return redirect("/administrator");
  if (!session?.user?.businesses?.length) return <NoBusinessError />;

  return children;
};

export default DashboardLayout;
