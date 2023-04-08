import { setListState, setLoadingState } from "@/store/listSlice";

export const getStudents = async (params: any, dispatch: any) => {
    dispatch(setLoadingState(true));
    const response = await fetch('/api/students?' + new URLSearchParams({
        page: params.page || 0,
        rowsPerPage: params.rowsPerPage || 5,
        keyword: params.keyword || null,
        ...params.sort,
        ...params.filters
    }));
    const data = await response.json();
    dispatch(setListState({
        data: data.content, 
        loading: false, 
        totalElements: data.totalElements,
        ...params
    }));
}

export const saveStudent = async(newStudent: any, dispatch: any) => {
    dispatch(setLoadingState(true));
    await fetch('/api/students', {
        method: 'POST', 
        body: JSON.stringify(newStudent),
        headers: {
            'Content-Type' : 'application/json'
        }});
    dispatch(setListState({loading: false}));
}

export const deleteStudent = async(id: string, dispatch: any) => {
    dispatch(setLoadingState(true));
    await fetch('/api/students?' + new URLSearchParams({id: id}), 
        { method: 'DELETE' });
    dispatch(setListState({loading: false}));
}