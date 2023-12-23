import CustomDropdown, { DropdownProps } from "../common/dropdown/CustomDropdown";

export default function SubjectTypeDropdown(props: DropdownProps){
    const subjectTypeDropdown = [
        { key: 'lecture', value: "Lecture"},
        { key: 'laboratory', value: "Laboratory"}
    ]
    return (
        <CustomDropdown 
            {...props}
            column="type" 
            options={subjectTypeDropdown} 
        />
    );

}