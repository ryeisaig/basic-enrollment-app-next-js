export type Subject = {
    _id?: string,
    code: string,
    name?: string,
    description?: string,
    type?: "LEC" | "LAB",
    unit?: number,
    createdBy?: string,
    lastUpdatedBy?: string,
    dateCreated?: string,
    dateLastUpdated?: string
}