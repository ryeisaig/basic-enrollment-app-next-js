import { selectListState } from "@/store/listSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomModal, { ModalProps, defaultFormStyle } from "../common/wrapper/CustomModal";
import PageSubtitle from "../common/typography/PageSubtitle";
import { getList, save } from "@/actions/CoreActions";
import { Resources } from "@/utils/ApiConstants";
import AcademicPeriodDropdown from "../academicPeriod/AcademicPeriodDropdown";
import { Class } from "@/types/class";
import SectionDropdown from "../section/SectionDropdown";
import SubjectDropdown from "../subject/SubjectDropdown";
import RoomDropdown from "../room/RoomDropdown";
import InstructorDropdown from "../instructor/InstructorDropdown";
import CustomRadioField from "../common/form/CustomRadio";
import SchedulePicker from "../common/form/SchedulePicker";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import CustomTextField from "../common/form/CustomTextField";
import CourseDropdown from "../course/CourseDropdown";
import YearLevelDropdown from "../student/YearLevelDropdown";

export default function ClassModal(props: ModalProps) {
  const dispatch = useDispatch();

  const {page, rowsPerPage, filters, sort, keyword}: any = useSelector(selectListState);
  const initialValues  = {
    code: '',
    status: "draft",
    schedule: [
      {
        day: '',
        timeStart: '',
        timeEnd: ''
      }
    ]
  };

  const [newClass, setNewClass] = useState<Class>(initialValues);
  const formValueChange = (field: string, value: any) => setNewClass({...newClass, [field]: value});
  const scheduleValueChange = (index: number, field: string, value: string) => {
   let sched: any[] = [ ...newClass.schedule];
   sched[index][field] = value;
   setNewClass({...newClass, schedule: sched})
  };

  const handleSubmit = async () => {
    await save(Resources.CLASSES, newClass, dispatch);
    await getList(
      Resources.CLASSES,
      {
      filters: filters, 
      sort: sort, 
      keyword: keyword,
      page: page,
      rowsPerPage: rowsPerPage, 
    }, dispatch);
    onClose();
  }

  const onClose = () => {
    !props.data && setNewClass(initialValues);
    props.onClose();
  }

  useEffect(() => {
    if(props.data){
      setNewClass(props.data)
    }
  }, [props.data])

  return (
    <CustomModal {...props} onClose={onClose} handleSubmit={handleSubmit}>
        <PageSubtitle>Class Information</PageSubtitle>
        <CustomTextField value={newClass.code} required column='code' placeholder='Eg: 012345' handler={formValueChange} style={defaultFormStyle}/>
        <AcademicPeriodDropdown value={newClass.academicPeriodId} required size='small' style={defaultFormStyle}  handler={formValueChange}/>
        <CourseDropdown value={newClass.courseId} required size='small'  handler={formValueChange} style={{...defaultFormStyle, marginRight: "0px"}}/>
        <YearLevelDropdown value={newClass.yearLevel} size='small' handler={formValueChange} style={defaultFormStyle} />
        <SectionDropdown filter={{courseId: newClass.courseId, yearLevel: newClass.yearLevel}} value={newClass.sectionId} required size='small' handler={formValueChange} style={defaultFormStyle} />
        <SubjectDropdown value={newClass.subjectId} required size='small' handler={formValueChange} style={{...defaultFormStyle, marginRight: "0px"}}/>
        <InstructorDropdown value={newClass.instructorId} required size='small' handler={formValueChange} style={defaultFormStyle}/>
        <RoomDropdown value={newClass.roomId} required size='small' style={defaultFormStyle} handler={formValueChange}/>
        <CustomRadioField value={newClass.status} required column="status" options={[{key: 'draft'}, {key: 'open'}, {key: 'closed'}]} handler={formValueChange}/>
        <PageSubtitle>Schedule</PageSubtitle>
        <Button variant="contained" color="secondary" style={{marginBottom: "10px"}} 
            onClick={() => setNewClass({...newClass, schedule: [...newClass.schedule, {day: "", timeStart: "", timeEnd: ""}]})}
        ><Add/></Button>
        {
          newClass.schedule?.map((schedule, i) => {
            return <SchedulePicker key={i} value={schedule} size='small' required style={defaultFormStyle} handler={(field: string, value: string) => scheduleValueChange(i, field, value)} />
          })
        }
     </CustomModal>  
  );
}
