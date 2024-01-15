import { getList, getPotentialMatches, save } from "@/actions/CoreActions";
import { selectListState } from "@/store/listSlice";
import { Student } from "@/types/student";
import { Resources } from "@/utils/ApiConstants";
import { Alert, Avatar, Checkbox, FormControlLabel, Link } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CivilStatusDropdown from "../common/dropdown/CivilStatusDropdown";
import CourseDropdown from "../course/CourseDropdown";
import CustomDatePicker from "../common/form/CustomDatePicker";
import CustomModal, { ModalProps, defaultFormStyle } from "../common/wrapper/CustomModal";
import CustomRadioField from "../common/form/CustomRadio";
import CustomTextField from "../common/form/CustomTextField";
import GenderDropdown from "../common/dropdown/GenderDropdown";
import PageSubtitle from "../common/typography/PageSubtitle";
import YearLevelDropdown from "./YearLevelDropdown";
import { toTitle } from "@/utils/StringUtils";
import * as StringUtils from '@/utils/StringUtils';

export default function StudentModal(props: ModalProps) {
  const dispatch = useDispatch();

  const {page, rowsPerPage, filters, sort, keyword}: any = useSelector(selectListState);
  const initialStudentValues  = {
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
  };

  const [newStudent, setNewStudent] = useState<Student>(initialStudentValues);
  const [sameAddress, setSameAddress] = useState<boolean>(false);
  const [error, setError] = useState<any>("");

  const MATCHING_FIELDS = ["firstName", "lastName", "gender", "birthday"];
  const [matchParams, setMatchParams] = useState({});

  const studentFormValueChange = async(field: string, value: string) => {
    if(MATCHING_FIELDS.includes(field)){
      const newMatchParams = {...matchParams, [field]: value};
      const paramsWithValues = Object.entries(newMatchParams).filter(entry => !StringUtils.isEmpty(entry[1]?.toString()));
      if(paramsWithValues.length >= MATCHING_FIELDS.length){
        const result = await getPotentialMatches(Resources.STUDENTS, newMatchParams);
        if(result && result.content?.length > 0 && result.content?.[0]?._id !== newStudent?._id ){
          setError(
              <span><b>WARNING:</b> An existing student matches the details you are trying to input. 
                <br/><br/>
                <div style={{float: "left", marginRight: "20px"}}>
                  <Avatar src={result.content[0]?.avatar && `../api/files/${result.content[0]?.avatar}`} style={{width: "36px", height: "36px"}}/>
                </div>
                <b>Student Number:</b> <Link href={`/students/${result.content?.[0]?._id}`}>{result.content?.[0]?.studentNumber}</Link>
                <br/><b>Name:</b> {result.content?.[0]?.firstName + " " + result.content?.[0]?.lastName}
                <br/><br/>Please check the above link to avoid duplicates.
              </span>);
        } else {
          setError("");
        }
      }
      setMatchParams(newMatchParams);
    }

    setNewStudent({...newStudent, [field]: value});
  }

  const studentNumberValueChanged = async(field: string, value: string) => {
    studentFormValueChange(field, value);

    if(value?.length > 5){
      const result = await getPotentialMatches(Resources.STUDENTS, {studentNumber: value});
      if(result && result.content?.length > 0 && result.content?.[0]?._id !== newStudent?._id ){
        setError(`The student number ${value} is already assigned to ${toTitle(result.content[0].firstName + " " + result.content[0].lastName)}`)
        setNewStudent({...newStudent, studentNumber: props?.data?.studentNumber});
      } else {
        setError("");
      }
    }
  }

  const guardianIsAdded = (field: string, value: string) => {
    let fieldProps:string[] = field.split('.');
    let guardians:any = newStudent.guardians;
    for(let i = 0; i <= parseInt(fieldProps[1]); i++){
      guardians.push({});
    }
    guardians[parseInt(fieldProps[1])][fieldProps[2]] = value;
    setNewStudent({...newStudent, guardians: [...guardians]});
  }

  const handleSubmit = async () => {
    await save(Resources.STUDENTS, newStudent, dispatch);
    await getList(
      Resources.STUDENTS,
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
    !props.data && setNewStudent(initialStudentValues);
    props.onClose();
  }

  useEffect(() => {
    if(sameAddress && newStudent.presentAddress){
      studentFormValueChange('permanentAddress', newStudent.presentAddress);
    }
  }, [newStudent.presentAddress, sameAddress])

  useEffect(() => {
    if(props.data){
      setNewStudent(props.data);
      setMatchParams({lastName: props.data?.lastName, firstName: props.data?.firstName, gender: props.data?.gender});
    }
  }, [props.data])

  return (
    <CustomModal {...props} onClose={onClose} handleSubmit={handleSubmit} error={error}>
        {error && error != "" && <><Alert severity="error" onClose={() => setError("")}>{error}</Alert> <br/></>}
        <PageSubtitle>Academic Information</PageSubtitle>
        <CustomTextField value={newStudent.studentNumber} required column='studentNumber' placeholder='Eg: 012345' handler={studentNumberValueChanged} style={defaultFormStyle}/>
        <CourseDropdown value={newStudent.courseId} required size='small' style={defaultFormStyle} handler={studentFormValueChange}/>
        <YearLevelDropdown value={newStudent.yearLevel} size='small' style={{...defaultFormStyle, marginRight: '0px'}} handler={studentFormValueChange}/>
        <CustomTextField value={newStudent.cabinetId} column='cabinetId' title="Cabinet ID" handler={studentFormValueChange} style={defaultFormStyle}/>
        <CustomTextField value={newStudent.yearGraduated} column='yearGraduated' handler={studentFormValueChange} style={defaultFormStyle}/>
        <CustomRadioField value={newStudent.type} required column="type" options={[{key: 'regular'}, {key: 'irregular'}]} handler={studentFormValueChange}/>
        <PageSubtitle>Personal Information</PageSubtitle>
        <CustomTextField value={newStudent.lastName} required column='lastName' handler={studentFormValueChange} style={defaultFormStyle}/>
        <CustomTextField value={newStudent.firstName} required column='firstName' handler={studentFormValueChange} style={defaultFormStyle}/>
        <CustomTextField value={newStudent.middleName} column='middleName' style={{...defaultFormStyle, marginRight: '0px'}} handler={studentFormValueChange} />
        <GenderDropdown value={newStudent.gender} required size='small' style={defaultFormStyle} handler={studentFormValueChange}/>
        <CustomDatePicker value={newStudent.birthday} required column='birthday' style={defaultFormStyle} handler={studentFormValueChange}/>
        <CivilStatusDropdown value={newStudent.civilStatus} size='small' style={{...defaultFormStyle, marginRight: '0px'}} handler={studentFormValueChange}/>
        <PageSubtitle>Contact Information</PageSubtitle>
        <CustomTextField value={newStudent.mobileNumber} required column='mobileNumber' type="number" handler={studentFormValueChange} style={defaultFormStyle}/>
        <CustomTextField value={newStudent.emailAddress} required column='emailAddress' type="email" handler={studentFormValueChange} style={defaultFormStyle}/>
        <CustomTextField value={newStudent.occupation} column='occupation' style={{...defaultFormStyle, marginRight: '0px'}} handler={studentFormValueChange} />
        <CustomTextField value={newStudent.presentAddress} required fullWidth column='presentAddress' style={{marginRight: '0px', marginBottom: '10px'}} handler={studentFormValueChange}/>
        <FormControlLabel control={<Checkbox onChange={(e) => setSameAddress(e.target.checked)}/>} label="Same as above" />
        <CustomTextField value={newStudent.permanentAddress} required fullWidth column='permanentAddress' style={{marginRight: '0px', marginBottom: '10px'}} handler={studentFormValueChange}/>
        <PageSubtitle>Guardian&apos;s Information</PageSubtitle>
        <CustomTextField value={newStudent?.guardians && newStudent?.guardians[0]?.name} column='guardian.0.name' title="Guardian's Name" handler={guardianIsAdded} style={defaultFormStyle}/>
        <CustomTextField value={newStudent?.guardians && newStudent?.guardians[0]?.mobileNumber} column='guardian.0.mobileNumber' title="Guardian's Mobile Number" handler={guardianIsAdded} style={defaultFormStyle}/>
        <CustomTextField value={newStudent?.guardians && newStudent?.guardians[0]?.relationship} column='guardian.0.relationship' title="Relationship" style={{...defaultFormStyle, marginRight: '0px'}} handler={guardianIsAdded} />
        <CustomTextField value={newStudent?.guardians && newStudent?.guardians[1]?.name} column='guardian.1.name' title="Guardian's Name" handler={guardianIsAdded} style={defaultFormStyle}/>
        <CustomTextField value={newStudent?.guardians && newStudent?.guardians[1]?.mobileNumber} column='guardian.1.mobileNumber' title="Guardian's Mobile Number" handler={guardianIsAdded} style={defaultFormStyle}/>
        <CustomTextField value={newStudent?.guardians && newStudent?.guardians[1]?.relationship} column='guardian.1.relationship' title="Relationship" style={{...defaultFormStyle, marginRight: '0px'}} handler={guardianIsAdded} />
     </CustomModal>  
  );
}
