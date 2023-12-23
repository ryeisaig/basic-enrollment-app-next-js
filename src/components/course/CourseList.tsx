import { deleteOne, getList } from "@/actions/CoreActions";
import { Resources } from "@/utils/ApiConstants";
import * as DefaultColumns from "@/utils/DefaultColumns";
import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectListState } from "../../store/listSlice";
import CollapsibleList from '../common/list/CollapsibleList';
import DeleteActionMenuItem from '../common/menu/DeleteActionMenuItem';
import EditActionMenuItem from '../common/menu/EditActionMenuItem';
import LinkMenuItem from '../common/menu/LinkMenuItem';
import CourseModal from './CourseModal';

export default function CourseList() {
  const {data, totalElements}: any = useSelector(selectListState);
  const {filters, sort, keyword}: any = useSelector(selectListState);
  const dispatch = useDispatch();

  React.useEffect(() => {
    getList(Resources.COURSES, {}, dispatch);
  }, [dispatch]);

  const handleQueryChange = (params: any) => getList(Resources.COURSES, {...params, filters: filters, sort: sort, keyword: keyword}, dispatch);
  const handleDelete = async (id: string) => {
    await deleteOne(Resources.COURSES, id, dispatch);
    await getList(Resources.COURSES, {filters: filters, sort: sort, keyword: keyword}, dispatch);
  } 

  return (
    <CollapsibleList 
      handleQueryChange={handleQueryChange}
      title="Courses"
      columns={DefaultColumns.COURSE.PRIMARY} 
      totalElements={totalElements}
      data={data} 
      actions={(data: any) => {
        return (
          <>
            <LinkMenuItem link={`/courses/${data._id}`} label="View Course Details" />
            <EditActionMenuItem 
                modal={(open: boolean, onClose: any) => <CourseModal title={"Edit Course"} 
                data={data} 
                open={open} 
                onClose={onClose}/>} 
                permissions={["courses.update","courses.update-group"]}
            />
            <DeleteActionMenuItem 
                warningMessage={`You are going to permanently remove ${data.code} from the course list. Do you really want to proceed?`} 
                submit={() => handleDelete(data._id)}
                permissions={["courses.delete","courses.delete-group"]}
            />
          </>
        );
      }}
    />
  );
}