import { Class } from "./class";
import { Student } from "./student";

export type Grade = {
    _id: string;
    student?: Student;
    class: Class;
    grade?: string;
    removalGrade?: string;
    finalGrade?: string;
    unit: number;
    creditUnit?: number;
    status: string;
}