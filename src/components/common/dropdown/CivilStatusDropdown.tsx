import CustomDropdown, { DropdownProps } from "./CustomDropdown";

export default function CivilStatusDropdown(props: DropdownProps){
   
    const civilStatusOptions = [
        { key: 'unmarried', value: "Unmarried"},
        { key: 'married', value: "Married"}
    ]

    return (
        <CustomDropdown 
            {...props}
            column="civilStatus" 
            options={civilStatusOptions} 
        />
    );

}