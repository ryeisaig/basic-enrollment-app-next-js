import { Edit } from "@mui/icons-material";
import { MenuItem } from "@mui/material";
import { useState } from "react";

type EditActionMenuItemProps = {
    modal?: any;
}

export default function EditActionMenuItem(props: EditActionMenuItemProps){
    const [showModal, setShowModal] = useState<boolean>(false);
    return (
        <>
           <MenuItem onClick={() => {setShowModal(true)}} disableRipple style={{fontSize: "14px"}}><Edit /> Edit</MenuItem>
            {props.modal(showModal, () => setShowModal(false))}
        </>
    )
}