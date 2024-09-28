import { Button } from "@components/button";
import { currencyFormat } from "libs/currency-format";
import serverAuth from "libs/server-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { TransactionServices } from "services/transaction.services";

export default async function Page() {
  const user = serverAuth();

  if (!user) {
    redirect("/login");
  }

  const transactions = await TransactionServices.getUserTransactions(user.id);

  return (
    <main className="space-y-6 py-12">
      <section className="space-y-1 px-12">
        <h3>Orders</h3>
        <p className="font-medium text-slate-400">Order History and Details</p>
      </section>
      <section>
        <table className="w-full table-auto">
          <thead className="border-y border-slate-200 bg-white text-left">
            <tr>
              <th className="py-5 pl-12">Course Title</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td className="py-5 pl-12">{transaction.course.title}</td>
                  <td>{currencyFormat(transaction.amount)}</td>
                  <td>
                    {transaction.paymentStatus === "PAID" ? (
                      transaction.paymentStatus
                    ) : (
                      <Link
                        href={
                          // If there is paymentStatus under the same courseId that has been PAID, disabled the link and button
                          transactions.find((t) => t.courseId === transaction.courseId && t.paymentStatus === "PAID")
                            ? "#"
                            : transaction.paymentLink
                        }
                      >
                        <Button
                          size="sm"
                          disabled={!!transactions.find((t) => t.courseId === transaction.courseId && t.paymentStatus === "PAID")}
                          className="w-fit"
                        >
                          {transaction.paymentStatus}
                        </Button>
                      </Link>
                    )}
                  </td>
                  <td>{transaction.createdAt.toDateString()}</td>
                </tr>
              );
            })}
            {transactions.length === 0 && (
              <tr className="text-balance bg-slate-50 text-center">
                <td colSpan={4} className="p-4">
                  You have no course
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}
