import { TypeKey } from '@/types/typekey';
import Box from '@mui/material/Box';
import SortField from './SortField';
import SortOrder from './SortOrder';

type SorterProps = {
    options: TypeKey[];
    handler: any;
}

export default function Sorter(props: SorterProps) {
  return (
    <>
    <Box sx={{ width: 180, marginLeft: '6px'}}>
      <SortField {...props} /> 
    </Box>
    <Box sx={{ width: 150, marginLeft: '6px'}}>
      <SortOrder handler={props.handler} />
    </Box>
    </>
  );
}