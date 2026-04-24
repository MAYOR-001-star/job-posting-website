import { signIn, signOut } from "next-auth/react";

export const logout = async () => {
  await signOut({ redirectTo: "/signin" });
};

export const login = async () => {
  await signIn("github", { redirectTo: "/" });
};
