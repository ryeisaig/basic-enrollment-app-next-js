import CustomDropdown from "../common/CustomDropdown";

type DropdownProps = {
    title?: string;
    handler?: any;
    fullWidth?: boolean;
    style?: any;
    size?: "small" | "medium";
    required?: boolean;
    value?: number;
}

export default function YearLevelDropdown(props: DropdownProps){
   
    const yearOptions = [
        { key: '1', value: "1st Year"},
        { key: '2', value: "2nd Year"},
        { key: '3', value: "3rd Year"},
        { key: '4', value: "4th Year"},
        { key: '5', value: "5th Year"}
    ]

    return (
        <CustomDropdown 
            {...props}
            value={props.value?.toString()}
            column="yearLevel" 
            options={yearOptions} 
        />
    );

}