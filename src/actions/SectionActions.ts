import { addLookup } from "@/store/listSlice";

export const getSection = async (dispatch: any, courseId?: string, yearLevel?: string) => {
    const response = await fetch('/api/sections?' + new URLSearchParams({
        courseId: courseId ? courseId : '',
        yearLevel: yearLevel ? yearLevel : ''
    }));
    const data = await response.json();
    dispatch(addLookup({section: data.content}))
}