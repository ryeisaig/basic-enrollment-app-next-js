import { getList, save } from "@/actions/CoreActions";
import { selectListState } from "@/store/listSlice";
import { Resources } from "@/utils/ApiConstants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomTextField from "../common/form/CustomTextField";
import PageSubtitle from "../common/typography/PageSubtitle";
import CustomModal, { ModalProps, defaultFormStyle } from "../common/wrapper/CustomModal";
import { Role } from "@/types/role";
import PermissionSelector from "./PermissionSelector";
import CustomRadioField from "../common/form/CustomRadio";

export default function RoleModal(props: ModalProps) {
  const dispatch = useDispatch();

  const {page, rowsPerPage, filters, sort, keyword}: any = useSelector(selectListState);
  const initialValues  = {
    permissions: [],
    status: 'active'
  };

  const [newRole, setNewRole] = useState<Role>(initialValues);
  const formValueChange = (field: string, value: any) => setNewRole({...newRole, [field]: value});
  
  
  const handleSubmit = async () => {
    await save(Resources.ROLES, newRole, dispatch, props.forceRemoveId);
    await getList(
      Resources.ROLES,
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
    !props.data && setNewRole(initialValues);
    props.onClose();
  }

  useEffect(() => {
    if(props.data){
      setNewRole(props.data)
    }
  }, [props.data])

  return (
    <CustomModal {...props} onClose={onClose} handleSubmit={handleSubmit}>
        <PageSubtitle>Role Information</PageSubtitle>
        <CustomTextField value={newRole.code} required column='code' handler={formValueChange} style={defaultFormStyle}/>
        <CustomTextField value={newRole.name} required column='name' style={defaultFormStyle} handler={formValueChange}/>
        <CustomRadioField value={newRole.status} required column="status" options={[{key: 'active'}, {key: 'inactive'}]} handler={formValueChange}/>
        <PermissionSelector value={newRole.permissions} column='permissions' handler={formValueChange} />
     </CustomModal>  
  );
}
