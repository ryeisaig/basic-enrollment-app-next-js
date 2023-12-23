import { selectListState } from "@/store/listSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown, { DropdownProps } from "../common/dropdown/CustomDropdown";
import { getAll } from "@/actions/CoreActions";
import { LookupKeys, Resources } from "@/utils/ApiConstants";

export default function RoomDropdown(props: DropdownProps){
    const dispatch = useDispatch();
    const { lookups }: any = useSelector(selectListState);
    const roomOptions = lookups.room ? lookups.room.map((lookup: any) => { 
        return { key: lookup._id, value: lookup.code }
    }) : [];
    
    useEffect(() => {
        getAll(Resources.ROOMS, LookupKeys.ROOM, dispatch);
    }, [dispatch]);

    return (
        <CustomDropdown 
            column="roomId" 
            title="Room"
            options={roomOptions} 
            {...props}
        />
    );

}