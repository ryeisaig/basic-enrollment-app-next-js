import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
palette: {
   primary: {
      main: '#004aad',
   },
   secondary: {
     main: '#e0e0e0',
   },
   error: {
   main: red.A400,
   },
  },
});
export default theme;