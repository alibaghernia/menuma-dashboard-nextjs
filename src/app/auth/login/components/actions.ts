import { AuthError } from "next-auth";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export const submit = async (
  prevState: string | undefined,
  data: Record<string, unknown>
) => {
  try {
    const res = await signIn("credentials", {
      redirect: false,
      ...data,
    });
    if (!res?.error) redirect("/");
    else return res?.error;
  } catch (error) {
    console.log({
      loginError: error,
    });
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
};
