import { Button } from "@components/button";
import React from "react";

import { addSectionAction } from "./action.add-section";

export const AddSectionBtn = ({ courseId }: { courseId: string }) => {
  return (
    <form action={addSectionAction}>
      <input type="hidden" name="courseId" value={courseId} required />
      <Button variant="secondary" size="sm">
        Add Section
      </Button>
    </form>
  );
};
