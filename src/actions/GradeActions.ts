import { apiCall } from "@/utils/ApiUtils";

export const getGradesByStudentAndAcademicPeriod = async (callback: any, studentId: string, academicPeriodId?: string) => {
    const response = await apiCall(`grades?${new URLSearchParams({
        studentId: studentId,
        academicPeriodId: academicPeriodId ? academicPeriodId : ''
    })}`);
    
    const data = await response.json();
    callback(data.content);
}