import CustomDropdown, { DropdownProps } from "../common/dropdown/CustomDropdown";

export default function GradeDropdown(props: DropdownProps){
   
    const gradeOptions = [
        { key: '1.00'},
        { key: '1.25'},
        { key: '1.50'},
        { key: '1.75'},
        { key: '2.00'},
        { key: '2.25'},
        { key: '2.50'},
        { key: '2.75'},
        { key: '3.00'},
        { key: '4.00'},
        { key: '5.00'},
        { key: 'INC'},
        { key: 'DROP'}
    ]

    return (
        <CustomDropdown 
            {...props}
            value={props.value?.toString()}
            column="grade" 
            options={gradeOptions} 
        />
    );

}