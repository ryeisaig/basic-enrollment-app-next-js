import { deleteOne, getList } from "@/actions/CoreActions";
import { Resources } from "@/utils/ApiConstants";
import * as DefaultColumns from "@/utils/DefaultColumns";
import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectListState } from "../../store/listSlice";
import CollapsibleList from '../common/list/CollapsibleList';
import DeleteActionMenuItem from '../common/menu/DeleteActionMenuItem';
import LinkMenuItem from "../common/menu/LinkMenuItem";
import ActionMenuItem from "../common/menu/ActionMenuItem";
import RoleModal from "../role/RoleModal";
import { BuildOutlined, ThumbDownOutlined, ThumbUpOutlined } from "@mui/icons-material";
import theme from "@/config/theme";

export default function EnrollmentList() {
  const {data, totalElements}: any = useSelector(selectListState);
  const {filters, sort, keyword}: any = useSelector(selectListState);
  const dispatch = useDispatch();

  React.useEffect(() => {
    getList(Resources.ENROLLMENTS, {}, dispatch);
  }, [dispatch]);

  const handleQueryChange = (params: any) => getList(Resources.ENROLLMENTS, {...params, filters: filters, sort: sort, keyword: keyword}, dispatch);
  const handleDelete = async (id: string) => {
    await deleteOne(Resources.ENROLLMENTS, id, dispatch);
    await getList(Resources.ENROLLMENTS, {filters: filters, sort: sort, keyword: keyword}, dispatch);
  } 

  return (
    <CollapsibleList 
      handleQueryChange={handleQueryChange}
      title="Enrollments"
      columns={DefaultColumns.ENROLLMENT.PRIMARY}
      totalElements={totalElements}
      data={data} 
      actions={(data: any) => {
        return (
          <>
            <ActionMenuItem 
                label={<><ThumbUpOutlined style={{color: theme.palette.primary.main}}/> Confirm</>}
                modal={(open: boolean, onClose: any) => <RoleModal title={"Copy Role"} 
                data={data}
                forceRemoveId
                open={open} 
                onClose={onClose}/>}
              />
            <ActionMenuItem 
                label={<><ThumbDownOutlined style={{color: "red"}}/> Discard</>}
                modal={(open: boolean, onClose: any) => <RoleModal title={"Copy Role"} 
                data={data}
                forceRemoveId
                open={open} 
                onClose={onClose}/>}
            />
            <LinkMenuItem link={data.studentType === 'new' ? `/enrollNew?id=${data._id}` : `/EnrollExisting?id=${data._id}`} label="Edit" />
            <DeleteActionMenuItem 
                warningMessage={`You are going to permanently remove this from the enrollment list. Do you really want to proceed?`} 
                submit={() => handleDelete(data._id)}
                permissions={["enrollments.delete","enrollments.delete-group"]}
            />
          </>
        );
      }}
    />
  );
}