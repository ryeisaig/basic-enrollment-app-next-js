import { getList, save } from "@/actions/CoreActions";
import { selectListState } from "@/store/listSlice";
import { Room } from "@/types/room";
import { Resources } from "@/utils/ApiConstants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomModal, { ModalProps, defaultFormStyle } from "../common/wrapper/CustomModal";
import PageSubtitle from "../common/typography/PageSubtitle";
import CustomTextField from "../common/form/CustomTextField";
import RoomTypeDropdown from "./RoomTypeDropdown";

export default function RoomModal(props: ModalProps) {
  const dispatch = useDispatch();

  const {page, rowsPerPage, filters, sort, keyword}: any = useSelector(selectListState);
  const initialValues  = {
    code: '',
    name: '',
    type: '',
    contactPerson: '',
    contactNumber: '',
    college: undefined
  };

  const [newRoom, setNewRoom] = useState<Room>(initialValues);
  const formValueChange = (field: string, value: any) => setNewRoom({...newRoom, [field]: value});
  
  const handleSubmit = async () => {
    await save(Resources.ROOMS, newRoom, dispatch);
    await getList(
      Resources.ROOMS,
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
    !props.data && setNewRoom(initialValues);
    props.onClose();
  }

  useEffect(() => {
    if(props.data){
      setNewRoom(props.data)
    }
  }, [props.data])

  return (
    <CustomModal {...props} onClose={onClose} handleSubmit={handleSubmit}>
        <PageSubtitle>Room Information</PageSubtitle>
        <RoomTypeDropdown value={newRoom.type} required size='small' style={defaultFormStyle} handler={formValueChange}/>
        <CustomTextField value={newRoom.code} required column='code' placeholder='Eg: N101' handler={formValueChange} style={defaultFormStyle}/>
        <CustomTextField value={newRoom.name} title="Room Name" column='name' placeholder='Eg: Room 101' style={{...defaultFormStyle, marginRight: 0}} handler={formValueChange}/>
        <CustomTextField value={newRoom.contactPerson} column='contactPerson' handler={formValueChange} style={defaultFormStyle}/>
        <CustomTextField value={newRoom.contactNumber} column='contactNumber' handler={formValueChange} style={defaultFormStyle}/>
     </CustomModal>  
  );
}
