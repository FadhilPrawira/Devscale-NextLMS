import { Button } from "@components/button";
import { Menu } from "@components/menu";
import serverAuth from "libs/server-auth";
import Link from "next/link";
import React from "react";

export default function Layout({ children }: React.PropsWithChildren) {
  const auth = serverAuth();
  return (
    <div className="flex h-screen">
      <aside className="flex w-[260px] flex-col gap-6 border-r border-slate-200 bg-white p-4 text-slate-950">
        <Link href="/">
          <div className="ml-3 mt-2 text-lg font-semibold tracking-tight text-black">nextlms.</div>
        </Link>
        <section>
          <h5 className="ml-3 text-xs font-medium text-slate-500">Platform Menu</h5>
          <Menu label="My Courses" href="/dashboard/my-courses"></Menu>
          <Menu label="Certificates" href="/dashboard/certificates"></Menu>
          <Menu label="Orders" href="/dashboard/orders"></Menu>
        </section>
        {auth?.role === "ADMIN" && (
          <section>
            <h5 className="ml-3 text-xs font-medium text-slate-500">Admin Menu</h5>
            <Menu label="Analytics" href="/admin/analytics"></Menu>
            <Menu label="Flash sale" href="/admin/flash-sales"></Menu>
            <Menu label="Courses" href="/admin/courses"></Menu>
            <Menu label="Certificates Approval" href="/admin/certificates-approvals"></Menu>
            <Menu label="Users" href="/admin/users"></Menu>
          </section>
        )}
        <section>
          <Link href="">
            <Button size="sm">Logout</Button>
          </Link>
        </section>
      </aside>
      <main className="h-screen w-[calc(100%-260px)] overflow-y-auto bg-white">{children}</main>
    </div>
  );
}
