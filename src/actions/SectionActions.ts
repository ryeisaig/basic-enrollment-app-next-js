import { addLookup } from "@/store/listSlice";
import { apiCall } from "@/utils/ApiUtils";

export const getSectionsByCourseAndYearLevel = async (dispatch: any, courseId?: string, yearLevel?: string) => {
    const response = await apiCall(`sections?${new URLSearchParams({
        courseId: courseId ? courseId : '',
        yearLevel: yearLevel ? yearLevel : ''
    })}`);
    const data = await response.json();
    dispatch(addLookup({section: data.content}))
}