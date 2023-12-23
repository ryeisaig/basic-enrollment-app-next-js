import CustomDropdown, { DropdownProps } from "../common/dropdown/CustomDropdown";

export default function UserStatusDropdown(props: DropdownProps){
   
    const statusOptions = [
        { key: 'active', value: "Active"},
        { key: 'inactive', value: "Inactive"},
        { key: 'terminated', value: "Terminated"}
    ]

    return (
        <CustomDropdown 
            {...props}
            value={props.value?.toString()}
            column="status" 
            options={statusOptions} 
        />
    );

}