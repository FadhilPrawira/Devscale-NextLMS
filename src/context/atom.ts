import { Course, Lesson, Section } from "@prisma/client";
import { atom } from "jotai";

export const openLessonEditModalAtom = atom(false);
export const lessonDetailAtom = atom<Lesson | null>(null);

export const openSectionEditModalAtom = atom(false);
export const sectionDetailAtom = atom<Section | null>(null);

export const openCourseEditModalAtom = atom(false);
export const courseDetailAtom = atom<Course | null>(null);
