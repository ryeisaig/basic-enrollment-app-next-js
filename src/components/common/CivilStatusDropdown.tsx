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