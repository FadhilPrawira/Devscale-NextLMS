"use server";

import prisma from "@utils/prisma";
import { revalidatePath } from "next/cache";

export async function markLessonAsPreviewAction(formData: FormData) {
  const lessonId = formData.get("lessonId") as string;

  // mark lesson as preview
  await prisma.lesson.update({ where: { id: lessonId }, data: { isPreview: true } });
  revalidatePath("/admin/courses/[slug]", "page");
}

export async function unmarkLessonAsPreviewAction(formData: FormData) {
  const lessonId = formData.get("lessonId") as string;

  // mark lesson as preview
  await prisma.lesson.update({ where: { id: lessonId }, data: { isPreview: false } });
  revalidatePath("/admin/courses/[slug]", "page");
}
