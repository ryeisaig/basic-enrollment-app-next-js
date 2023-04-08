import { getCourses } from "@/actions/CourseActions";
import { selectListState } from "@/store/listSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown from "./CustomDropdown";

type DropdownProps = {
    value?: string;
    title?: string;
    handler?: any;
    fullWidth?: boolean;
    style?: any;
    size?: "small" | "medium";
    required?: boolean;
}

export default function CourseDropdown(props: DropdownProps){
    const dispatch = useDispatch();
    const { lookups }: any = useSelector(selectListState);
    const courseOptions = lookups.course ? lookups.course.map((lookup: any) => { 
        return { key: lookup._id, value: lookup.code }
    }) : [];
    
    useEffect(() => {
        getCourses(dispatch);
    }, []);

    return (
        <CustomDropdown 
            {...props}
            column="course" options={courseOptions} 
        />
    );

}