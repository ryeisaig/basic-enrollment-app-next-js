import { Print } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";

type PrinterProps = {
    handler: any;
}

export default function Printer(props: PrinterProps){
    const [showModal, setShowModal] = useState<boolean>(false);
    return (
        <>
            <Button variant="contained"  style={{height: "48px", marginLeft: "5px", background: "#fff", color: "#616161", display: "none"}} onClick={() => setShowModal(true)}>
                <Print/>
            </Button>
        </>
    )
}