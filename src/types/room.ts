import { College } from "./college"

export type Room = {
    _id: string,
    code: string,
    name: string,
    type: string;
    college: College;
    createdBy: string,
    lastUpdatedBy: string,
    dateCreated: string,
    dateLastUpdated: string
}