import { apiCall } from "@/utils/ApiUtils";

export const getCoursesByCollege = async (collegeId: string, callback: any) => {
    const response = await apiCall(`courses?collegeId=${collegeId}`);
    const data = await response.json();
    callback(data.content);
}