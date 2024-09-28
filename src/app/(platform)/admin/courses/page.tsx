import { Button } from "@components/button";
import { Card } from "@components/card";
import serverAuth from "libs/server-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CourseServices } from "services/course.services";

export default async function Page() {
  const auth = serverAuth();

  if (!auth) {
    redirect("/login");
  }
  const courses = await CourseServices.getAllCourses();
  return (
    <main className="space-y-8 px-12 pt-12">
      <section className="flex items-center justify-between">
        <h3>Courses</h3>

        <Link href="/admin/courses/new">
          <Button className="w-fit" size="sm">
            Create Course
          </Button>
        </Link>
      </section>
      <section className="grid grid-cols-4 gap-6">
        {courses.map((course) => {
          return (
            <div key={course.id} className="relative overflow-hidden rounded-xl border bg-white shadow-sm">
              <Image
                src={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/devscale-nextlms/courses/${course.id}/${course.coverImage}`}
                alt={course.title}
                width={1000}
                height={500}
              />
              <section className="space-y-3 p-4">
                <div>{course.title}</div>
                <div className="grid grid-cols-2 gap-3">
                  <Link href={`/admin/courses/${course.slug}/stats`}>
                    <Button size="sm">Stats</Button>
                  </Link>
                  <Link href={`/admin/courses/${course.slug}`}>
                    <Button size="sm">Edit Content</Button>
                  </Link>
                </div>
              </section>
            </div>
          );
        })}
      </section>
      {courses.length === 0 && (
        <Card className="text-balance bg-slate-50 text-center">
          <h5>You have no course</h5>
        </Card>
      )}
    </main>
  );
}
