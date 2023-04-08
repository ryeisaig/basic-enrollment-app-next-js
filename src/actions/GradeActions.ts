export const getGrades = async (callback: any, studentId: string, academicPeriod?: string) => {
    const response = await fetch('/api/grades?' + new URLSearchParams({
        studentId: studentId,
        academicPeriod: academicPeriod ? academicPeriod : ''
    }));
    
    const data = await response.json();
    callback(data.content);
}