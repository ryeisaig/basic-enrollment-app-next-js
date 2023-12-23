import { selectListState } from "@/store/listSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown, { DropdownProps } from "../common/dropdown/CustomDropdown";
import { getAll } from "@/actions/CoreActions";
import { LookupKeys, Resources } from "@/utils/ApiConstants";

export default function CollegeDropdown(props: DropdownProps){
    const dispatch = useDispatch();
    const { lookups }: any = useSelector(selectListState);
    const collegeOptions = lookups.college ? lookups.college.map((lookup: any) => { 
        return { key: lookup._id, value: lookup.code }
    }) : [];
    
    useEffect(() => {
        getAll(Resources.COLLEGES, LookupKeys.COLLEGE, dispatch);
    }, [dispatch]);

    return (
        <CustomDropdown 
            title="College"
            column="collegeId" options={collegeOptions} 
            {...props}
        />
    );

}