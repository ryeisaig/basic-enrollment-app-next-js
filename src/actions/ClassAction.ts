import { addClassToCurrentClass, setCurrentClasses, setClassesError } from "@/store/enrollmentSlice";
import { apiCall } from "@/utils/ApiUtils";

export const getClassByClassCode = async (dispatch: any, classCode: string, academicPeriodId: string) => {
    const response = await apiCall(`classes?${new URLSearchParams({
        code: classCode,
        academicPeriodId: academicPeriodId
    })}`);
    const data = await response.json();
    if(data.content && data.content.length > 0){
        dispatch(addClassToCurrentClass(data.content[0]));
    } else {
        dispatch(setClassesError());
    }
}

export const getClassesBySection = async (dispatch: any, academicPeriodId: string, sectionId: string) => {
    const response = await apiCall(`classes?${new URLSearchParams({
        sectionId: sectionId,
        academicPeriodId: academicPeriodId
    })}`);
    const data = await response.json();
    dispatch(setCurrentClasses(data.content));
}