import RegularityBadge from "@/components/common/typography/RegularityBadge";
import { ordinals, toTitle } from "./StringUtils";
import NotSpecified from "@/components/common/typography/NotSpecified";
import GenderAvatar from "@/components/student/GenderAvatar";
import moment from "moment";
import { periodMap } from "@/components/academicPeriod/AcademicSubPeriodDropdown";
import { Chip } from "@mui/material";

export const STUDENT = {
    PRIMARY: [
        { key: "gender", title: " ", width: "60px", presentation: GenderAvatar},
        { key: "studentNumber", title: "Student No.",  width: "140px"},
        { key: "lastName+,+firstName+middleName", title: "Name", transform: (value: string) => toTitle(value)},
        { key: "emailAddress"},
        { key: "course.code", title: "Course", width: "100px"},
        { key: "yearLevel", width: "100px", title: "Year", transform: (value: number) => value ? `${ordinals(value)} Year` : <NotSpecified />},
        { key: "cabinetId", width: "100px", title: "Cabinet"},
        { key: "type", width: "100px", presentation: RegularityBadge }
    ],
    OTHERS: [],
    PRINT: [
        { key: "studentNumber", title: "Student No.",  width: "140px"},
        { key: "firstName+middleName+lastName", title: "Name"},
        { key: "course", width: "100px"},
        { key: "yearLevel", width: "60px", title: "Year"},
        { key: "section", width: "100px"},
    ],
    SORTER: [
        { key: "updateDateTime", value: "Date Modified"},
        { key: "createDateTime", value: "Date Created"},
        { key: "studentNumber"},
        { key: "lastName"},
        { key: "course"},
        { key: "yearLevel"},
        { key: "section"},
    ]
}

export const COURSE = {
    PRIMARY: [
        { key: "code"},
        { key: "name"},
        { key: "courseType", transform: (value: string) => toTitle(value)},
        { key: "college.code", title: "College"},
        { key: "createDateTime", title: "Date Created", transform: (value: string) => moment(value).format("MM/DD/YYYY HH:mm")},
        { key: "updateDateTime", title: "Date Modified", transform: (value: string) => value !== "undefined" ? moment(value).format("MM/DD/YYYY HH:mm") : <NotSpecified/>}
    ],
    SORTER: [
        { key: "updateDateTime", value: "Date Modified"},
        { key: "createDateTime", value: "Date Created"},
        { key: "code"},
        { key: "name"},
    ]
}

export const COLLEGE = {
    PRIMARY: [
        { key: "code"},
        { key: "name"},
        { key: "createDateTime", title: "Date Created", transform: (value: string) => moment(value).format("MM/DD/YYYY HH:mm")},
        { key: "updateDateTime", title: "Date Modified", transform: (value: string) => value !== "undefined" ? moment(value).format("MM/DD/YYYY HH:mm") : <NotSpecified/>}
    ],
    SORTER: [
        { key: "updateDateTime", value: "Date Modified"},
        { key: "createDateTime", value: "Date Created"},
        { key: "code"},
        { key: "name"},
    ]
}

export const ACADEMIC_PERIOD = {
    PRIMARY: [
        { key: "year"},
        { key: "period", transform: (value: string) =>  periodMap(value)},
        { key: "enrollmentActive", title:"Current Enrollment", transform: (value: string) =>  (value === "true") ? "Yes" : "No"},
        { key: "gradingActive", title:"Current Grading", transform: (value: string) =>  (value === "true") ? "Yes" : "No"},
        { key: "createDateTime", title: "Date Created", transform: (value: string) => moment(value).format("MM/DD/YYYY HH:mm")},
        { key: "updateDateTime", title: "Date Modified", transform: (value: string) => value !== "undefined" ? moment(value).format("MM/DD/YYYY HH:mm") : <NotSpecified/>}
    ],
    SORTER: [
        { key: "updateDateTime", value: "Date Modified"},
        { key: "createDateTime", value: "Date Created"},
        { key: "year"}
    ]
}

export const ROOM = {
    PRIMARY: [
        { key: "code"},
        { key: "name"},
        { key: "type", transform: (value: string) => toTitle(value)},
        { key: "contactPerson", transform: (value: any) => value !== "undefined" ? value : <NotSpecified /> },
        { key: "contactNumber", transform: (value: any) => value !== "undefined" ? value : <NotSpecified />},
        { key: "createDateTime", title: "Date Created", transform: (value: string) => moment(value).format("MM/DD/YYYY HH:mm")},
        { key: "updateDateTime", title: "Date Modified", transform: (value: string) => value !== "undefined" ? moment(value).format("MM/DD/YYYY HH:mm") : <NotSpecified/>}
    ],
    SORTER: [
        { key: "updateDateTime", value: "Date Modified"},
        { key: "createDateTime", value: "Date Created"},
        { key: "year"}
    ]
}

