import { addLookup, setListState, setLoadingState } from "@/store/listSlice";
import { HttpMethod } from "@/utils/ApiConstants";
import { apiCall } from "@/utils/ApiUtils";

export const save = async(resource: string, newData: any, dispatch: any, forceRemoveId?: boolean) => {
    forceRemoveId && delete newData._id;
    dispatch(setLoadingState(true));
    await apiCall(resource, {
        method: HttpMethod.POST, 
        body: JSON.stringify(newData),
        headers: {
            'Content-Type' : 'application/json'
        }});
    dispatch(setListState({loading: false}));
}

export const saveNoDispatch = async(resource: string, newData: any, forceRemoveId?: boolean) => {
    forceRemoveId && delete newData._id;
    return await apiCall(resource, {
        method: HttpMethod.POST, 
        body: JSON.stringify(newData),
        headers: {
            'Content-Type' : 'application/json'
        }});
}

export const getList = async (resource: string, params: any, dispatch: any) => {
    dispatch(setLoadingState(true));
    const response = await apiCall(`${resource}?${new URLSearchParams({
        page: params.page || 0,
        rowsPerPage: params.rowsPerPage || 5,
        keyword: params.keyword || "",
        ...params.sort,
        ...params.filters
    })}`);
    const data = await response.json();
    dispatch(setListState({
        data: data.content, 
        loading: false, 
        totalElements: data.totalElements,
        ...params
    }));
}

export const getAll = async (resource: string, lookupKey: string, dispatch: any) => {
    const response = await apiCall(resource);
    const data = await response.json();
    dispatch(addLookup({[lookupKey]: data.content}))
}

export const getPotentialMatches = async (resource: string, filters: any) => {
    const response = await apiCall(`${resource}/validate?${new URLSearchParams({
        ...filters
    })}`);
    return await response.json();
}

export const getById = async (resource: string, id: any) => {
    const response = await apiCall(`${resource}/${id}`);
    const data = await response.json();
    return data;
}

export const deleteOne = async(resource: string, id: string, dispatch: any) => {
    dispatch(setLoadingState(true));
    await apiCall(`${resource}/${id}`, 
        { method: HttpMethod.DELETE });
    dispatch(setListState({loading: false}));
}