import { TypeKey } from "@/types/typekey";
import { toTitle } from "@/utils/StringUtils";
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";

type RadioFieldProps = {
    column: string;
    handler?: any;
    required?: boolean;
    options: TypeKey[];
    style?: any;
    value?: string;
}

export default function CustomRadioField(props: RadioFieldProps){
    return(
    <FormControl required={props.required} style={props.style && props.style}>
        <RadioGroup value={props.value} row name={props.column} onChange={(e) => props.handler(props.column, e.target.value)}>
         {
            props.options.map(o => {
                return (
                    <FormControlLabel value={o.key} control={<Radio />} label={o.value ? o.value : toTitle(o.key)} />
                )
            })
         }
        </RadioGroup>
    </FormControl>
    );
}