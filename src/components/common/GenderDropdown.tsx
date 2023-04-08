import CustomDropdown from "./CustomDropdown";

type DropdownProps = {
    title?: string;
    handler?: any;
    fullWidth?: boolean;
    style?: any;
    size?: "small" | "medium";
    required?: boolean;
    value?: string;
}

export default function GenderDropdown(props: DropdownProps){
   
    const genderOptions = [
        { key: 'male', value: "Male"},
        { key: 'female', value: "Female"}
    ]

    return (
        <CustomDropdown 
            {...props}
            column="gender" 
            options={genderOptions} 
        />
    );

}