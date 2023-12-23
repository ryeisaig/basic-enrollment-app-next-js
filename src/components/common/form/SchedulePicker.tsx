import CustomDropdown, { DropdownProps } from "../dropdown/CustomDropdown";

const arrayRange = (start: number, stop: number, step: number) =>
Array.from({ length: (stop - start) / step + 1 },(value, index) => start + index * step);

const HOUR_OPTIONS = arrayRange(7, 20, 1);
const MINS_OPTIONS = arrayRange(0, 55, 5);
const TIME_OPTIONS = HOUR_OPTIONS.map(h => MINS_OPTIONS.map(m => { return {key : `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`}})).flat();

const DAY_OPTIONS = [
    {key: "Mon"},
    {key: "Tue"},
    {key: "Wed"},
    {key: "Thu"},
    {key: "Fri"},
    {key: "Sat"},
    {key: "Sun"}
];

export default function SchedulePicker(props: any){
    return(
        <div>
            <CustomDropdown title="Day" column="day" options={DAY_OPTIONS} {...props} value={props.value?.day} />
            <CustomDropdown title="Start Time" column="timeStart" options={TIME_OPTIONS} {...props} value={props.value?.timeStart} />
            <CustomDropdown title="End Time" column="timeEnd" options={TIME_OPTIONS} {...props} value={props.value?.timeEnd} style={{...props.style, marginRight: "0px"}}/>
        </div>
    );
}