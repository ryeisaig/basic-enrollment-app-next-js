import { toTitle } from "@/utils/StringUtils";
import { TextField } from "@mui/material";

type TextFieldProps = {
    value?: any;
    title?: string;
    column: string;
    handler?: any;
    fullWidth?: boolean;
    style?: any;
    required?: boolean;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
    onEnter?: any;
}

export default function CustomTextField(props: TextFieldProps){
    return(
        <TextField
            onKeyDown={(e) => e.key.toLowerCase() === 'enter' && props.onEnter && props.onEnter(e)}
            value={props.value}
            type={props.type ? props.type : 'text'}
            fullWidth={props.fullWidth}
            required={props.required}
            id={props.column}
            label={props.title ? props.title : toTitle(props.column)}
            placeholder={props.placeholder}
            style={{marginBottom: '10px', marginRight: '10px', padding: '0', background: props.disabled && "#eeeeee", ...props.style}}
            size="small"
            onChange={(e) => props.handler(props.column, e.target.value)}
            disabled={props.disabled}            
      />
    );
}