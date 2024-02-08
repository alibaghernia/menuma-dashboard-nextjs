"use server";

import { signOut } from "@/lib/auth";
import { redirect } from "next/navigation";

export const logOut = async () => {
  await signOut();
  redirect("/auth/login");
};
