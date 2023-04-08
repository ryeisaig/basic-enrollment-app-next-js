import { getCourses } from "@/actions/CourseActions";
import { getSection } from "@/actions/SectionActions";
import { selectListState } from "@/store/listSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown from "../common/CustomDropdown";

type DropdownProps = {
    title?: string;
    handler?: any;
    fullWidth?: boolean;
    style?: any;
    size?: "small" | "medium";
    required?: boolean;
}

export default function SectionDropdown(props: DropdownProps){
    const dispatch = useDispatch();
    const { lookups }: any = useSelector(selectListState);
    const sectionOptions = lookups.section ? lookups.section.map((lookup: any) => { 
        return { key: lookup._id, value: lookup.course.code + ' ' + lookup.year + '-' + lookup.sectionNumber }
    }) : [];
    
    useEffect(() => {
        getSection(dispatch);
    }, []);

    return (
        <CustomDropdown 
            fullWidth={props.fullWidth} 
            handler={props.handler} 
            title={props.title} 
            column="section" options={sectionOptions} 
            size={props.size} 
            style={props.style}
            required={props.required}
        />
    );

}