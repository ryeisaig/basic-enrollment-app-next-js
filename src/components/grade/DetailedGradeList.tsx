import { getGradesByStudentAndAcademicPeriod } from '@/actions/GradeActions';
import * as React from 'react';
import DefaultList, { Column, ExtendedListProps } from '../common/list/DefaultList';
import * as DefaultColumns from "@/utils/DefaultColumns";

export interface DetailedGradeListProps extends ExtendedListProps {
  studentId?: string;
  academicPeriodId?: string;
}

export default function DetailedGradeList(props: DetailedGradeListProps) {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    if(props.studentId){
      getGradesByStudentAndAcademicPeriod((data: any) => setData(data), props.studentId, props.academicPeriodId);
    }
  }, [props.studentId, props.academicPeriodId]);

  return (
    <DefaultList 
        title={props.title}
        columns={DefaultColumns.GRADED_ENROLLED_CLASS.PRIMARY} 
        data={data} 
        totalElements={data.length} 
        inner={true} 
    />
  );
}