import { getList, save } from "@/actions/CoreActions";
import { selectListState } from "@/store/listSlice";
import { Subject } from "@/types/subject";
import { Resources } from "@/utils/ApiConstants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomTextField from "../common/form/CustomTextField";
import PageSubtitle from "../common/typography/PageSubtitle";
import CustomModal, { ModalProps, defaultFormStyle } from "../common/wrapper/CustomModal";
import SubjectTypeDropdown from "./SubjectTypeDropdown";

export default function SubjectModal(props: ModalProps) {
  const dispatch = useDispatch();

  const {page, rowsPerPage, filters, sort, keyword}: any = useSelector(selectListState);
  const initialValues  = {
    code: '',
    name: '',
    description: '',
    type: undefined,
    unit: 0,
  };

  const [newSubject, setNewSubject] = useState<Subject>(initialValues);
  const formValueChange = (field: string, value: any) => setNewSubject({...newSubject, [field]: value});
  
  const handleSubmit = async () => {
    await save(Resources.SUBJECTS, newSubject, dispatch);
    await getList(
      Resources.SUBJECTS,
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
    !props.data && setNewSubject(initialValues);
    props.onClose();
  }

  useEffect(() => {
    if(props.data){
      setNewSubject(props.data)
    }
  }, [props.data])

  return (
    <CustomModal {...props} onClose={onClose} handleSubmit={handleSubmit}>
        <PageSubtitle>Subject Information</PageSubtitle>
        <CustomTextField value={newSubject.code} required title="Subject Code" column='code' placeholder='Eg: ENGL1' handler={formValueChange} style={defaultFormStyle}/>
        <CustomTextField value={newSubject.name} required title="Subject Name" column='name' placeholder='Eg: English 1' style={defaultFormStyle} handler={formValueChange}/>
        <SubjectTypeDropdown value={newSubject.type} required size='small' style={{...defaultFormStyle, marginRight: "0px"}} handler={formValueChange}/>
        <CustomTextField value={newSubject.description} column='description' handler={formValueChange} fullWidth style={{marginRight: "0px"}} />
        <CustomTextField type="number" value={newSubject.unit} required column='unit' handler={formValueChange} style={defaultFormStyle}/>
     </CustomModal>  
  );
}
