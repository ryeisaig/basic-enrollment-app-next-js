import { College } from "./college";
import { Role } from "./role";

export type User = {
    _id?: string;
    username?: string;
    emailAddress?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    status?: string;
    accessType?: string;
    role?: Role
    roleId?: string;
    college?: College;
    collegeId?: string;
    createdBy?: string;
    lastUpdatedBy?: string;
    dateCreated?: string;
    dateLastUpdated?: string;
}