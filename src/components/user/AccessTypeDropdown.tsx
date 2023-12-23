import CustomDropdown, { DropdownProps } from "../common/dropdown/CustomDropdown";

export default function AccessTypeDropdown(props: DropdownProps){
   
    const statusOptions = [
        { key: 'operational', value: "Operational Access"},
        { key: 'instructor', value: "Instructor Access"},
        { key: 'student', value: "Student Access"}
    ]

    return (
        <CustomDropdown 
            {...props}
            value={props.value?.toString()}
            column="accessType" 
            options={statusOptions} 
        />
    );

}