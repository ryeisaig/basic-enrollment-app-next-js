import * as StringUtils from '@/utils/StringUtils';

export const getListParams = (query: any) => {
  
  
  const rowsPerPage = parseInt(query.get("rowsPerPage")) ||  null; 
  const page = parseInt(query.get("page")) || null;
  const keyword = query.get("keyword");
  const sortField = query.get("sortField") || "createdDateTime" ;
  const sortType = query.get("sortType") || "desc";

  query.delete("rowsPerPage");
  query.delete("page");
  query.delete("keyword");
  query.delete("sortField");
  query.delete("sortType");

  return { rowsPerPage, page, keyword, sortField, sortType };
}

export const getNonBlankOrNullQueryParam = (query: any) => {
  const params: any = {};

  query.forEach((value: any, key: string) => {
    if(StringUtils.isEmpty(value)){
      query.delete(key)
    } else {
      params[key] = value
    }
  });

  return params;
}