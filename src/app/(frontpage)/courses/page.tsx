import { Button } from "@components/button";
import { Header } from "@components/shared/header";
import React from "react";
import { CourseServices } from "services/course.services";
import { currencyFormat } from "libs/currency-format";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@components/shared/footer";
interface Props {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: Props) {
  const courses = await CourseServices.getAllCourses();
  return (
    <main>
      <Header />
      <section className="space-y-4 bg-slate-950 p-24 text-white">
        <div className="m-auto max-w-7xl space-y-4">
          <h2>Courses</h2>
          <h3 className="w-1/2 whitespace-pre-line font-normal text-indigo-200">All courses have great mentor and curriculum</h3>
        </div>
      </section>
      <section className="mx-32 -mt-12 space-y-4 rounded-2xl bg-slate-200 p-24">
        <div className="grid grid-cols-3 gap-10">
          {courses
            .filter((course) => course.isPublished)
            .map((course) => {
              return (
                <main key={course.id} className="relative space-y-4">
                  <h4>{course.title}</h4>
                  <div className="overflow-hidden rounded-xl bg-white">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/devscale-nextlms/courses/${course.id}/${course.coverImage}`}
                      alt={course.title}
                      width={1000}
                      height={500}
                    />
                  </div>
                  {course.flashSales?.id && (
                    <div className="absolute right-4 top-4 z-10 rounded-lg bg-slate-950 px-3 py-2 font-bold text-white">
                      Flash sale
                    </div>
                  )}
                  <div className="grid grid-cols-3 gap-2">
                    <Button size="sm" variant="primary" className="col-span-2 shadow-slate-600">
                      Buy {course.flashSales?.id ? currencyFormat(course.flashSales.newAmount) : currencyFormat(course.price)}
                    </Button>
                    <Link href={`/${course.slug}`}>
                      <Button size="sm" variant="primary" className="shadow-slate-600">
                        View
                      </Button>
                    </Link>
                  </div>
                </main>
              );
            })}
        </div>
      </section>
      <Footer />
    </main>
  );
}
