import GenderAvatar from "@/components/student/GenderAvatar";
import RegularityBadge from "@/components/common/RegularityBadge";

export const STUDENT = {
    PRIMARY: [
        { key: "gender", title: " ", width: "60px", presentation: GenderAvatar},
        { key: "studentNumber", title: "Student No.",  width: "140px"},
        { key: "firstName+middleName+lastName", title: "Name"},
        { key: "emailAddress"},
        { key: "course", width: "100px"},
        { key: "yearLevel", width: "60px", title: "Year"},
        { key: "cabinetId", width: "100px", title: "Cabinet"},
        { key: "type", width: "100px", presentation: RegularityBadge},
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
        { key: "studentNumber"},
        { key: "lastName"},
        { key: "course"},
        { key: "yearLevel"},
        { key: "section"},
    ]
}

export const GRADE = {
    PRINT: []
}