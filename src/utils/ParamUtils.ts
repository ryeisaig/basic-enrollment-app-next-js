import * as StringUtils from '@/utils/StringUtils';

export const getListParams = (query: any) => {
  
  const rowsPerPage = parseInt(query.rowsPerPage) ||  null; 
  const page = parseInt(query.page) || null;
  const keyword = query.keyword;
  const sortField = query.sortField || "updateDateTime" ;
  const sortType = query.sortType || "desc";

  delete query.rowsPerPage;
  delete query.page;
  delete query.keyword;
  delete query.sortField;
  delete query.sortType;

  return { rowsPerPage, page, keyword, sortField, sortType };
}

export const getNonBlankOrNullQueryParam = (query: any) => {
  Object.entries(query).forEach((entry: any) => {
    if(StringUtils.isEmpty(entry[1])){
      delete query[entry[0]];
    }
  });

  return query;
}