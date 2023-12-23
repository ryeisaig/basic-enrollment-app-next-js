import { getSectionsByCourseAndYearLevel } from "@/actions/SectionActions";
import { selectListState } from "@/store/listSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown, { DropdownProps } from "../common/dropdown/CustomDropdown";

export default function SectionDropdown(props: DropdownProps){
    const dispatch = useDispatch();
    const { lookups }: any = useSelector(selectListState);

    let filteredOptions = lookups?.section;
    if(props.filter){
        Object.keys(props.filter).map(key => {
            filteredOptions = filteredOptions?.filter((section: any) => props.filter[key] ? section[key] === props.filter[key] : true)
        });
    }

    const sectionOptions = filteredOptions ? filteredOptions.map((option: any) => { 
        return { key: option._id, value: option.course.code + ' ' + option.yearLevel + '-' + option.sectionNumber }
    }) : [];
    
    useEffect(() => {
        getSectionsByCourseAndYearLevel(dispatch);
    }, [dispatch]);

    return (
        <CustomDropdown 
            column="sectionId" 
            title="Section"
            options={sectionOptions} 
            {...props}
        />
    );

}