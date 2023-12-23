import CustomDropdown, { DropdownProps } from "../common/dropdown/CustomDropdown";

export default function CourseTypeDropdown(props: DropdownProps){
   
    const courseTypeDropdown = [
        { key: 'certificate' },
        { key: 'vocational' },
        { key: 'associate' },
        { key: 'bachelor' },
        { key: 'masteral' },
        { key: 'doctoral' }
    ]

    return (
        <CustomDropdown 
            column="courseType" 
            options={courseTypeDropdown} 
            {...props}
        />
    );

}