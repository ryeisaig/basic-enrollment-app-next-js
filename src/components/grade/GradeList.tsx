import { getGrades } from '@/actions/GradeActions';
import * as React from 'react';
import DefaultList, { Column, ExtendedListProps } from '../common/DefaultList';

export interface GradeListProps extends ExtendedListProps {
  studentId?: string;
  academicPeriod?: string;
}

export const GRADE_COLUMNS: Column[] = [
  { key: "class.code", title: "Class Code"},
  { key: "class.subject.code", title: "Subject Code"},
  { key: "class.instructor.firstName+class.instructor.lastName", title: "Instructor"},
  { key: "grade"},
  { key: "finalGrade"},
  { key: "unit"},
  { key: "creditUnit"},
  { key: "status"}
];

export default function GradeList(props: GradeListProps) {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    if(props.studentId){
      getGrades((data: any) => setData(data), props.studentId, props.academicPeriod);
    }
  }, []);

  return (
    <DefaultList title={props.title ? props.title : "Grades"} columns={GRADE_COLUMNS} data={data} totalElements={data.length} inner={props.inner} />
  );
}