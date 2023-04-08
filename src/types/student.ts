export type Student = {
    _id?: string,
    lastName?: string,
    firstName?: string,
    middleName?: string,
    birthday?: string,
    civilStatus?: string,
    gender?: string,
    presentAddress?: string,
    permanentAddress?: string,
    occupation?: string,
    mobileNumber?: string,
    emailAddress?: string,
    guardians?: Guardian[],
    cabinetId?: string,
    yearGraduated?: string,
    status?: string,
    type?: string,
    yearLevel?: number,
    course?: string, 
    studentNumber?: string,
    createdBy?: string,
    lastUpdatedBy?: string,
    dateCreated?: string,
    dateLastUpdated?: string,
    lastAcademicPeriodEnrolled?: string
}

type Guardian = {
    mobileNumber?: string;
    name?: string;
    relationship?: string;
}