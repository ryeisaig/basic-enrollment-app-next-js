import moment from "moment";
import CustomDropdown, { DropdownProps } from "../common/dropdown/CustomDropdown";

export default function AcademicYearDropdown(props: DropdownProps){
    const options = []
    const currentDate = new Date();

    const INITIAL_YEAR = 1934;
    const CURRENT_YEAR = moment(currentDate).year();

    for(let i = CURRENT_YEAR; i >= INITIAL_YEAR; i--){
        const option = `${i}-${i+1}`;
        options.push({key: option, value: option});
    }

    return (
        <CustomDropdown 
            {...props}
            column="year" 
            options={options} 
        />
    );

}