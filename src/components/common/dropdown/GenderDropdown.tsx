import CustomDropdown, { DropdownProps } from "./CustomDropdown";

export default function GenderDropdown(props: DropdownProps){
   
    const genderOptions = [
        { key: 'male', value: "Male"},
        { key: 'female', value: "Female"}
    ]

    return (
        <CustomDropdown 
            column="gender" 
            options={genderOptions} 
            {...props}
        />
    );

}