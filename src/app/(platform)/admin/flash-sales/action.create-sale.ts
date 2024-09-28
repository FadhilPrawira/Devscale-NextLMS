"use server";

import { revalidatePath } from "next/cache";
import { FlashSaleServices } from "services/flashsale.services";
import { z } from "zod";

const courseSchema = z.object({
  courseId: z.string().min(1),
  amount: z.number().positive().min(500),
});
// export async function createSaleAction(_: unknown, formData: FormData) {
export async function createSaleAction(prevState: unknown, formData: FormData) {
  const amount = Number(formData.get("amount"));
  const courseId = formData.get("courseId");

  const validation = courseSchema.safeParse({ courseId, amount });

  if (!validation.success) {
    return {
      status: "error",
      errors: validation.error.flatten().fieldErrors,
      data: { courseId, amount },
    };
  }
  try {
    await FlashSaleServices.createSale(validation.data.amount, validation.data.courseId);
    revalidatePath("/admin/flash-sales");
    return {
      status: "success",
      message: "Flash sale created successfully",
    };
  } catch (error) {
    // console.log(error);
    if (courseId === null) {
      return {
        status: "error",
        message: `Select a course`,
      };
    }
    return {
      status: "error",
      message: `Already on sale`,
    };
  }
}
