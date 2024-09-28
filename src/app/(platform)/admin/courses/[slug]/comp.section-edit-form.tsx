"use client";

import { Button } from "@components/button";
import { Input } from "@components/input";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { openSectionEditModalAtom, sectionDetailAtom } from "context/atom";
import { useAtom } from "jotai";

import { updateSectionAction } from "./action.update-section";

export const SectionEditForm = () => {
  const [openModal, setOpenModal] = useAtom(openSectionEditModalAtom);
  const [sectionDetail] = useAtom(sectionDetailAtom);
  return (
    <Dialog open={openModal} onClose={() => setOpenModal(false)}>
      <div className="fixed inset-0 flex items-center justify-center bg-black/10">
        <DialogPanel className="w-[400px] rounded-lg bg-white p-12">
          <DialogTitle className="text-xl font-medium tracking-tight">Edit Section</DialogTitle>
          <form
            className="space-y-2"
            action={async (formData: FormData) => {
              await updateSectionAction(formData);
              setOpenModal(false);
            }}
          >
            <input type="hidden" name="id" defaultValue={sectionDetail?.id} required />
            <Input name="title" defaultValue={sectionDetail?.title} placeholder="Section Title"></Input>

            <Button>Save</Button>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
