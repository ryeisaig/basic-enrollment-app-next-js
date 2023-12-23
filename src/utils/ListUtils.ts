import { TypeKey } from "@/types/typekey";

export const defaultSearch = (
    action: any, 
    resource: string,
    params: any, 
    page: number, 
    rowsPerPage: number, 
    filters: any, 
    sort: TypeKey[], 
    keyword: string, 
    dispatch: any) => {
    action(
        resource,
        {
            keyword: params.keyword !== null && typeof params.keyword !== "undefined" ? params.keyword : keyword, 
            page: page,
            rowsPerPage: rowsPerPage, 
            filters: params.filters ? {...filters, ...params.filters} : filters, 
            sort: params.sort ? { ...sort, ...params.sort } : sort
        }, 
        dispatch
    );
}