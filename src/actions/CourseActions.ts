import { addLookup } from "@/store/listSlice";

export const getCourses = async (dispatch: any) => {
    const response = await fetch('/api/courses');
    const data = await response.json();
    dispatch(addLookup({course: data.content}))
}