import { Delete } from "@mui/icons-material";
import { MenuItem } from "@mui/material";
import { useState } from "react";
import ConfirmDialog from "../wrapper/ConfirmDialog";
import { withFunctionalPermission } from "@/components/auth/withPermission";

type DeleteActionMenuItemProps = {
    warningMessage: string;
    submit?: any;
    label?: string;
    permissions?: string[];
}

export default function DeleteActionMenuItem(props: DeleteActionMenuItemProps){
    const [open, setOpen] = useState<boolean>(false);
    return withFunctionalPermission(
        <>
           <MenuItem onClick={() => {setOpen(true)}} disableRipple style={{fontSize: "14px"}}><Delete />{props.label? props.label: "Delete"}</MenuItem>
           <ConfirmDialog 
                open={open} 
                onClose={() => {setOpen(false)}} 
                message={props.warningMessage}
                submit={() => {props.submit(); setOpen(false)}}
                />
        </>,
        props.permissions
    )
}