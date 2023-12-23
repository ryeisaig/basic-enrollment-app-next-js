import { withFunctionalPermission } from "@/components/auth/withPermission";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";

type AddButtonProps = {
    modal?: any;
    permissions?: string[];
}

export default function AddButton(props: AddButtonProps){
    const [showModal, setShowModal] = useState<boolean>(false);
    return withFunctionalPermission(
        <>
                <Button variant="contained" color="primary" style={{height: "48px", marginRight: "5px", borderRadius: "3px"}} onClick={() => setShowModal(true)}>
                    <Add />
                </Button>
                {props.modal(showModal, () => setShowModal(false))}
        </>, 
        props.permissions)
    }