"use client";

import { Button } from "@components/button";
import { Input } from "@components/input";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { lessonDetailAtom, openLessonEditModalAtom } from "context/atom";
import { useAtom } from "jotai";

import { updateLessonAction } from "./action.update-lesson";

export const LessonEditForm = () => {
  const [openModal, setOpenModal] = useAtom(openLessonEditModalAtom);
  const [lessonDetail] = useAtom(lessonDetailAtom);
  return (
    <Dialog open={openModal} onClose={() => setOpenModal(false)}>
      <div className="fixed inset-0 flex items-center justify-center bg-black/10">
        <DialogPanel className="w-[400px] rounded-lg bg-white p-12">
          <DialogTitle className="text-xl font-medium tracking-tight">Edit Lesson</DialogTitle>
          <form
            className="space-y-2"
            action={async (formData: FormData) => {
              await updateLessonAction(formData);
              setOpenModal(false);
            }}
          >
            <input type="hidden" name="id" defaultValue={lessonDetail?.id} required />
            <Input name="title" defaultValue={lessonDetail?.title} placeholder="Lesson Title"></Input>
            <Input name="videoUrl" defaultValue={lessonDetail?.videoUrl} placeholder="YouTube URL"></Input>
            <Button>Save</Button>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
