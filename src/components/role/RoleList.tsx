import { deleteOne, getList } from "@/actions/CoreActions";
import { Resources } from "@/utils/ApiConstants";
import * as DefaultColumns from "@/utils/DefaultColumns";
import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectListState } from "../../store/listSlice";
import CollapsibleList from '../common/list/CollapsibleList';
import DeleteActionMenuItem from '../common/menu/DeleteActionMenuItem';
import EditActionMenuItem from '../common/menu/EditActionMenuItem';
import RoleModal from "./RoleModal";
import ActionMenuItem from "../common/menu/ActionMenuItem";
import { FileCopy } from "@mui/icons-material";

export default function RoleList() {
  const {data, totalElements}: any = useSelector(selectListState);
  const {filters, sort, keyword}: any = useSelector(selectListState);
  const dispatch = useDispatch();

  React.useEffect(() => {
    getList(Resources.ROLES, {}, dispatch);
  }, [dispatch]);

  const handleQueryChange = (params: any) => getList(Resources.ROLES, {...params, filters: filters, sort: sort, keyword: keyword}, dispatch);
  const handleDelete = async (id: string) => {
    await deleteOne(Resources.ROLES, id, dispatch);
    await getList(Resources.ROLES, {filters: filters, sort: sort, keyword: keyword}, dispatch);
  } 

  return (
    <CollapsibleList 
      handleQueryChange={handleQueryChange}
      title="Roles"
      columns={DefaultColumns.ROLE.PRIMARY} 
      totalElements={totalElements}
      data={data} 
      actions={(data: any) => {
        return (
          <>
           <ActionMenuItem 
                label={<><FileCopy/> Copy</>}
                modal={(open: boolean, onClose: any) => <RoleModal title={"Copy Role"} 
                data={data}
                forceRemoveId
                open={open} 
                onClose={onClose}/>} />
            <EditActionMenuItem 
                modal={(open: boolean, onClose: any) => <RoleModal title={"Edit Role"} 
                data={data} 
                open={open} 
                onClose={onClose}/>} 
                permissions={["roles.update","roles.update-group"]}
            />
            <DeleteActionMenuItem 
                warningMessage={`You are going to permanently remove ${data.code} from the role list. Do you really want to proceed?`} 
                submit={() => handleDelete(data._id)}
                permissions={["roles.delete","roles.delete-group"]}
            />
          </>
        );
      }}
    />
  );
}