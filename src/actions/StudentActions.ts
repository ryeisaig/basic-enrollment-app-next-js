import { setCurrentStudent } from "@/store/enrollmentSlice";
import { apiCall } from "@/utils/ApiUtils";

export const getStudentByStudentNumber = async (dispatch: any, studentNumber: string) => {
    const response = await apiCall(`students?${new URLSearchParams({
        studentNumber: studentNumber
    })}`);
    const data = await response.json();
    dispatch(setCurrentStudent((data.content && data.content.length > 0) ? data.content[0] : {}));
}