"use server";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserServices } from "services/user.services";
import z from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
export async function loginAction(prevState: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const validation = loginSchema.safeParse({ email, password });
  if (!validation.success) {
    return {
      status: "error",
      errors: validation.error.flatten().fieldErrors,
      data: {
        email,
        password,
      },
    };
  }

  const user = await UserServices.findUser(email);

  if (!user) {
    return {
      status: "error",
      message: "User not found",
      data: {
        email,
        password,
      },
    };
  }

  if (!user.isVerified) {
    return {
      status: "error",
      message: "Verify your account first",
    };
  }

  if (!user.password) {
    return {
      status: "error",
      message: "You might create your account with Google. Please try continue with Google.",
    };
  }

  if (user.onBanned) {
    return {
      status: "error",
      message: "Your account has been banned. Contact admin at admin@example.com.",
    };
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return {
      status: "error",
      message: "Invalid credentials",
      data: {
        email,
        password,
      },
    };
  }

  // Generate JWT token

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatarUrl,
  };

  const jwtToken = jwt.sign(payload, process.env.JWT_SECRET);
  cookies().set("token", jwtToken, {
    httpOnly: true,
    path: "/",
  });
  redirect("/my-courses");
}
