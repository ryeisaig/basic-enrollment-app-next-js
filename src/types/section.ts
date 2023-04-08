import { Course } from "./course";

export type Section = {
    _id: string;
    year: number;
    sectionNumber: number;
    course: Course;
    createdBy: string,
    lastUpdatedBy: string,
    dateCreated: string,
    dateLastUpdated: string
}