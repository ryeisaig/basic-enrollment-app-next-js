import { deleteStudent, getStudents } from '@/actions/StudentActions';
import { Student } from '@/types/student';
import { ordinals } from '@/utils/StringUtils';
import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectListState } from "../../store/listSlice";
import CollapsibleList from '../common/CollapsibleList';
import { Column } from '../common/DefaultList';
import DeleteActionMenuItem from '../common/DeleteActionMenuItem';
import EditActionMenuItem from '../common/EditActionMenuItem';
import LinkMenuItem from '../common/LinkMenuItem';
import RegularityBadge from '../common/RegularityBadge';
import GradeList from '../grade/GradeList';
import GenderAvatar from './GenderAvatar';
import StudentModal from './StudentModal';

export const STUDENT_COLUMNS: Column[] = [
  { key: "gender", title: " ", width: "60px", presentation: GenderAvatar},
  { key: "studentNumber", title: "Student No.",  width: "140px"},
  { key: "firstName+middleName+lastName", title: "Name"},
  { key: "emailAddress"},
  { key: "course", width: "100px"},
  { key: "yearLevel", width: "100px", title: "Year", transform: (value: number) => `${ordinals(value)} Year`},
  { key: "cabinetId", width: "100px", title: "Cabinet"},
  { key: "type", width: "100px", presentation: RegularityBadge},
];

export default function StudentList() {
  const {data, totalElements}: any = useSelector(selectListState);
  const {filters, sort, keyword}: any = useSelector(selectListState);
  const dispatch = useDispatch();

  React.useEffect(() => {
    getStudents({}, dispatch);
  }, []);

  const handleQueryChange = (params: any) => {
    getStudents({...params, filters: filters, sort: sort, keyword: keyword}, dispatch);
  }

  const handleDelete = async (id: string) => {
    await deleteStudent(id, dispatch);
    await getStudents({filters: filters, sort: sort, keyword: keyword}, dispatch);
  } 

  return (
    <CollapsibleList 
      handleQueryChange={handleQueryChange}
      title="Students"
      columns={STUDENT_COLUMNS} 
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
                onClose={onClose}/>} />
            <DeleteActionMenuItem 
                warningMessage={`You are going to permanently remove ${data.firstName + ' ' + data.lastName} from the student list. Do you really want to proceed?`} 
                submit={() => handleDelete(data._id)}
            />
          </>
        );
      }}
      innerTable={(data: Student) => {
        return <GradeList studentId={data._id} academicPeriod={data.lastAcademicPeriodEnrolled} inner={true} title="Latest Grades" /> 
      }}
    />
  );
}