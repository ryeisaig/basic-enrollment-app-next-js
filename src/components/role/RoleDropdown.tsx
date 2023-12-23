import { selectListState } from "@/store/listSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown, { DropdownProps } from "../common/dropdown/CustomDropdown";
import { getAll } from "@/actions/CoreActions";
import { LookupKeys, Resources } from "@/utils/ApiConstants";

export default function RoleDropdown(props: DropdownProps){
    const dispatch = useDispatch();
    const { lookups }: any = useSelector(selectListState);
    const roleOptions = lookups.role ? lookups.role.map((lookup: any) => { 
        return { key: lookup._id, value: lookup.name }
    }) : [];
    
    useEffect(() => {
        getAll(Resources.ROLES, LookupKeys.ROLE, dispatch);
    }, [dispatch]);

    return (
        <CustomDropdown 
            column="roleId" options={roleOptions} 
            title="Role"
            {...props}
        />
    );

}