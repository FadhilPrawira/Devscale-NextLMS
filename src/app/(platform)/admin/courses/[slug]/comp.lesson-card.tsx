"use client";
import { Button } from "@components/button";
import { Card } from "@components/card";
import { Draggable } from "@hello-pangea/dnd";
import { Lesson } from "@prisma/client";
import { lessonDetailAtom, openLessonEditModalAtom } from "context/atom";
import { useSetAtom } from "jotai";

import { deleteLessonAction } from "./action.delete-lesson";
import { markLessonAsPreviewAction, unmarkLessonAsPreviewAction } from "./action.mark-lesson-as-preview";

interface Props {
  lesson: Lesson;
  index: number;
}

export const LessonCard = ({ lesson, index }: Props) => {
  const setOpenModal = useSetAtom(openLessonEditModalAtom);
  const setLessonDetail = useSetAtom(lessonDetailAtom);
  return (
    <Draggable draggableId={lesson.id} index={index}>
      {(draggableProvided) => {
        return (
          <Card className="p-2" {...draggableProvided.draggableProps} ref={draggableProvided.innerRef}>
            <section className="flex items-center justify-between">
              <div className="ml-2 flex items-center gap-2">
                <div {...draggableProvided.dragHandleProps}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M8 6h.006M8 12h.006M8 18h.006m7.988-12H16m-.006 6H16m-.006 6H16"
                      color="currentColor"
                    ></path>
                  </svg>
                </div>
                <div>{lesson.title}</div>
              </div>
              <div className="flex gap-2">
                {!lesson.isPreview ? (
                  <form action={markLessonAsPreviewAction}>
                    <input type="hidden" name="lessonId" value={lesson.id} required />
                    <Button variant="secondary" size="sm" className="w-fit">
                      Mark as preview
                    </Button>
                  </form>
                ) : (
                  <form action={unmarkLessonAsPreviewAction}>
                    <input type="hidden" name="lessonId" value={lesson.id} required />
                    <Button variant="primary" size="sm" className="w-fit">
                      Unmark as preview
                    </Button>
                  </form>
                )}
                <Button
                  onClick={() => {
                    setOpenModal(true);
                    setLessonDetail(lesson);
                  }}
                  variant="secondary"
                  size="sm"
                  className="w-fit"
                >
                  Edit
                </Button>

                <form action={deleteLessonAction}>
                  <input type="hidden" name="lessonId" value={lesson.id} required />
                  <Button variant="danger" size="sm" className="w-fit">
                    Delete
                  </Button>
                </form>
              </div>
            </section>
          </Card>
        );
      }}
    </Draggable>
  );
};
