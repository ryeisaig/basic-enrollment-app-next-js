import moment from "moment"

export const mmddyyyy = (value: any) => {
    return moment(value).format("MM/DD/YYYY");
}