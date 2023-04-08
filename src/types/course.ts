import { College } from "./college"

export type Course = {
    _id: string,
    code: string,
    name: string,
    type: string,
    unit: number,
    college: College;
    createdBy: string,
    lastUpdatedBy: string,
    dateCreated: string,
    dateLastUpdated: string
}