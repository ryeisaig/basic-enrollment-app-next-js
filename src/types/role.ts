export type Role = {
    _id?: string;
    code?: string;
    name?: string;
    permissions: string[];
    status: string;
    createdBy?: string;
    updatedBy?: string;
    dateCreated?: string;
    updateDateTime?: string;
}