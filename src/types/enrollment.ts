import { AcademicPeriod } from "./academicperiod";
import { Class } from "./class";
import { Course } from "./course";
import { Grade } from "./grade";
import { Section } from "./section";
import { Student } from "./student";

export type Enrollment = {
    _id?: string,
    //request: Preregistration | Admission
    studentType?: string; //"old" | "new"
    courseType?: string; //"bachelor" | "masteral"
    enrollmentType?: string; //regular | irregular
    status?: string; //"pending" | "confirmed" | "discarded"
    student?: Student,
    studentId?: string;
    yearLevel?: string;
    course?: Course;
    courseId?: string;
    sectionId?: string;
    section?: Section;
    academicPeriod?: AcademicPeriod,
    academicPeriodId?: string;
    classes: Class[],
    grades?: Grade[],
    createdBy?: string;
    lastUpdatedBy?: string;
    dateCreated?: string;
    dateLastUpdated?: string
}