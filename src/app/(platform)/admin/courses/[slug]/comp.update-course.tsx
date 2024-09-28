"use client";
import { Button } from "@components/button";
import { Course } from "@prisma/client";
import { courseDetailAtom, openCourseEditModalAtom } from "context/atom";
import { useSetAtom } from "jotai";

interface Props {
  course: Course;
}

export const UpdateCourseBtn = ({ course }: Props) => {
  const setOpenModal = useSetAtom(openCourseEditModalAtom);
  const setCourseDetail = useSetAtom(courseDetailAtom);
  return (
    <Button
      onClick={() => {
        setOpenModal(true);
        setCourseDetail(course);
      }}
      variant="secondary"
      size="sm"
      className="w-fit justify-self-end"
    >
      Edit
    </Button>
  );
};
