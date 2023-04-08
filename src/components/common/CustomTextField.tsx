import { toTitle } from "@/utils/StringUtils";
import { TextField } from "@mui/material";

type TextFieldProps = {
    value?: string;
    title?: string;
    column: string;
    handler?: any;
    fullWidth?: boolean;
    style?: any;
    required?: boolean;
    placeholder?: string;
    type?: string;
}

export default function CustomTextField(props: TextFieldProps){
    return(
        <TextField
            value={props.value}
            type={props.type ? props.type : 'text'}
            fullWidth={props.fullWidth}
            required={props.required}
            id={props.column}
            label={props.title ? props.title : toTitle(props.column)}
            placeholder={props.placeholder}
            style={{marginBottom: '10px', marginRight: '10px', padding: '0', ...props.style}}
            size="small"
            onChange={(e) => props.handler(props.column, e.target.value)}
      />
    );
}