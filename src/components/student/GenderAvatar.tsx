import Avatar from "@mui/material/Avatar"
import { Face3, Face6 } from '@mui/icons-material';

export default function GenderAvatar(gender: string) {
  if(gender === "male")
    return (
      <Avatar sx={{bgcolor: "#2196f3", height: "30px", width: "30px"}}>
        <Face6 sx={{fontSize: "18px"}}/>
      </Avatar> 
    )
  else
    return(
      <Avatar sx={{ bgcolor: "#d500f9", height: "30px", width: "30px"}}>
        <Face3 sx={{fontSize: "18px"}}/>
      </Avatar>             
    )
}