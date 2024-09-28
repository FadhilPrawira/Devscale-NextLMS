import { Button } from "@components/button";
import React from "react";

import { addLessonAction } from "./action.add-lesson";

export const AddLessonBtn = ({ sectionId }: { sectionId: string }) => {
  return (
    <form action={addLessonAction}>
      <input type="hidden" name="sectionId" value={sectionId} required />
      <Button size="sm">Add Lesson</Button>
    </form>
  );
};
