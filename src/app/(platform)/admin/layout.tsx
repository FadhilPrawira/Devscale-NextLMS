import serverAuth from "libs/server-auth";
import { redirect } from "next/navigation";
import React from "react";

export default function Layout({ children }: React.PropsWithChildren) {
  const auth = serverAuth();
  if (auth?.role !== "ADMIN") {
    redirect("/dashboard/my-courses");
  }
  return <div>{children}</div>;
}
