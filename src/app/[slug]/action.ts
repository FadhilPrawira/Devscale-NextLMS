"use server";

import serverAuth from "libs/server-auth";
import { redirect } from "next/navigation";
import { TransactionServices } from "services/transaction.services";

export async function buyCourseAction(formData: FormData) {
  const courseId = formData.get("courseId") as string;
  const amount = formData.get("amount") as string;
  const user = serverAuth();

  if (!user) {
    redirect("/login");
  }

  // Check if user already bought this course and already paid
  const userTransactions = await TransactionServices.getUserTransactions(user.id);
  const isAlreadyBoughtAndPaid = userTransactions.find(
    (transaction) => transaction.courseId === courseId && transaction.paymentStatus === "PAID",
  );
  const isAlreadyBoughtAndUnpaid = userTransactions.find(
    (transaction) => transaction.courseId === courseId && transaction.paymentStatus === "UNPAID",
  );
  if (isAlreadyBoughtAndPaid) {
    redirect(`/dashboard/my-courses`);
  } else if (isAlreadyBoughtAndUnpaid) {
    // Pay again
    // [TODO]  Cek apakah paymentLink sudah expired atau belum. Jika sudah expired, maka buat transaksi baru
    if (isAlreadyBoughtAndUnpaid.paymentLink) {
      redirect(isAlreadyBoughtAndUnpaid.paymentLink);
    }
  }

  // transaction
  const data = await TransactionServices.createTransaction(courseId, user.id, Number(amount));
  if (data.paymentLink) {
    redirect(data.paymentLink);
  }
}
