import { College } from "./college";

export type Course = {
    _id?: string,
    code: string,
    name: string,
    courseType: string,
    collegeId?: string;
    college?: College;
    createdBy?: string;
    lastUpdatedBy?: string;
    dateCreated?: string;
    dateLastUpdated?: string
}