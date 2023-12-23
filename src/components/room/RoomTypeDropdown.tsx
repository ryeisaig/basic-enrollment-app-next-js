import CustomDropdown, { DropdownProps } from "../common/dropdown/CustomDropdown";

export default function RoomTypeDropdown(props: DropdownProps){
    const roomTypeDropdown = [
        { key: 'lecture', value: "Lecture"},
        { key: 'laboratory', value: "Laboratory"},
        { key: 'avr', value: "AVR"}
    ]
    return (
        <CustomDropdown 
            {...props}
            column="type" 
            options={roomTypeDropdown} 
        />
    );

}