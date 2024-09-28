"use server";

import prisma from "@utils/prisma";
import { revalidatePath } from "next/cache";
import { CourseServices } from "services/course.services";

export async function publishCourseAction(formData: FormData) {
  const courseId = formData.get("courseId") as string;

  // publish course
  await prisma.course.update({
    where: { id: courseId },
    data: { isPublished: true },
  });
  revalidatePath("/admin/courses/[slug]", "page");
}

export async function unpublishCourseAction(formData: FormData) {
  const courseId = formData.get("courseId") as string;

  // unpublish course
  await prisma.course.update({
    where: { id: courseId },
    data: { isPublished: false },
  });
  revalidatePath("/admin/courses/[slug]", "page");
}
