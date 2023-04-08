import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
palette: {
   primary: {
      main: '#006064',
   },
   secondary: {
     main: '#006064',
   },
   error: {
   main: red.A400,
   },
  },
});
export default theme;