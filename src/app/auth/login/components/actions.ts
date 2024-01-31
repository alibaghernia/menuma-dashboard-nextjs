import { AuthError } from "next-auth";
import { signIn } from "next-auth/react";

export const submit = async (
  prevState: string | undefined,
  data: Record<string, unknown>
) => {
  try {
    console.log({
      data,
    });
    await signIn("credentials", data);
  } catch (error) {
    if (error instanceof AuthError) {
      console.log({
        error,
      });
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
