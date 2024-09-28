"use client";
import { Button } from "@components/button";
import { Input } from "@components/input";
import Link from "next/link";
import { useActionState } from "react";
import { useEffect, useState } from "react";
import { parseCookies, destroyCookie } from "nookies";

import { SocialLoginBtn } from "../comp.social-login";
import { loginAction } from "./action";

export default function Page() {
  const [state, formAction, pending] = useActionState(loginAction, null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const cookies = parseCookies();
    const message = cookies.verificationMessage;
    if (message) {
      setMessage(message);
      destroyCookie(null, "verificationMessage"); // Clear the cookie after reading
    }
  }, []);

  return (
    <>
      <section>
        <h3>Login</h3>
        <p>Welcome back!</p>
      </section>
      {message && <div className="msg msg-success">{message}</div>}

      <form action={formAction} className="space-y-2">
        <Input name="email" placeholder="Email" defaultValue={state?.data?.email}></Input>
        <Input name="password" placeholder="Password" type="password" defaultValue={state?.data?.password}></Input>
        <Button disabled={pending}>Login</Button>
        {state?.status === "error" && state.errors?.email ? <div className="msg msg-error">{state.errors.email}</div> : null}
        {state?.status === "error" && state.errors?.password ? <div className="msg msg-error">{state.errors.password}</div> : null}
        {state?.status === "success" && state.message !== "" ? <div className="msg msg-success">{state.message}</div> : null}
        {state?.status === "error" && state.message !== "" && !(state.errors?.email || state.errors?.password) ? (
          <div className="msg msg-error">{state.message}</div>
        ) : null}
      </form>
      <SocialLoginBtn />
      <section>
        <p>
          Don&apos;t have an account? <Link href="/register">Register</Link>
        </p>
      </section>
    </>
  );
}
