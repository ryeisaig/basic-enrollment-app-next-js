import { OpenInNew } from "@mui/icons-material";
import { MenuItem } from "@mui/material";

type LinkMenuItemProps = {
    link: string;
    label?: string;
}

export default function LinkMenuItem(props: LinkMenuItemProps){
    return (
        <>
           <MenuItem component="a" href={props.link} onClick={() => { window.location.href = props.link}} disableRipple style={{fontSize: "14px"}}><OpenInNew /> {props.label ? props.label : 'View'}</MenuItem>
        </>
    )
}