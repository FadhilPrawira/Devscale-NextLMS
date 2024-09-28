import prisma from "@utils/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("user");
  const code = searchParams.get("code");
  if (!userId || !code) {
    return Response.json({ message: "No user and verification code found" });
  }
  const unverifiedUser = await prisma.user.findFirst({
    where: {
      AND: [
        {
          id: userId,
        },
        {
          isVerified: false,
        },
        {
          verificationCode: {
            code,
          },
        },
      ],
    },
  });

  if (!unverifiedUser) {
    return Response.json({ message: "No user and verification code found in database" });
  }
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      isVerified: true,
    },
  });

  // return Response.json({ message: "User verified, please login" });
  // return new Response(
  //   `
  // <html>
  //   <body>
  //     <h1>User verified, please login</h1>
  //   </body>
  // </html>`,
  //   {
  //     headers: { "Content-Type": "text/html" },
  //   },
  // );
  // Set a cookie with the message
  cookies().set("verificationMessage", "User verified, please login", { path: "/" });

  redirect("/login");
}
