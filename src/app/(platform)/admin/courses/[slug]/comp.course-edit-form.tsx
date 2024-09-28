"use client";

import { Button } from "@components/button";
import { Input } from "@components/input";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { courseDetailAtom, openCourseEditModalAtom } from "context/atom";
import { useAtom } from "jotai";

import { updateCourseAction } from "./action.update-course";

export const CourseEditForm = () => {
  const [openModal, setOpenModal] = useAtom(openCourseEditModalAtom);
  const [courseDetail] = useAtom(courseDetailAtom);
  return (
    <Dialog open={openModal} onClose={() => setOpenModal(false)}>
      <div className="fixed inset-0 flex items-center justify-center bg-black/10">
        <DialogPanel className="w-[400px] rounded-lg bg-white p-12">
          <DialogTitle className="text-xl font-medium tracking-tight">Edit Course</DialogTitle>
          <form
            className="space-y-2"
            action={async (formData: FormData) => {
              await updateCourseAction(formData);
              setOpenModal(false);
            }}
          >
            <input type="hidden" name="id" defaultValue={courseDetail?.id} required />
            <Input name="title" defaultValue={courseDetail?.title} placeholder="Course Title" minLength={8} required></Input>
            <Input
              name="description"
              defaultValue={courseDetail?.description}
              placeholder="Description"
              minLength={1}
              required
            ></Input>
            <Input name="price" defaultValue={courseDetail?.price} placeholder="Price" type="number" min={500}></Input>
            <Button>Save</Button>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
