import { Course } from "./course";
import { Instructor } from "./instructor";

export type Section = {
    _id?: string;
    yearLevel?: string;
    sectionNumber?: number;
    courseId?: string;
    course?: Course;
    adviserId?: string;
    adviser?: Instructor;
    maxCount: number;
    isActive?: boolean;
    createdBy?: string,
    lastUpdatedBy?: string,
    dateCreated?: string,
    dateLastUpdated?: string
}