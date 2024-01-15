import { College } from "./college";

export type Course = {
    _id?: string,
    code: string,
    name: string,
    courseType: string,
    collegeId?: string;
    college?: College;
    createdBy?: string;
    updatedBy?: string;
    dateCreated?: string;
    updateDateTime?: string
}