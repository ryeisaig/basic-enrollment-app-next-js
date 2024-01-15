import { getAll } from "@/actions/CoreActions";
import { selectListState } from "@/store/listSlice";
import { LookupKeys, Resources } from "@/utils/ApiConstants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown, { DropdownProps } from "../common/dropdown/CustomDropdown";
import { periodMap } from "./AcademicSubPeriodDropdown";

export default function AcademicPeriodDropdown(props: DropdownProps){
    const dispatch = useDispatch();
    const { lookups }: any = useSelector(selectListState);

    const acadPeriodOptions = lookups.academicPeriod ? lookups.academicPeriod.map((lookup: any) => { 
        return { key: lookup._id, value: `${lookup.year} - ${periodMap(lookup.period)}` }
    }) : [];
    
    useEffect(() => {
        getAll(Resources.ACADEMIC_PERIODS, LookupKeys.ACADEMIC_PERIOD, dispatch);
    }, [dispatch]);

    return (
        <CustomDropdown 
            title="Academic Period"
            column="academicPeriodId"
            options={acadPeriodOptions} 
            {...props}
        />
    );

}