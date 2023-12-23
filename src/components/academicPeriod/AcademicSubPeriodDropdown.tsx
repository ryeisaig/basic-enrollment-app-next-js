import CustomDropdown, { DropdownProps } from "../common/dropdown/CustomDropdown";

export const periodMap = (key: string) => {
    switch(key){
        case '1': return "1st";
        case '2': return "2nd";
        case '3': return "Summer";
        default: return key;
    }
}

export default function AcademicSubPeriodDropdown(props: DropdownProps){
   
    const options = [
        { key: '1', value: "1st Semester"},
        { key: '2', value: "2nd Semester"},
        { key: '3', value: "Summer"}
    ]

    return (
        <CustomDropdown 
            {...props}
            column="period" 
            options={options} 
        />
    );

}