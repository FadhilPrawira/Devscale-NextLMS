"use server";

import prisma from "@utils/prisma";
import { revalidatePath } from "next/cache";

export default async function requestCertificateaction(formData: FormData) {
  const certificateId = formData.get("certificateId") as string;

  // Update status certificate by userId
  await prisma.certificate.update({
    where: {
      id: certificateId,
    },
    data: {
      status: "UNDER_REVIEW",
    },
  });

  revalidatePath("/dashboard/certificates");
}
