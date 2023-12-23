import { TypeKey } from '@/types/typekey';
import * as StringUtils from '@/utils/StringUtils';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

type SorterProps = {
    options: TypeKey[];
    handler: any;
}

export default function SortField(props: SorterProps) {
  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="sort-options">Sort By</InputLabel>
        <Select
          labelId="sort-options"
          id='sort-options'
          label='Sort By'
          style={{height: '48px', background: '#fff'}}
          onChange={(e) => props.handler({sort: {sortField: e.target.value}})}
          defaultValue={props.options[0].key}
        >
            {
                props.options.map(opt => {
                    return(
                        <MenuItem key={opt.key} value={opt.key}>{opt.value ? opt.value : StringUtils.toTitle(opt.key)}</MenuItem>
                    )
                })
            }
        </Select>
      </FormControl>
    </>
  );
}