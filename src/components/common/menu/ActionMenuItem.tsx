import { Edit, FileCopy } from "@mui/icons-material";
import { MenuItem } from "@mui/material";
import { useState } from "react";

type ActionMenuItemProps = {
    modal?: any;
    label?: any;
}

export default function ActionMenuItem(props: ActionMenuItemProps){
    const [showModal, setShowModal] = useState<boolean>(false);
    return (
        <>
           <MenuItem onClick={() => {setShowModal(true)}} disableRipple style={{fontSize: "14px"}}>{props.label}</MenuItem>
            {props.modal(showModal, () => setShowModal(false))}
        </>
    )
}