import { Delete } from "@mui/icons-material";
import { MenuItem, Switch } from "@mui/material";
import { useState } from "react";
import ConfirmDialog from "../wrapper/ConfirmDialog";
import { withFunctionalPermission } from "@/components/auth/withPermission";

type ToggleProps = {
    warningMessage: string;
    submit?: any;
    permissions?: string[];
    disabled: boolean;
    checked: boolean;
}

export default function CustomToggle(props: ToggleProps){
    const [open, setOpen] = useState<boolean>(false);
    return withFunctionalPermission(
        <>
           <Switch disabled={props.disabled} checked={props.checked} onChange={ () => setOpen(true)}/> 
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