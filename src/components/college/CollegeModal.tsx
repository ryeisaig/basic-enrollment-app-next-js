import { selectListState } from "@/store/listSlice";
import { College } from "@/types/college";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomModal, { ModalProps, defaultFormStyle } from "../common/wrapper/CustomModal";
import CustomTextField from "../common/form/CustomTextField";
import PageSubtitle from "../common/typography/PageSubtitle";
import { getList, save } from "@/actions/CoreActions";
import { Resources } from "@/utils/ApiConstants";

export default function CollegeModal(props: ModalProps) {
  const dispatch = useDispatch();

  const {page, rowsPerPage, filters, sort, keyword}: any = useSelector(selectListState);
  const initialValues  = {
    code: '',
    name: ''
  };

  const [newCollege, setNewCollege] = useState<College>(initialValues);
  const formValueChange = (field: string, value: any) => setNewCollege({...newCollege, [field]: value});
  
  const handleSubmit = async () => {
    await save(Resources.COLLEGES, newCollege, dispatch);
    await getList(
      Resources.COLLEGES,
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
    !props.data && setNewCollege(initialValues);
    props.onClose();
  }

  useEffect(() => {
    if(props.data){
      setNewCollege(props.data)
    }
  }, [props.data])

  return (
    <CustomModal {...props} onClose={onClose} handleSubmit={handleSubmit}>
        <PageSubtitle>College Information</PageSubtitle>
        <CustomTextField value={newCollege.code} required column='code' placeholder='Eg: CEIT' handler={formValueChange} style={{...defaultFormStyle}}/>
        <CustomTextField value={newCollege.name} required title="Description" column='name' placeholder='Eg: Bachelor of Science in Information Technology' fullWidth={true} handler={formValueChange}/>
     </CustomModal>  
  );
}
