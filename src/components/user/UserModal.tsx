import { getList, save } from "@/actions/CoreActions";
import { selectListState } from "@/store/listSlice";
import { Resources } from "@/utils/ApiConstants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomTextField from "../common/form/CustomTextField";
import PageSubtitle from "../common/typography/PageSubtitle";
import CustomModal, { ModalProps, defaultFormStyle } from "../common/wrapper/CustomModal";
import { User } from "@/types/user";
import RoleDropdown from "../role/RoleDropdown";
import CollegeDropdown from "../college/CollegeDropdown";
import UserStatusDropdown from "./UserStatusDropdown";
import AccessTypeDropdown from "./AccessTypeDropdown";
// @ts-ignore
import bcrypt from 'bcryptjs';

export default function UserModal(props: ModalProps) {
  const dispatch = useDispatch();

  const MOCK_PASSWORD = "**********";
  const {page, rowsPerPage, filters, sort, keyword}: any = useSelector(selectListState);
  const initialValues  = {
    status: 'active',
    accessType: 'operational'
  };

  const [newUser, setNewUser] = useState<User>(initialValues);
  const formValueChange = (field: string, value: any) => setNewUser({...newUser, [field]: value});
  
  const handleSubmit = async () => {

    if(newUser._id && newUser.password === MOCK_PASSWORD){
      delete newUser.password;
    } else {
      const hashedPassword = await bcrypt.hash(newUser.password, process.env.NEXT_PUBLIC_SALT);
      newUser.password = hashedPassword;
    }

    await save(Resources.USERS, newUser, dispatch);
    await getList(
      Resources.USERS,
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
    !props.data && setNewUser(initialValues);
    props.onClose();
  }

  useEffect(() => {
    if(props.data){
      props.data?._id && setNewUser({...props.data, password: MOCK_PASSWORD});
    }
  }, [props.data])

  return (
    <CustomModal {...props} onClose={onClose} handleSubmit={handleSubmit}>
        <PageSubtitle>User Information</PageSubtitle>
        <CustomTextField value={newUser.username} required title="Username" column='username' handler={formValueChange} style={defaultFormStyle}/>
        <CustomTextField type="email" value={newUser.emailAddress} required title="Email Address" column='emailAddress' style={defaultFormStyle} handler={formValueChange}/>
        <CustomTextField type="password" value={newUser.password} required title="Password" column='password' handler={formValueChange} style={{...defaultFormStyle, marginRight: "0px"}}/>
        <CustomTextField value={newUser.firstName} column='firstName' handler={formValueChange} fullWidth  style={defaultFormStyle} />
        <CustomTextField value={newUser.lastName} column='lastName' handler={formValueChange} fullWidth  style={defaultFormStyle} />
        <RoleDropdown value={newUser.roleId} size='small' required handler={formValueChange} style={{...defaultFormStyle, marginRight: "0px"}}/>
        <UserStatusDropdown value={newUser.status} size='small' required column="status" handler={formValueChange}  style={defaultFormStyle} />
        <AccessTypeDropdown  value={newUser.accessType} size='small' required column="accessType" handler={formValueChange}  style={defaultFormStyle}/>
        <div style={{ display: newUser.accessType === 'operational' ? "block" : "none"}}>
          <CollegeDropdown 
              value={newUser.collegeId} 
              title="College (Optional)" 
              size='small' 
              handler={formValueChange} 
              style={defaultFormStyle}
          />
          <span style={{fontSize: "11px"}}>**If the user does not belong to any college, you may leave this as blank**</span>
        </div>
     </CustomModal>  
  );
}
