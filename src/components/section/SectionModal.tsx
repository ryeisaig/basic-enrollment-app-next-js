import { getList, save } from "@/actions/CoreActions";
import { selectListState } from "@/store/listSlice";
import { Section } from "@/types/section";
import { Resources } from "@/utils/ApiConstants";
import { CheckBox } from "@mui/icons-material";
import { FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AcademicPeriodDropdown from "../academicPeriod/AcademicPeriodDropdown";
import CourseDropdown from "../course/CourseDropdown";
import InstructorDropdown from "../instructor/InstructorDropdown";
import CustomTextField from "../common/form/CustomTextField";
import PageSubtitle from "../common/typography/PageSubtitle";
import CustomModal, { ModalProps, defaultFormStyle } from "../common/wrapper/CustomModal";
import YearLevelDropdown from "../student/YearLevelDropdown";

export default function SectionModal(props: ModalProps) {
  const dispatch = useDispatch();

  const {page, rowsPerPage, filters, sort, keyword}: any = useSelector(selectListState);
  const initialValues  = {
    yearLevel: undefined,
    sectionNumber: undefined,
    academicPeriodId: undefined,
    courseId: undefined,
    adviserId: undefined,
    maxCount: 0,
    isActive: true
  };

  const [newSection, setNewSection] = useState<Section>(initialValues);
  const formValueChange = (field: string, value: any) => setNewSection({...newSection, [field]: value});
  
  const handleSubmit = async () => {
    await save(Resources.SECTIONS, newSection, dispatch);
    await getList(
      Resources.SECTIONS,
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
    !props.data && setNewSection(initialValues);
    props.onClose();
  }

  useEffect(() => {
    if(props.data){
      setNewSection(props.data)
    }
  }, [props.data])

  return (
    <CustomModal {...props} onClose={onClose} handleSubmit={handleSubmit}>
        <PageSubtitle>Section Information</PageSubtitle>
        <CourseDropdown value={newSection.courseId} required size='small' style={defaultFormStyle} handler={formValueChange}/>
        <YearLevelDropdown value={newSection.yearLevel} required size='small' style={defaultFormStyle} handler={formValueChange}/>
        <CustomTextField value={newSection.sectionNumber} type="number" required column='sectionNumber' handler={formValueChange} style={{...defaultFormStyle, marginRight: "0px"}}/>
        <InstructorDropdown required title="Adviser" column="adviserId" value={newSection.adviserId} size='small' style={defaultFormStyle} handler={formValueChange}/>
        <CustomTextField value={newSection.maxCount} type="number" column='maxCount' title="Limit" handler={formValueChange} style={{...defaultFormStyle}}/>
        <FormControlLabel control={<CheckBox onChange={(e: any) => setNewSection({...newSection, isActive: e.target.checked})}/>} label="Open for Enrollment" style={{marginLeft: "0px", marginBottom: "10px"}}/>
     </CustomModal>  
  );
}
