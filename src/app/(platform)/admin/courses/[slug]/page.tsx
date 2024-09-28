import { Button } from "@components/button";
import { redirect } from "next/navigation";
import React from "react";
import { CourseServices } from "services/course.services";

import { AddSectionBtn } from "./comp.add-section";
import { LessonEditForm } from "./comp.lesson-edit-form";
import { Sections } from "./comp.section-dnd";
import { SectionEditForm } from "./comp.section-edit-form";
import { publishCourseAction, unpublishCourseAction } from "./action.publish-course";
import { CourseEditForm } from "./comp.course-edit-form";
import { UpdateCourseBtn } from "./comp.update-course";

interface Props {
  params: {
    slug: string;
  };
}
export default async function Page({ params }: Props) {
  const course = await CourseServices.getCourseDetail(params.slug);
  if (!course) {
    redirect("/admin/courses");
  }
  // const setOpenModal = useSetAtom(openCourseEditModalAtom);
  // const setCourseDetail = useSetAtom(courseDetailAtom);

  return (
    <main className="m-auto max-w-2xl space-y-6 py-12">
      <section className="space-y-1">
        <h3>{course.title}</h3>
        <p className="font-medium text-slate-400">{course.description}</p>
        <section className="grid grid-cols-2">
          {!course.isPublished ? (
            <form action={publishCourseAction}>
              <input type="hidden" name="courseId" value={course.id} required />
              <Button size="sm" className="w-fit">
                Publish Course
              </Button>
            </form>
          ) : (
            <form action={unpublishCourseAction}>
              <input type="hidden" name="courseId" value={course.id} required />
              <Button size="sm" className="w-fit" variant="danger">
                Unpublish Course
              </Button>
            </form>
          )}

          <UpdateCourseBtn course={course} />
        </section>
      </section>
      <section className="space-y-2">
        <AddSectionBtn courseId={course.id} />
        <Sections course={course}></Sections>
      </section>
      <CourseEditForm />
      <LessonEditForm />
      <SectionEditForm />
    </main>
  );
}
