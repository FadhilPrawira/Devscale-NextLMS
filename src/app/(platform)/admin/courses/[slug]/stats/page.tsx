import { currencyFormat } from "libs/currency-format";
import serverAuth from "libs/server-auth";
import { redirect } from "next/navigation";
import React from "react";
import { CourseServices } from "services/course.services";
import { TransactionServices } from "services/transaction.services";

interface Props {
  params: {
    slug: string;
  };
}
export default async function Page({ params }: Props) {
  const auth = serverAuth();

  if (!auth) {
    redirect("/login");
  }

  const transactions = await TransactionServices.getTransactionsByCourse(params.slug);
  const courseDetail = await CourseServices.getCourseDetail(params.slug);

  return (
    <main className="space-y-4 py-12">
      <section className="space-y-2 px-12">
        <h3>Course Statistic</h3>
        <p>Here is all time analytics for course: {courseDetail?.title}</p>
      </section>
      <section>
        <table className="w-full table-auto">
          <thead className="border-y border-slate-200 bg-white text-left">
            <tr>
              <th className="py-5 pl-12">Student Name</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td className="py-5 pl-12">{transaction.user.name}</td>
                  <td>{currencyFormat(transaction.amount)}</td>
                  <td>{transaction.paymentStatus}</td>
                  <td>{transaction.createdAt.toDateString()}</td>
                </tr>
              );
            })}
            {transactions.length === 0 && (
              <tr className="text-balance bg-slate-50 text-center">
                <td colSpan={4} className="p-4">
                  You have no student in this course
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}
