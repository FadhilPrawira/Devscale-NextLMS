"use server";

import { revalidatePath } from "next/cache";
import { CourseServices } from "services/course.services";
import { z } from "zod";

const updatedCourseSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(8),
  description: z.string().min(1),
  price: z.number().positive().min(500),
  // coverImage: z.instanceof(File),
});
export async function updateCourseAction(formData: FormData) {
  const id = formData.get("id");
  const title = formData.get("title");
  const description = formData.get("description");
  const price = Number(formData.get("price"));

  const validation = updatedCourseSchema.safeParse({ id, title, description, price });

  if (!validation.success) {
    return {
      status: "error",
      errors: validation.error.flatten().fieldErrors,
      data: { id, title, description, price },
    };
  }
  // update Course
  await CourseServices.updateCourse({
    id: validation.data.id,
    title: validation.data.title,
    description: validation.data.description,
    price: validation.data.price,
  });
  revalidatePath("/admin/courses/[slug]", "page");
}
