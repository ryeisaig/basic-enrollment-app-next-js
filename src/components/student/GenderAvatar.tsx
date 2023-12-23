import { Face3, Face6 } from '@mui/icons-material';

export default function GenderAvatar(gender: any) {
  if(gender === "male")
    return (
        <Face6 sx={{fontSize: "30px", color: "#2196f3"}}/>
    )
  else
    return(
        <Face3 sx={{fontSize: "30px", color: "#d500f9"}}/>
    )
}