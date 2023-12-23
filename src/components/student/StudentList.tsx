import { Student } from '@/types/student';
import * as DefaultColumns from "@/utils/DefaultColumns";
import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectListState } from "../../store/listSlice";
import CollapsibleList from '../common/list/CollapsibleList';
import DeleteActionMenuItem from '../common/menu/DeleteActionMenuItem';
import EditActionMenuItem from '../common/menu/EditActionMenuItem';
import LinkMenuItem from '../common/menu/LinkMenuItem';
import GradeList from '../grade/GradeList';
import StudentModal from './StudentModal';
import { deleteOne, getList } from '@/actions/CoreActions';
import { Resources } from '@/utils/ApiConstants';

export default function StudentList() {
  const {data, totalElements}: any = useSelector(selectListState);
  const {filters, sort, keyword}: any = useSelector(selectListState);
  const dispatch = useDispatch();

  React.useEffect(() => {
    getList(Resources.STUDENTS, {}, dispatch);
  }, [dispatch]);

  const handleQueryChange = (params: any) => {
    getList(Resources.STUDENTS, {...params, filters: filters, sort: sort, keyword: keyword}, dispatch);
  }

  const handleDelete = async (id: string) => {
    await deleteOne(Resources.STUDENTS, id, dispatch);
    await getList(Resources.STUDENTS, {filters: filters, sort: sort, keyword: keyword}, dispatch);
  } 

  return (
    <CollapsibleList 
      handleQueryChange={handleQueryChange}
      title="Students"
      columns={DefaultColumns.STUDENT.PRIMARY} 
      totalElements={totalElements}
      data={data} 
      actions={(data: any) => {
        return (
          <>
            <LinkMenuItem link={`/students/${data._id}`} label="View Profile" />
            <EditActionMenuItem 
                modal={(open: boolean, onClose: any) => <StudentModal title={"Edit Student"} 
                data={data} 
                open={open} 
                onClose={onClose}/>} 
                permissions={["students.update","students.update-group"]}
            />
            <DeleteActionMenuItem 
                warningMessage={`You are going to permanently remove ${data.firstName + ' ' + data.lastName} from the student list. Do you really want to proceed?`} 
                submit={() => handleDelete(data._id)}
                permissions={["students.delete","students.delete-group"]}
            />
          </>
        );
      }}
      innerTable={(data: Student) => {
        return <GradeList studentId={data._id} academicPeriodId={data.latesEnrollment?.academicPeriodId} inner={true} title="Latest Grades" /> 
      }}
    />
  );
}