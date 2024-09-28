"use client";

import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { useOptimistic } from "react";
import { CourseServices } from "services/course.services";

import { updateSectionsIndex } from "./action.update-section-index";
import { SectionCard } from "./comp.section-card";

interface Props {
  course: Awaited<ReturnType<typeof CourseServices.getCourseDetail>>;
}
export const Sections = ({ course }: Props) => {
  const [optimisticState, setOptimisticState] = useOptimistic(course?.sections);

  if (course?.sections.length === 0) return null;

  async function onDragEnd(result: DropResult) {
    if (!result.destination) return;
    if (!course?.sections) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    // console.log({ sourceIndex, destinationIndex });

    const newSections = [...course.sections];
    const [movedSection] = newSections.splice(sourceIndex, 1);
    newSections.splice(destinationIndex, 0, movedSection);

    // Update ke client
    const reorderedSections = newSections.map((section, index) => ({
      ...section,
      index: index,
    }));

    setOptimisticState(reorderedSections);

    // Update ke server
    const formData = new FormData();
    formData.append("sourceIndex", sourceIndex.toString());
    formData.append("destinationIndex", destinationIndex.toString());
    formData.append("courseId", course.id);

    await updateSectionsIndex(formData);
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="sections">
        {(droppableProvided) => {
          return (
            <section className="space-y-2" {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
              {optimisticState?.map((section, index) => {
                return <SectionCard section={section} key={section.id} index={index} />;
              })}
            </section>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};
