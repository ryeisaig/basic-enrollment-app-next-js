import * as DefaultColumns from "@/utils/DefaultColumns";
import * as React from 'react';
import DefaultList, { ExtendedListProps } from '../common/list/DefaultList';
import { getCoursesByCollege } from "@/actions/CourseActions";
import { Course } from "@/types/course";
import LinkMenuItem from "../common/menu/LinkMenuItem";

interface CourseListProps extends ExtendedListProps {
  collegeId?: string;
}

export default function CourseInnerList(props: CourseListProps) {
  const [data, setData] = React.useState<Course[]>([]);

  React.useEffect(() => {
    if(props.collegeId){
      getCoursesByCollege(props.collegeId, (data: Course[]) => setData(data));
    }
  }, [props.collegeId]);

  return (
    <DefaultList 
        title={props.title ? props.title : "Courses"} 
        columns={DefaultColumns.COURSE.PRIMARY} 
        data={data} 
        totalElements={data.length} 
        inner={true} 
        actions={(data: any) => {
          return (
            <>
              <LinkMenuItem link={`/courses/${data._id}`} label="View Details" />
            </>
          );
        }}
    />
  );
}