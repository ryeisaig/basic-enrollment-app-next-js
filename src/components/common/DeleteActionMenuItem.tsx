import { Delete } from "@mui/icons-material";
import { MenuItem } from "@mui/material";
import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";

type DeleteActionMenuItemProps = {
    warningMessage: string;
    submit?: any;
}

export default function DeleteActionMenuItem(props: DeleteActionMenuItemProps){
    const [open, setOpen] = useState<boolean>(false);
    return (
        <>
           <MenuItem onClick={() => {setOpen(true)}} disableRipple style={{fontSize: "14px"}}><Delete /> Delete</MenuItem>
           <ConfirmDialog 
                open={open} 
                onClose={() => {setOpen(false)}} 
                message={props.warningMessage}
                submit={() => {props.submit(); setOpen(false)}}
                />
        </>
    )
}