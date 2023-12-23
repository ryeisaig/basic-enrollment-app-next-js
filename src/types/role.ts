export type Role = {
    _id?: string;
    code?: string;
    name?: string;
    permissions: string[];
    status: string;
    createdBy?: string;
    lastUpdatedBy?: string;
    dateCreated?: string;
    dateLastUpdated?: string;
}