import { Course } from "./course";
import { Enrollment } from "./enrollment";

export type Student = {
    _id?: string,
    lastName?: string,
    firstName?: string,
    middleName?: string,
    birthday?: string,
    civilStatus?: string,
    gender?: string,
    presentAddress?: string,
    permanentAddress?: string,
    occupation?: string,
    mobileNumber?: string,
    emailAddress?: string,
    guardians?: Guardian[],
    cabinetId?: string,
    yearGraduated?: string,
    status?: string, // should be updated from latest enrollment
    type?: string, // should be updated from latest enrollment
    yearLevel?: string, // should be updated from latest enrollment
    courseId?: string, // should be updates from latest enrollment
    course?: Course, // should be updated from latest enrollment
    studentNumber?: string,
    createdBy?: string,
    lastUpdatedBy?: string,
    dateCreated?: string,
    dateLastUpdated?: string,
    latesEnrollment?: Enrollment,
    avatar?: string
}

type Guardian = {
    mobileNumber?: string;
    name?: string;
    relationship?: string;
}