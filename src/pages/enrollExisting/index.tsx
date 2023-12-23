import CustomPage from "@/components/common/wrapper/CustomPage";
import PageTitle from "@/components/common/typography/PageTitle";
import { Alert, Button, Divider, Stack } from "@mui/material";
import CustomTextField from "@/components/common/form/CustomTextField";
import { Enrollment } from "@/types/enrollment";
import { useEffect, useState } from "react";
import { defaultFormStyle } from "@/components/common/wrapper/CustomModal";
import PageSubtitle from "@/components/common/typography/PageSubtitle";
import DefaultList from "@/components/common/list/DefaultList";
import * as DefaultColumns from "@/utils/DefaultColumns";
import GenderDropdown from "@/components/common/dropdown/GenderDropdown";
import CustomDatePicker from "@/components/common/form/CustomDatePicker";
import CivilStatusDropdown from "@/components/common/dropdown/CivilStatusDropdown";
import { Add, Search } from "@mui/icons-material";
import AcademicPeriodDropdown from "@/components/academicPeriod/AcademicPeriodDropdown";
import { getStudentByStudentNumber } from "@/actions/StudentActions";
import { useDispatch, useSelector } from "react-redux";
import { selectEnrollmentState } from "@/store/enrollmentSlice";
import CustomRadioField from "@/components/common/form/CustomRadio";
import { getClassByClassCode, getClassesBySection } from "@/actions/ClassAction";
import DeleteActionMenuItem from "@/components/common/menu/DeleteActionMenuItem";
import { useRouter } from "next/router";
import { getById, getList, save, saveNoDispatch } from "@/actions/CoreActions";
import { Resources } from "@/utils/ApiConstants";
import CourseDropdown from "@/components/course/CourseDropdown";
import SectionDropdown from "@/components/section/SectionDropdown";
import YearLevelDropdown from "@/components/student/YearLevelDropdown";
import { lookup } from "dns";
import { selectListState } from "@/store/listSlice";
import { Section } from "@/types/section";
import * as StringUtils from '@/utils/StringUtils';
import ConfirmDialog from "@/components/common/wrapper/ConfirmDialog";
import { SUCCESS_MESSAGES, WARNING_MESSAGES } from "@/utils/MessageUtils";
import { LABELS } from "@/utils/Labels";
import CourseTypeDropdown from "@/components/course/CourseTypeDropdown";
import SuccessDialog from "@/components/common/wrapper/SuccessDialog";
import { withPagePermission } from "@/components/auth/withPermission";

