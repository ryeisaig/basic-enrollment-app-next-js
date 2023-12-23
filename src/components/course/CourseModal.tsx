import { selectListState } from "@/store/listSlice";
import { Course } from "@/types/course";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomModal, { ModalProps, defaultFormStyle } from "../common/wrapper/CustomModal";
import CustomTextField from "../common/form/CustomTextField";
import PageSubtitle from "../common/typography/PageSubtitle";
import CourseTypeDropdown from "./CourseTypeDropdown";
import CollegeDropdown from "../college/CollegeDropdown";
import { getList, save } from "@/actions/CoreActions";
import { Resources } from "@/utils/ApiConstants";

export default function CourseModal(props: ModalProps) {
  const dispatch = useDispatch();

  const {page, rowsPerPage, filters, sort, keyword}: any = useSelector(selectListState);
  const initialCourseValues  = {
    code: '',
    name: '',
    courseType: '',
    collegeId: undefined
  };

  const [newCourse, setNewCourse] = useState<Course>(initialCourseValues);

  const courseFormValueChange = (field: string, value: string) => {
    setNewCourse({...newCourse, [field]: value});
  }

  const handleSubmit = async () => {
    await save(Resources.COURSES, newCourse, dispatch);
    await getList(
      Resources.COURSES,
      {
        filters: filters, 
        sort: sort, 
        keyword: keyword,
        page: page,
        rowsPerPage: rowsPerPage, 
      }, 
      dispatch);
    onClose();
  }

  const onClose = () => {
    !props.data && setNewCourse(initialCourseValues);
    props.onClose();
  }

  useEffect(() => {
    if(props.data){
      setNewCourse(props.data)
    }
  }, [props.data])

  return (
    <CustomModal {...props} onClose={onClose} handleSubmit={handleSubmit}>
        <PageSubtitle>Course Information</PageSubtitle>
        <CollegeDropdown value={newCourse.collegeId} required size='small' style={defaultFormStyle} handler={courseFormValueChange}/>
        <CourseTypeDropdown value={newCourse.courseType} required size='small' style={defaultFormStyle} handler={courseFormValueChange}/>
        <CustomTextField value={newCourse.code} required column='code' placeholder='Eg: BSIT' handler={courseFormValueChange} style={{...defaultFormStyle, marginRight: "0px"}}/>
        <CustomTextField value={newCourse.name} required title="Description" column='name' placeholder='Eg: Bachelor of Science in Information Technology' fullWidth={true} handler={courseFormValueChange}/>
     </CustomModal>  
  );
}
