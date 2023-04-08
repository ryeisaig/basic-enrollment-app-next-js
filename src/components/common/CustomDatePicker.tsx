import { toTitle } from '@/utils/StringUtils';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';

type CustomDatePickerProps = {
    title?: string;
    column: string;
    value?: string;
    handler: any;
    required?: boolean;
    style?: any;
}

export default function CustomDatePicker(props: CustomDatePickerProps) {

  const [value, setValue] = useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label={props.title ? props.title : toTitle(props.column)}
          inputFormat="MM/DD/YYYY"
          value={value}
          onChange={(newValue) => {props.handler(props.column, newValue); setValue(newValue)}}
          renderInput={(params) => <TextField size="small" required={props.required} style={props.style}
          {...params} />}
        />
    </LocalizationProvider>
  );
}