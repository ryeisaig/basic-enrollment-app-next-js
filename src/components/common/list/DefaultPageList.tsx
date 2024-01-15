import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectListState } from "../../../store/listSlice";
import CollapsibleList from './CollapsibleList';
import { Column } from './DefaultList';
import DeleteActionMenuItem from '../menu/DeleteActionMenuItem';
import EditActionMenuItem from '../menu/EditActionMenuItem';
import LinkMenuItem from '../menu/LinkMenuItem';
import { deleteOne } from '@/actions/CoreActions';
import { useRouter } from 'next/router';

type DataListProps = {
  title: string;
  columns: Column[];
  modal: any;
  refresh: any;
  innerTable?: any;
  resource: string;
  editPermissions?: string[],
  deletePermissions?: string[],
}

export default function DefaultDataList(props: DataListProps) {
  const {data, totalElements}: any = useSelector(selectListState);
  const {filters, sort, keyword}: any = useSelector(selectListState);
  const dispatch = useDispatch();
  const router = useRouter() 

  React.useEffect(() => {
    props.resource && props.refresh(props.resource, {}, dispatch);
  }, [dispatch, props.resource]);

  const handleQueryChange = (params: any) => props.refresh(props.resource, {...params, filters: filters, sort: sort, keyword: keyword}, dispatch);
  const handleDelete = async (id: string) => {
    await deleteOne(props.resource, id, dispatch);
    await props.refresh(props.resource, {filters: filters, sort: sort, keyword: keyword}, dispatch);
  } 

  return (
    <CollapsibleList 
      handleQueryChange={handleQueryChange}
      title={props.title}
      columns={props.columns} 
      totalElements={totalElements}
      data={data} 
      actions={(data: any) => {
        return (
          <>
            <LinkMenuItem link={`${router.pathname}/${data._id}`} label="View Details" />
            <EditActionMenuItem permissions={props.editPermissions}
                modal={(open: boolean, onClose: any) => props.modal(open, onClose, data)} />
            <DeleteActionMenuItem 
                permissions={props.deletePermissions}
                warningMessage={`You are going to permanently remove this from the list. Do you really want to proceed?`} 
                submit={() => handleDelete(data._id)}
            />
          </>
        );
      }}
      innerTable={props.innerTable}
    />
  );
}