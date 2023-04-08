import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

type SortOrderProps = {
    handler: any;
}

export default function SortOrder(props: SortOrderProps) {
  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="sort-options">Order</InputLabel>
        <Select
          labelId="sort-type"
          id='sort-type'
          label='Sort Type'
          style={{height: '48px', background: '#fff'}}
          onChange={(e) => props.handler({sort: {sortType: e.target.value}})}
          defaultValue="asc"
        > 
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}