export const SUBJECT = {
    PRIMARY: [
        { key: "code"},
        { key: "name"},
        { key: "description"},
        { key: "type", transform: (value: string) => toTitle(value)},
        { key: "unit"},
        { key: "createDateTime", title: "Date Created", transform: (value: string) => moment(value).format("MM/DD/YYYY HH:mm")},
        { key: "updateDateTime", title: "Date Modified", transform: (value: string) => value !== "undefined" ? moment(value).format("MM/DD/YYYY HH:mm") : <NotSpecified/>}
    ],
    SORTER: [
        { key: "updateDateTime", value: "Date Modified"},
        { key: "createDateTime", value: "Date Created"},
        { key: "year"}
    ]
}

export const INSTRUCTOR = {
    PRIMARY: [
        { key: "employeeId", title: "Employee No."},
        { key: "lastName+,+firstName+middleName", title: "Name", transform: (value: string) => toTitle(value)},
        { key: "emailAddress"},
        { key: "mobileNumber"},
        { key: "createDateTime", title: "Date Created", transform: (value: string) => moment(value).format("MM/DD/YYYY HH:mm")},
        { key: "updateDateTime", title: "Date Modified", transform: (value: string) => value !== "undefined" ? moment(value).format("MM/DD/YYYY HH:mm") : <NotSpecified/>}
    ],
    SORTER: [
        { key: "updateDateTime", value: "Date Modified"},
        { key: "createDateTime", value: "Date Created"},
        { key: "year"}
    ]
}

export const SECTION = {
    PRIMARY: [
        { key: "course.code+yearLevel+sectionNumber", title: "Section"},
        { key: "isActive", title: "Open for Enrollment", transform: (value: string) =>  (value === "true") ? "Yes" : "No"},
        { key: "adviser.lastName+,+adviser.firstName+adviser.middleName", title: "Adviser"},
        { key: "maxCount", title: "Limit"},
        { key: "createDateTime", title: "Date Created", transform: (value: string) => moment(value).format("MM/DD/YYYY HH:mm")},
        { key: "updateDateTime", title: "Date Modified", transform: (value: string) => value !== "undefined" ? moment(value).format("MM/DD/YYYY HH:mm") : <NotSpecified/>}
    ],
    SORTER: [
        { key: "updateDateTime", value: "Date Modified"},
        { key: "createDateTime", value: "Date Created"},
        { key: "year"}
    ]
}

export const CLASS = {
    PRIMARY: [
        { key: "academicPeriod.year", title: "Academic Year"},
        { key: "academicPeriod.period",  title: "Period", transform: (value: string) =>  periodMap(value)},
        { key: "code"},
        { key: "course.code+section.yearLevel+section.sectionNumber", title: "Section"},
        { key: "subject.code", title: "Subject"},
        { key: "instructor.lastName+,+instructor.firstName+instructor.middleName", title: "Instructor"},
        { key: "room.code", title: "Room"},
        { key: "schedule", title: "Schedule", json: true, transform: (values: any[]) => values.map(value => <Chip key={value} label={ value.day + " " + value.timeStart  + " - " + value.timeEnd } style={{marginRight: "5px"}}/>) },
        { key: "enrolled", title: "Enrolled"}
    ],
    SORTER: [
        { key: "updateDateTime", value: "Date Modified"},
        { key: "createDateTime", value: "Date Created"},
        { key: "code"}
    ]
}

export const GRADE = {
    PRIMARY: [
        { key: "student.studentNumber", title: "Student Number"},
        { key: "student.lastName+,+student.firstName+student.middleName", title: "Name", transform: (value: string) => toTitle(value)},
        { key: "class.code", title: "Class Code"},
        { key: "class.subject.code", title: "Subject Code"},
        { key: "class.instructor.lastName+,+class.instructor.firstName+class.instructor.middleName", title: "Instructor"},
        { key: "grade"},
        { key: "removalGrade"},
        { key: "finalGrade"},
        { key: "creditUnit"},
        { key: "status"},
    ],
    SORTER: [
        { key: "updateDateTime", value: "Date Modified"},
        { key: "createDateTime", value: "Date Created"},
    ]
}


