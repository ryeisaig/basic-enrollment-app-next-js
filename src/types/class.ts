import { AcademicPeriod } from "./academicperiod";
import { Course } from "./course";
import { Instructor } from "./instructor";
import { Room } from "./room";
import { Schedule } from "./schedule";
import { Section } from "./section";
import { Subject } from "./subject";

export type Class = {
    _id?: string;
    code: string;
    academicPeriodId?: string;
    academicPeriod?: AcademicPeriod;
    subjectId?: string;
    subject?: Subject;
    courseId?: string;
    couse?: Course;
    yearLevel?: string,
    sectionId?: string;
    section?: Section;
    roomId?: string;
    room?: Room;
    instructorId?: string;
    instructor?: Instructor;
    status?: string,
    schedule: Schedule[];
    maxCount?: number;
    createdBy?: string;
    lastUpdatedBy?: string;
    dateCreated?: string;
    dateLastUpdated?: string;
}