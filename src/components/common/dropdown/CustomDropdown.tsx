import { TypeKey } from '@/types/typekey';
import * as StringUtils from '@/utils/StringUtils';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

type BaseDropdownProps = {
    value?: string;
    title?: string;
    column: string;
    options: TypeKey[];
    handler?: any;
    fullWidth?: boolean;
    style?: any;
    size?: "small" | "medium";
    required?: boolean;
    disabled?: boolean;
    noBlank?: boolean;
}

export type DropdownProps = {
  value?: string;
  title?: string;
  column?: string;
  handler?: any;
  fullWidth?: boolean;
  style?: any;
  size?: "small" | "medium";
  required?: boolean;
  filter?: any;
  disabled?: boolean;
  noBlank?: boolean;
}


export default function CustomDropdown(props: BaseDropdownProps) {
  return (
      <FormControl fullWidth={props.fullWidth} required={props.required} size={props.size} style={props.style && props.style}>
        <InputLabel id="filter-option">{props.title ? props.title : StringUtils.toTitle(props.column)}</InputLabel>
        <Select
          labelId="filter-option"
          id={props.column}
          value={props.value}
          label={props.title ? props.title : StringUtils.toTitle(props.column)}
          style={{height: !props.size ? '48px' : undefined, background: props.disabled ? "#eeeeee" : "#fff"}}
          onChange={(e) => props.handler(props.column, e.target.value)}
          disabled={props.disabled}
        >
            {!props.noBlank && <MenuItem value="">&nbsp;</MenuItem>}
            {props.options.map((opt) => {
              return(
                  <MenuItem key={opt.key} value={opt.key}>{opt.value ? opt.value : StringUtils.toTitle(opt.key)}</MenuItem>
              )
            })}
        </Select>
      </FormControl>
  );
}