import { getStudents, saveStudent } from "@/actions/StudentActions";
import { selectListState } from "@/store/listSlice";
import { Student } from "@/types/student";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CivilStatusDropdown from "../common/CivilStatusDropdown";
import CourseDropdown from "../common/CourseDropdown";
import CustomDatePicker from "../common/CustomDatePicker";
import CustomModal, { defaultFormStyle } from "../common/CustomModal";
import CustomRadioField from "../common/CustomRadio";
import CustomTextField from "../common/CustomTextField";
import GenderDropdown from "../common/GenderDropdown";
import PageSubtitle from "../common/PageSubtitle";
import YearLevelDropdown from "./YearLevelDropdown";

export type ModalProps = {
  title: string;
  open: boolean;
  onClose: any;
  data?: any;
}

export default function StudentModal(props: ModalProps) {
  const dispatch = useDispatch();

  const {page, rowsPerPage, filters, sort, keyword}: any = useSelector(selectListState);
  const initialStudentValues  = {
    studentNumber: '',
    cabinetId: '',
    yearLevel: 0,
    course: '',
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

  const studentFormValueChange = (field: string, value: string) => {
    setNewStudent({...newStudent, [field]: value});
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
    await saveStudent(newStudent, dispatch);
    await getStudents({
      filters: filters, 
      sort: sort, 
      keyword: keyword,
      page: page,
      rowsPerPage: rowsPerPage, 
    }, dispatch);
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
      setNewStudent(props.data)
    }
  }, [props.data])

  return (
    <CustomModal {...props} onClose={onClose} handleSubmit={handleSubmit}>
        <PageSubtitle>Academic Information</PageSubtitle>
        <CustomTextField value={newStudent.studentNumber} required column='studentNumber' placeholder='Eg: 012345' handler={studentFormValueChange} style={defaultFormStyle}/>
        <CourseDropdown value={newStudent.course} required size='small' style={defaultFormStyle} handler={studentFormValueChange}/>
        <YearLevelDropdown value={newStudent.yearLevel} size='small' style={{...defaultFormStyle, marginRight: '0px'}} handler={studentFormValueChange}/>
        <CustomTextField value={newStudent.cabinetId} column='cabinetId' handler={studentFormValueChange} style={defaultFormStyle}/>
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
        <PageSubtitle>Guardian's Information</PageSubtitle>
        <CustomTextField value={newStudent?.guardians && newStudent?.guardians[0]?.name} column='guardian.0.name' title="Guardian's Name" handler={guardianIsAdded} style={defaultFormStyle}/>
        <CustomTextField value={newStudent?.guardians && newStudent?.guardians[0]?.mobileNumber} column='guardian.0.mobileNumber' title="Guardian's Mobile Number" handler={guardianIsAdded} style={defaultFormStyle}/>
        <CustomTextField value={newStudent?.guardians && newStudent?.guardians[0]?.relationship} column='guardian.0.relationship' title="Relationship" style={{...defaultFormStyle, marginRight: '0px'}} handler={guardianIsAdded} />
        <CustomTextField value={newStudent?.guardians && newStudent?.guardians[1]?.name} column='guardian.1.name' title="Guardian's Name" handler={guardianIsAdded} style={defaultFormStyle}/>
        <CustomTextField value={newStudent?.guardians && newStudent?.guardians[1]?.mobileNumber} column='guardian.1.mobileNumber' title="Guardian's Mobile Number" handler={guardianIsAdded} style={defaultFormStyle}/>
        <CustomTextField value={newStudent?.guardians && newStudent?.guardians[1]?.relationship} column='guardian.1.relationship' title="Relationship" style={{...defaultFormStyle, marginRight: '0px'}} handler={guardianIsAdded} />
     </CustomModal>  
  );
}
