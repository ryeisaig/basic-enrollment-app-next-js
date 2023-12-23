export type AcademicPeriod = {
    _id?: string,
    year: string,
    period: string,
    gradingActive: boolean,
    enrollmentActive: boolean,
    createdBy?: string,
    lastUpdatedBy?: string,
    dateCreated?: string,
    dateLastUpdated?: string
}