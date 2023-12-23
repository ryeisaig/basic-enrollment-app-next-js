import { selectListState } from "@/store/listSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown, { DropdownProps } from "../common/dropdown/CustomDropdown";
import { getAll } from "@/actions/CoreActions";
import { LookupKeys, Resources } from "@/utils/ApiConstants";

export default function CourseDropdown(props: DropdownProps){
    const dispatch = useDispatch();
    const { lookups }: any = useSelector(selectListState);
    
    let filteredOptions = lookups?.course;
    if(props.filter){
        Object.keys(props.filter).map(key => {
            filteredOptions = filteredOptions?.filter((course: any) => props.filter[key] ? course[key] === props.filter[key] : true)
        });
    }

    const courseOptions = filteredOptions ? filteredOptions.map((lookup: any) => { 
        return { key: lookup._id, value: lookup.code }
    }) : [];
    
    useEffect(() => {
        getAll(Resources.COURSES, LookupKeys.COURSE, dispatch);
    }, [dispatch]);

    return (
        <CustomDropdown 
            column="courseId" options={courseOptions} 
            title="Course"
            {...props}
        />
    );

}