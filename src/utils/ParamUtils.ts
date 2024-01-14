import * as StringUtils from '@/utils/StringUtils';

export const getListParams = (query: any) => {
  
  
  const rowsPerPage = parseInt(query.get("rowsPerPage")) ||  null; 
  const page = parseInt(query.get("page")) || null;
  const keyword = query.get("keyword");
  const sortField = query.get("sortField") || "updateDateTime" ;
  const sortType = query.get("sortType") || "desc";

  query.delete("rowsPerPage");
  query.delete("page");
  query.delete("keyword");
  query.delete("sortField");
  query.delete("sortType");

  return { rowsPerPage, page, keyword, sortField, sortType };
}

export const getNonBlankOrNullQueryParam = (query: any) => {
 query.forEach((entry: any) => {
    if(StringUtils.isEmpty(entry[1])){
      query.delete(entry[0])
    }
  });

  return query;
}