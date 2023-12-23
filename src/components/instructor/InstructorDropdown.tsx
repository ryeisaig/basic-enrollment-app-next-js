import { getAll } from "@/actions/CoreActions";
import { selectListState } from "@/store/listSlice";
import { LookupKeys, Resources } from "@/utils/ApiConstants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown, { DropdownProps } from "../common/dropdown/CustomDropdown";

export default function InstructorDropdown(props: DropdownProps){
    const dispatch = useDispatch();
    const { lookups }: any = useSelector(selectListState);
    const instructorOptions = lookups.instructor ? lookups.instructor.map((lookup: any) => { 
        return { key: lookup._id, value: `${lookup.lastName}, ${lookup.firstName}` }
    }) : [];
    
    useEffect(() => {
        getAll(Resources.INSTRUCTORS, LookupKeys.INSTRUCTOR, dispatch);
    }, [dispatch]);

    return (
        <CustomDropdown 
            title="Teacher"
            column="instructorId"
            {...props}
            options={instructorOptions} 
        />
    );

}