function EnrollExisting() {
  const dispatch = useDispatch();
  const router = useRouter()
  const { id } = router.query;

  const { currentStudent, currentClasses, classesError }: any = useSelector(selectEnrollmentState);
  const { lookups }: any = useSelector(selectListState);

  const initialValues  = {
    studentType: 'old',
    student: {
      studentNumber: '',
      cabinetId: '',
      yearLevel: '',
      courseId: '',
      firstName: '',
      lastName: '',
      middleName: '',
      birthday: '',
      civilStatus: '',
      gender: '',
      presentAddress: '',
      permanentAddress: '',
      emailAddress: '',
      mobileNumber: '',    
      occupation: '',
      guardians: [],
      status: '',
      type: ''
    },
    classes: [],
    status: 'pending',
    sectionId: "",
    courseId: "",
    courseType: "",
    yearLevel: "",
    academicPeriodId: "",
    enrollmentType: ""
  };
  const [newEnrollment, setNewEnrollment] = useState<Enrollment>(initialValues);
  const [studentNumber, setStudentNumber] = useState<string>("");
  const [classCode, setClassCode] = useState<string>("");
  const [activeAlert, setActiveAlert] = useState<string>("");
  const [classActiveAlert, setClassActiveAlert] = useState<string>("");
  const [showConfirmDialog, setShowConfirmDialog] = useState({
    open: false,
    message: '',
    submit: () => {}
  })
  const [showSuccessDialog, setShowSuccessDialog] = useState({
    open: false,
    message: '',
  })

  const formValueChange = (field: string, value: any) => {
    if(field === "studentNumber"){
      setStudentNumber(value)
      return;
    }
    if(field === "classCode"){
      setClassCode(value)
      return;
    }
    setNewEnrollment({...newEnrollment, [field]: value});
  }

  const removeClass = (id: string) => {
    const retainedClasses = newEnrollment.classes.filter(classObj => classObj._id !== id);
    setNewEnrollment({...newEnrollment, classes: [...retainedClasses]});
  }

  const addClass = (e: any) => {
    e.preventDefault();
    if(newEnrollment.academicPeriodId){
      getClassByClassCode(dispatch, classCode, newEnrollment.academicPeriodId);
    } else {
      setClassActiveAlert("missing")
    }
  }

  const populateClassesBySection = () => {
    if(newEnrollment.sectionId && newEnrollment.academicPeriodId){
      getClassesBySection(dispatch, newEnrollment.academicPeriodId, newEnrollment.sectionId);
    } else {
      setClassActiveAlert("missing");
    }
  }

  const populateClassesBySectionIfClassesIsNotEmpty = () => {
    if(newEnrollment.classes.length > 0 && !id){
      setShowConfirmDialog({
        open: true, 
        submit: () => populateClassesBySection(), 
        message: WARNING_MESSAGES.REPLACE_CLASSES_BY_SECTION
      })
    } else {
      populateClassesBySection();
    }
  }

  const handleSubmit = async(e: any) => {
    e.preventDefault();
    await save(Resources.ENROLLMENTS, newEnrollment, dispatch);
    setShowSuccessDialog({
      open: true, 
      message: SUCCESS_MESSAGES.SUCCESSFUL_ENROLLMENT
    });
    setNewEnrollment(initialValues);
    setClassCode("");
    setStudentNumber("");
    setActiveAlert("");
    setClassActiveAlert("")
  }


  useEffect(() => {
    if(currentStudent?._id){
      setNewEnrollment({...newEnrollment, student: currentStudent, studentId: currentStudent._id});
      setActiveAlert("success");
    } else if(studentNumber.trim() != "") {
      setActiveAlert("error");
      setNewEnrollment({...newEnrollment, student: initialValues.student});
    }
  }, [currentStudent])

  useEffect(() => {
      setNewEnrollment({...newEnrollment, classes: [...currentClasses]});
  }, [currentClasses])

  useEffect(() => {
    setClassActiveAlert(classesError ? "error" : "");
  }, [classesError])

  useEffect(() => {
    if(newEnrollment.enrollmentType === 'regular' && !StringUtils.isEmpty(newEnrollment.sectionId)){
      populateClassesBySectionIfClassesIsNotEmpty();
    }
  }, [newEnrollment.enrollmentType, newEnrollment.sectionId])


  useEffect(() => {
    if(!StringUtils.isEmpty(newEnrollment.sectionId)){
      const updatedEnrollment = {...newEnrollment};
      const section: Section = lookups.section?.filter((section: Section) => section._id === newEnrollment.sectionId)[0];

      // autopopulate course if not defined
      if(StringUtils.isEmpty(updatedEnrollment.courseId)){
        updatedEnrollment.courseId = section?.courseId;
      }
      // autopopulate year level if not defined
      if(StringUtils.isEmpty(updatedEnrollment.yearLevel)){
        updatedEnrollment.yearLevel = section?.yearLevel;
      }
      // autopopulate program type if not defined
      if(StringUtils.isEmpty(updatedEnrollment.courseType)){
        updatedEnrollment.courseType = section?.course?.courseType;
      }
      setNewEnrollment(updatedEnrollment);
    }
  }, [newEnrollment.sectionId])

  const initializeData = async(enrollmentId: any) => {
    const data = await getById(Resources.ENROLLMENTS, enrollmentId);
    setNewEnrollment(data?.content);
  }

  useEffect(() => {
    id && initializeData(id);
  }, [id])

  return withPagePermission(["enrollments.create","enrollments.create-group"],
    <CustomPage>
      <form onSubmit={handleSubmit} >
        <div style={{paddingRight: "15px"}}>
          <Button type="submit" variant="contained" color="primary" style={{float: "right", height: "40px"}}>{LABELS.SUBMIT}</Button>
          <Button variant="contained" color="secondary" onClick={() => router.back()} style={{float: "right", height: "40px", marginRight: "10px"}}>{LABELS.CANCEL}</Button>
        </div>
        <PageTitle>Enroll Existing Student</PageTitle>
        <Divider style={{marginBottom: '20px', marginTop: "20px"}}/>
        <div style={{padding: "15px", paddingTop: "0px"}}>
            <Stack sx={{ marginBottom: "15px"}} spacing={2}>
                { activeAlert === "error" && <Alert severity="error" onClose={() => setActiveAlert("")}>{WARNING_MESSAGES.NO_STUDENT_FOUND_FOR_STUDENT_NUMBER}</Alert> }
                { activeAlert === "success" && <Alert onClose={() => setActiveAlert("")}>{SUCCESS_MESSAGES.VALID_STUDENT_FOUND_FOR_STUDENT_NUMBER}</Alert> }
            </Stack>
            <PageSubtitle>Search Student</PageSubtitle>
            <CustomTextField value={studentNumber} column='studentNumber' style={defaultFormStyle} handler={formValueChange} onEnter={(e: any) =>  { e.preventDefault(); getStudentByStudentNumber(dispatch, studentNumber)}}/>
            <Button variant="contained" style={{height: "40px"}} onClick={() => getStudentByStudentNumber(dispatch, studentNumber)}><Search/></Button>
            <br/>
            <PageSubtitle>Personal Information</PageSubtitle>
            <CustomTextField value={newEnrollment?.student?.lastName} column='lastName' disabled style={defaultFormStyle}/>
            <CustomTextField value={newEnrollment?.student?.firstName} column='firstName' disabled style={defaultFormStyle}/>
            <CustomTextField value={newEnrollment?.student?.middleName} column='middleName' disabled style={defaultFormStyle}/>
            <br/>
            <GenderDropdown value={newEnrollment?.student?.gender} size='small' disabled style={defaultFormStyle}/>
            <CustomDatePicker value={newEnrollment?.student?.birthday} required column='birthday' disabled style={defaultFormStyle}/>
            <CivilStatusDropdown value={newEnrollment?.student?.civilStatus} size='small' disabled style={defaultFormStyle}/>
            <br/>
            <PageSubtitle>Contact Information</PageSubtitle>
            <CustomTextField value={newEnrollment?.student?.mobileNumber} column='mobileNumber' type="number" disabled style={defaultFormStyle}/>
            <CustomTextField value={newEnrollment?.student?.emailAddress} column='emailAddress' type="email" disabled style={defaultFormStyle}/>
            <CustomTextField value={newEnrollment?.student?.occupation} column='occupation' disabled style={defaultFormStyle} />
            <br/>
            <CustomTextField value={newEnrollment?.student?.presentAddress} column='presentAddress' disabled style={{width: "680px"}}/>
            <br/>
            <CustomTextField value={newEnrollment?.student?.permanentAddress} column='permanentAddress' disabled style={{width: "680px"}}/>
            <br/>
            <PageSubtitle>Guardian&apos;s Information</PageSubtitle>
            <CustomTextField value={newEnrollment?.student?.guardians && newEnrollment?.student?.guardians[0]?.name || ''} column='guardian.0.name' title="Guardian's Name" disabled style={defaultFormStyle}/>
            <CustomTextField value={newEnrollment?.student?.guardians && newEnrollment?.student?.guardians[0]?.mobileNumber || ''} column='guardian.0.mobileNumber' title="Guardian's Mobile Number" disabled style={defaultFormStyle}/>
            <CustomTextField value={newEnrollment?.student?.guardians && newEnrollment?.student?.guardians[0]?.relationship || ''} column='guardian.0.relationship' title="Relationship" disabled style={defaultFormStyle} />
            <br/>
            <CustomTextField value={newEnrollment?.student?.guardians && newEnrollment?.student?.guardians[1]?.name || ''} column='guardian.1.name' title="Guardian's Name" disabled style={defaultFormStyle}/>
            <CustomTextField value={newEnrollment?.student?.guardians && newEnrollment?.student?.guardians[1]?.mobileNumber || ''} column='guardian.1.mobileNumber' title="Guardian's Mobile Number" disabled style={defaultFormStyle}/>
            <CustomTextField value={newEnrollment?.student?.guardians && newEnrollment?.student?.guardians[1]?.relationship || ''} column='guardian.1.relationship' title="Relationship" disabled style={defaultFormStyle} />
            <PageSubtitle>Enrollment Details</PageSubtitle>
            <AcademicPeriodDropdown value={newEnrollment.academicPeriodId} size='small' required style={defaultFormStyle} handler={formValueChange}/>
            <CourseTypeDropdown title="Program Type" value={newEnrollment.courseType} size='small' required style={defaultFormStyle} handler={formValueChange}/>
            <CourseDropdown filter={{courseType: newEnrollment.courseType}} value={newEnrollment.courseId} size='small' required style={defaultFormStyle} handler={formValueChange}/>
            <br/>
            <CustomRadioField value={newEnrollment.enrollmentType} required column="enrollmentType" options={[{key: 'regular'}, {key: 'irregular'}]} handler={formValueChange}  style={defaultFormStyle}/>
            <YearLevelDropdown value={newEnrollment.yearLevel} size='small' disabled={newEnrollment.courseType === 'masteral' || newEnrollment.courseType === 'doctoral'} required={newEnrollment.courseType !== 'masteral' && newEnrollment.courseType !== 'doctoral'} style={defaultFormStyle} handler={formValueChange}/>
            <SectionDropdown filter={{courseId: newEnrollment.courseId, yearLevel: newEnrollment.yearLevel}} value={newEnrollment.sectionId} size='small' required={newEnrollment.enrollmentType === "regular"} style={defaultFormStyle} handler={formValueChange}/>
            <br/>
        </div>
        <Stack sx={{ margin: "15px"}} spacing={2}>
            { classActiveAlert === "error" && <Alert severity="error" onClose={() => setClassActiveAlert("")}>No class found for this class code.</Alert> }
            { classActiveAlert === "missing" && <Alert severity="error" onClose={() => setClassActiveAlert("")}>Academic period and program type must be selected.</Alert> }
        </Stack>
        <CustomTextField disabled={newEnrollment.enrollmentType === "regular"}  column='classCode' title="Enter the class code to add" value={classCode} style={{marginLeft: "15px"}} handler={formValueChange} onEnter={(e: any) => addClass(e)}/>
        <Button disabled={newEnrollment.enrollmentType === "regular"} variant="contained" color="primary" style={{height: "40px", marginRight: "5px"}} onClick={addClass}><Add/></Button>
        <span>OR</span>
        <Button 
            disabled={newEnrollment.enrollmentType !== "regular"} 
            variant="contained" color="secondary" 
            style={{height: "40px", marginLeft: "10px"}}
            onClick={populateClassesBySectionIfClassesIsNotEmpty} 
        >Add classes from Section</Button>
        <DefaultList 
            title="Enrolled Classes"
            columns={DefaultColumns.ENROLLED_CLASS.PRIMARY} 
            data={newEnrollment.classes} 
            totalElements={newEnrollment.classes?.length} 
            inner={true} 
            actions={(data: any) => {
              return (
                <>
                   <DeleteActionMenuItem 
                        label="Remove"
                        warningMessage={WARNING_MESSAGES.REMOVE_CLASS} 
                        submit={() => removeClass(data._id)}
                    />
                </>
              );
            }}
        />
        <div style={{padding: "15px", paddingBottom: "50px"}}>
          <Button type="submit" variant="contained" color="primary" style={{float: "right", height: "40px"}}>{LABELS.SUBMIT}</Button>
          <Button variant="contained" color="secondary" onClick={() => router.back()} style={{float: "right", height: "40px", marginRight: "10px"}}>{LABELS.CANCEL}</Button>
        </div>
        <ConfirmDialog 
            open={showConfirmDialog.open} 
            onClose={() => {setShowConfirmDialog({...showConfirmDialog, open: false})}} 
            message={showConfirmDialog.message}
            submit={() =>  { showConfirmDialog.submit();  setShowConfirmDialog({...showConfirmDialog, open: false})}}
        />
        <SuccessDialog
          open={showSuccessDialog.open} 
          onClose={() => {setShowSuccessDialog({...showSuccessDialog, open: false})}} 
          message={showSuccessDialog.message}
        />
      </form>
      <></>
    </CustomPage>
  )
}

export default EnrollExisting;