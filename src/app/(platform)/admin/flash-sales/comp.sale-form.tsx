"use client";
import { Button } from "@components/button";
import { Input, Select } from "@components/input";
import { Course } from "@prisma/client";
import { useActionState } from "react";

import { createSaleAction } from "./action.create-sale";

interface Props {
  courses: Course[];
}

export const SaleForm = ({ courses }: Props) => {
  // const [_, formAction, pending] = useActionState(createSaleAction, null);
  const [state, formAction, pending] = useActionState(createSaleAction, null);
  // console.log(state);
  return (
    <form action={formAction} className="space-y-2">
      <Input name="amount" type="number" placeholder="New amount" disabled={courses.length === 0} required min={500} />
      <Select name="courseId">
        <option selected disabled>
          Select Course
        </option>
        {courses.map((course) => {
          return (
            <option key={course.id} value={course.id} disabled={!course.isPublished}>
              {course.title} {course.isPublished ? "" : "(Not published)"}
            </option>
          );
        })}
        {courses.length === 0 && (
          <option selected disabled>
            No courses available
          </option>
        )}
      </Select>
      <Button disabled={pending}>Create Sale</Button>
      {state?.status === "error" ? <div className="msg msg-error">{state.message}</div> : null}
      {state?.status === "success" ? <div className="msg msg-success">{state.message}</div> : null}
    </form>
  );
};
