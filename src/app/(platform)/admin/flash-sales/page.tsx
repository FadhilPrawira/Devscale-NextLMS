import { Button } from "@components/button";
import { currencyFormat } from "libs/currency-format";
import serverAuth from "libs/server-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { CourseServices } from "services/course.services";
import { FlashSaleServices } from "services/flashsale.services";

import { deleteSaleAction } from "./action.delete-sale";
import { SaleForm } from "./comp.sale-form";

export default async function Page() {
  const auth = serverAuth();

  if (!auth) {
    redirect("/login");
  }
  const courses = await CourseServices.getAllCourses();
  const flashSales = await FlashSaleServices.getALlFlashSale();
  return (
    <main className="m-auto max-w-2xl space-y-6 py-12">
      <h3>Flash Sale</h3>
      <SaleForm courses={courses} />
      <section>
        {flashSales.map((flashsale) => {
          return (
            <div key={flashsale.id} className="flex items-center gap-6 rounded-xl border bg-white p-4">
              <div>
                <Image
                  alt={flashsale.course.title}
                  src={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/devscale-nextlms/courses/${flashsale.course.id}/${flashsale.course.coverImage}`}
                  width={160}
                  height={100}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <h4>{flashsale.course.title}</h4>
                <p>{currencyFormat(flashsale.newAmount)}</p>
                <form action={deleteSaleAction}>
                  <input type="hidden" name="saleId" value={flashsale.id} required />
                  <Button variant="danger" size="sm">
                    Delete Sale
                  </Button>
                </form>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
