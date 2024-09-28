import prisma from "@utils/prisma";
import { NextRequest } from "next/server";

interface ReqBody {
  event: string;
  data: Record<string, string | number>;
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as ReqBody;

  console.log("Hey!");
  if (body.event === "payment.received") {
    // update tabel Transaction ubah statusPayment menjadi PAID
    const updatedTransaction = await prisma.transaction.update({
      where: {
        transactionId: body.data.productId as string,
      },
      data: {
        paymentStatus: "PAID",
      },
    });
    //   Create Access

    await prisma.courseAccess.create({
      data: {
        userId: updatedTransaction.userId,
        courseId: updatedTransaction.courseId,
      },
    });
    //   Create certificate placeholder

    await prisma.certificate.create({
      data: {
        userId: updatedTransaction.userId,
        courseId: updatedTransaction.courseId,
      },
    });

    console.log("Transaction API has been hitted");
  }

  return new Response("OK");
}
