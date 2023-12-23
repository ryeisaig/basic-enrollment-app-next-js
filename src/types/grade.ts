import { AcademicPeriod } from "./academicperiod";
import { Class } from "./class";
import { Student } from "./student";

export type Grade = {
    _id: string;
    studentId?: string;
    student?: Student;
    classId?: string;
    class?: Class;
    academicPeriod?: AcademicPeriod,
    academicPeriodId?: string;
    grade?: string;
    removalGrade?: string;
    finalGrade?: string;
    creditUnit?: number;
    status: string; //draft | submitted | reviewed | finalized
}