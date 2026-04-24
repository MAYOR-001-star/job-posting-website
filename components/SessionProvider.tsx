"use client";

import { SessionProvider as Provider } from "next-auth/react";
import type { Session } from "next-auth";

type SessionProps = {
  children: React.ReactNode;
  session: Session | null;
};

export default function SessionProvider({
  children,
  session,
}: SessionProps) {
  return (
    <Provider session={session}>
      {children}
    </Provider>
  );
}