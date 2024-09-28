import Link from "next/link";
import React from "react";
import { CourseServices } from "services/course.services";

interface Props {
  params: {
    slug: string;
    lessonSlug: string;
  };
}
export default async function Page({ params }: Props) {
  const course = await CourseServices.getCourseDetail(params.slug);
  const lesson = await CourseServices.getLessonDetail(params.lessonSlug);

  return (
    <main className="flex h-screen">
      <aside className="w-[300px] border-r">
        {course?.sections.map((section) => {
          return (
            <div key={section.id} className="p-2">
              <h4>{section.title}</h4>
              {section.lessons.map((lesson) => {
                return (
                  <Link href={`/dashboard/my-courses/${course.slug}/${lesson.slug}`} className="block" key={lesson.id}>
                    <div className="p-2 hover:bg-indigo-600 hover:text-white">{lesson.title}</div>
                  </Link>
                );
              })}
            </div>
          );
        })}
      </aside>
      <section className="w-[calc(100%-300px)] space-y-8 p-12">
        <iframe
          src={`https://youtube.com/embed/${lesson?.videoUrl ?? ""}`}
          width="100%"
          height="100%"
          className="h-[70vh] rounded-xl"
        ></iframe>
      </section>
    </main>
  );
}