export const USER = {
    PRIMARY: [
        { key: "username"},
        { key: "firstName+lastName", title: "Name"},
        { key: "emailAddress"},
        { key: "role.name", title: "Role"},
        { key: "status"},
        { key: "createDateTime", title: "Date Created", transform: (value: string) => moment(value).format("MM/DD/YYYY HH:mm")},
        { key: "updateDateTime", title: "Date Modified", transform: (value: string) => value !== "undefined" ? moment(value).format("MM/DD/YYYY HH:mm") : <NotSpecified/>}
    ],
    SORTER: [
        { key: "updateDateTime", value: "Date Modified"},
        { key: "createDateTime", value: "Date Created"},
    ]
}

export const ROLE = {
    PRIMARY: [
        { key: "code"},
        { key: "name"},
        { key: "status"},
        { key: "permissions", title: "Total Permissions", transform: (permissions: string) => (permissions && permissions.trim() !== 'undefined') ? permissions.split(",").length : 0},
        { key: "createDateTime", title: "Date Created", transform: (value: string) => moment(value).format("MM/DD/YYYY HH:mm")},
        { key: "updateDateTime", title: "Date Modified", transform: (value: string) => value !== "undefined" ? moment(value).format("MM/DD/YYYY HH:mm") : <NotSpecified/>}
    ],
    SORTER: [
        { key: "updateDateTime", value: "Date Modified"},
        { key: "createDateTime", value: "Date Created"},
        { key: "code"},
        { key: "name"},
    ]
}

export const ENROLLMENT = {
    PRIMARY: [
        { key: "academicPeriod", title: "Academic Period", json: true, transform: (ay: any) =>  ay.year + " - " + periodMap(ay.period)},
        { key: "student.studentNumber", title: "Student No."},
        { key: "student.lastName+,+student.firstName+student.middleName", title: "Name", transform: (value: string) => toTitle(value)},
        // { key: "courseType", title: "Type", transform: (value: string) => toTitle(value)},
        { key: "course.code", title: "Course"},
        { key: "yearLevel", title: "Year", transform: (value: number) => value ? `${ordinals(value)} Yr` : <NotSpecified />},
        { key: "enrollmentType", presentation: RegularityBadge},
        { key: "studentType", transform: (value: string) => <Chip label={toTitle(value)}/>},
        { key: "classes", title: "Total Classes", json: true, transform: (classes: any[]) => classes ? classes.length : 0},
        { key: "classes", title: "Total Units", json: true, transform: (classes: any[]) => classes ? classes.reduce((total, classObj) => { return total + parseInt(classObj.subject.unit) }, 0) : 0},
        { key: "status", transform: (value: string) => <Chip label={toTitle(value)}/>}
    ],
    SORTER: [
        { key: "updateDateTime", value: "Date Modified"},
        { key: "createDateTime", value: "Date Created"}
    ]
}

export const ENROLLED_CLASS = {
    PRIMARY: [
        { key: "code", title: "Class Code"},
        { key: "course.code+yearLevel+section.sectionNumber", title: "Section"},
        { key: "subject.code", title: "Subject Code"},
        { key: "instructor.lastName+,+instructor.firstName+instructor.middleName", title: "Instructor"},
        { key: "room.code", title: "Room"},
        { key: "schedule", title: "Schedule", json: true, transform: (values: any[]) => values?.map(value => <Chip key={value} label={ value.day + " " + value.timeStart  + " - " + value.timeEnd } style={{marginRight: "5px"}}/>) },
        { key: "subject.unit", title: "Units"}
   ]
}

export const GRADED_ENROLLED_CLASS = {
    PRIMARY: [
        { key: "class.code", title: "Class Code"},
        { key: "class.course.code+yearLevel+section.sectionNumber", title: "Section"},
        { key: "class.subject.code", title: "Subject Code"},
        { key: "class.instructor.lastName+,+instructor.firstName+instructor.middleName", title: "Instructor"},
        { key: "class.room.code", title: "Room"},
        { key: "class.schedule", title: "Schedule", json: true, transform: (values: any[]) => values?.map(value => <Chip key={value} label={ value.day + " " + value.timeStart  + " - " + value.timeEnd } style={{marginRight: "5px"}}/>) },
        { key: "finalGrade"},
        { key: "class.subject.unit", title: "Units"},
        { key: "creditUnit"},
        { key: "status"},
   ]
}