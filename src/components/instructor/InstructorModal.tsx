import { getList, save } from "@/actions/CoreActions";
import { selectListState } from "@/store/listSlice";
import { Instructor } from "@/types/instructor";
import { Resources } from "@/utils/ApiConstants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomTextField from "../common/form/CustomTextField";
import PageSubtitle from "../common/typography/PageSubtitle";
import CustomModal, { ModalProps, defaultFormStyle } from "../common/wrapper/CustomModal";

export default function InstructorModal(props: ModalProps) {
  const dispatch = useDispatch();

  const {page, rowsPerPage, filters, sort, keyword}: any = useSelector(selectListState);
  const initialValues  = {
    employeeId: '',
    lastName: '',
    firstName: '',
    middleName: '',
    mobileNumber: undefined,
    emailAddress: '',
  };

  const [newInstructor, setNewInstructor] = useState<Instructor>(initialValues);

  const formValueChange = (field: string, value: any) => setNewInstructor({...newInstructor, [field]: value});
  
  const handleSubmit = async () => {
    await save(Resources.INSTRUCTORS, newInstructor, dispatch);
    await getList(
      Resources.INSTRUCTORS,
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
    !props.data && setNewInstructor(initialValues);
    props.onClose();
  }

  useEffect(() => {
    if(props.data){
      setNewInstructor(props.data)
    }
  }, [props.data])

  return (
    <CustomModal {...props} onClose={onClose} handleSubmit={handleSubmit}>
        <PageSubtitle>Personal Information</PageSubtitle>
        <CustomTextField value={newInstructor.employeeId} required column='employeeId' title="Employee No." placeholder='Eg: 012345' handler={formValueChange} style={defaultFormStyle}/>
        <br/>
        <CustomTextField value={newInstructor.lastName} required column='lastName' handler={formValueChange} style={defaultFormStyle}/>
        <CustomTextField value={newInstructor.firstName} required column='firstName' handler={formValueChange} style={defaultFormStyle}/>
        <CustomTextField value={newInstructor.middleName} column='middleName' style={{...defaultFormStyle, marginRight: '0px'}} handler={formValueChange} />
        <CustomTextField value={newInstructor.emailAddress} required column='emailAddress' type="email" handler={formValueChange} style={defaultFormStyle}/>
        <CustomTextField value={newInstructor.mobileNumber} column='mobileNumber' type="number" handler={formValueChange} style={defaultFormStyle}/>
   </CustomModal>  
  );
}
