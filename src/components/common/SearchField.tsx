import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

type SearchFieldProps = {
  handler: any;
}

export default function SearchField(props: SearchFieldProps) {
  const [keyword, setKeyword] = useState<string>("");
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300, height: '48px'}}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Type any keyword..."
        inputProps={{ 'aria-label': 'search' }}
        value={keyword}
        onChange={(e: any) => setKeyword(e.target.value)}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={ () => props.handler({keyword: keyword})}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}