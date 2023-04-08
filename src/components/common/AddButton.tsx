import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";

type AddButtonProps = {
    modal?: any;
}

export default function AddButton(props: AddButtonProps){
    const [showModal, setShowModal] = useState<boolean>(false);
    return (
        <>
            <Button variant="contained" color="primary" style={{height: "48px", marginRight: "5px"}} onClick={() => setShowModal(true)}>
                <Add />
            </Button>
            {props.modal(showModal, () => setShowModal(false))}
        </>
    )
}