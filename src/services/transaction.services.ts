import prisma from "@utils/prisma";

import { CourseServices } from "./course.services";
import { UserServices } from "./user.services";

export const TransactionServices = {
  createTransaction: async (courseId: string, userId: string, amount: number) => {
    const courseDetail = await CourseServices.getCourseDetail(courseId);
    if (!courseDetail) {
      throw new Error("Course not found!");
    }

    const user = await UserServices.findUser(userId);

    // hit API dari payment gateway
    // Production [api.mayar.id]

    const res = await fetch(`${process.env.MAYAR_HEADLESS_API_URL_PRODUCTION}/payment/create`, {
      //Sandbox [api.mayar.club]
      // const res = await fetch(`${process.env.MAYAR_HEADLESS_API_URL_SANDBOX}/payment/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MAYAR_API_KEY_PRODUCTION}`,
        // Authorization: `Bearer ${process.env.MAYAR_API_KEY_SANDBOX}`, // Sandbox
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user?.name,
        email: user?.email,
        amount: Number(amount),
        description: `Payment for ${courseDetail.title}`,
        mobile: "000000000000",
      }),
    });
    console.log(res);

    // receive response

    const data = (await res.json()) as { data: { link: string; id: string } };
    console.log(data);

    // insert table transaction
    const transaction = await prisma.transaction.create({
      data: {
        course: {
          connect: {
            id: courseId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
        paymentStatus: "UNPAID",
        amount,
        paymentLink: data.data.link,
        transactionId: data.data.id,
      },
    });

    return transaction;
  },

  getUserTransactions: async (userId: string) => {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
      },
      include: {
        course: true,
      },
    });

    return transactions;
  },
  getTransactions: async () => {
    const transactions = await prisma.transaction.findMany({
      include: {
        course: true,
        user: true,
      },
    });

    return transactions;
  },
  getCurrentRevenues: async () => {
    const currentRevenues = await prisma.transaction.findMany({
      select: { amount: true },
    });

    const totalAmount = currentRevenues.reduce((currValue, trx) => trx.amount + currValue, 0);
    return totalAmount;
  },

  getTransactionsByCourse: async (idOrSlug: string) => {
    const transactions = await prisma.transaction.findMany({
      where: {
        OR: [
          { id: idOrSlug },
          {
            course: { slug: idOrSlug },
          },
        ],
      },
      include: {
        course: true,
        user: true,
      },
    });
    return transactions;
  },
};
