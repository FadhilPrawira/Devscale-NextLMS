"use server";

import { google } from "@utils/arctic";
import { generateCodeVerifier, generateState } from "arctic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginWithGoogle(_: FormData) {
  const state = generateState();
  const code = generateCodeVerifier();

  cookies().set("code", code);

  const url = await google.createAuthorizationURL(state, code, {
    scopes: ["profile", "email"],
  });

  redirect(url.href);
}
