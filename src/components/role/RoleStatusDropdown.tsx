import CustomDropdown, { DropdownProps } from "../common/dropdown/CustomDropdown";

export default function RoleStatusDropdown(props: DropdownProps){
   
    const statusOptions = [
        { key: 'active', value: "Active"},
        { key: 'inactive', value: "Inactive"}
    ]

    return (
        <CustomDropdown 
            {...props}
            value={props.value?.toString()}
            column="role" 
            options={statusOptions} 
        />
    );

}