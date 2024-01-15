export type Subject = {
    _id?: string,
    code: string,
    name?: string,
    description?: string,
    type?: "LEC" | "LAB",
    unit?: number,
    createdBy?: string,
    updatedBy?: string,
    dateCreated?: string,
    updateDateTime?: string
}