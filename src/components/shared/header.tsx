import { Button } from "@components/button";
import serverAuth from "libs/server-auth";
import Link from "next/link";
import React from "react";

export const Header = () => {
  const auth = serverAuth();
  return (
    <header className="flex items-center justify-between px-8 py-6">
      <Link href="/">
        <div>nextlms.</div>
      </Link>
      <nav className="flex items-center gap-6 font-semibold">
        <Link href="/courses">
          <div>Courses</div>
        </Link>
        <div>Flash Sale</div>
        <Link href="/about">
          <div>About</div>
        </Link>
        {auth?.id ? (
          <Link href="/dashboard/my-courses">
            <Button size="sm" className="w-fit">
              Dashboard
            </Button>
          </Link>
        ) : (
          <>
            {" "}
            <Link href="/login">
              <div>Login</div>
            </Link>
            <Link href="/register">
              <Button size="sm" className="w-fit">
                Get Started
              </Button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};
