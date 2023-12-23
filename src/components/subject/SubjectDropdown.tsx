import { selectListState } from "@/store/listSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown, { DropdownProps } from "../common/dropdown/CustomDropdown";
import { getAll } from "@/actions/CoreActions";
import { LookupKeys, Resources } from "@/utils/ApiConstants";

export default function SubjectDropdown(props: DropdownProps){
    const dispatch = useDispatch();
    const { lookups }: any = useSelector(selectListState);
    const subjectOptions = lookups.subject ? lookups.subject.map((lookup: any) => { 
        return { key: lookup._id, value: lookup.code }
    }) : [];
    
    useEffect(() => {
        getAll(Resources.SUBJECTS, LookupKeys.SUBJECT, dispatch);
    }, [dispatch]);

    return (
        <CustomDropdown 
            column="subjectId"
            title="Subject"
            options={subjectOptions} 
            {...props}
        />
    );

}