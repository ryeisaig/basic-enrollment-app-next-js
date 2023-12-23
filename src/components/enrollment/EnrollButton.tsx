import { Add, PersonAddAlt1, PersonAddAlt1Outlined } from "@mui/icons-material";
import { Button, MenuItem } from "@mui/material";
import { StyledMenu } from "../common/menu/ActionMenu";
import { useState } from "react";
import { withFunctionalPermission } from "../auth/withPermission";

export default function EnrollButton() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return withFunctionalPermission(
        <>
            <Button
                variant="contained"
                color="primary"
                style={{ height: "48px", marginRight: "5px", borderRadius: "3px" }}
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            ><Add /></Button>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={() => { window.location.href = "/enrollExisting" }} disableRipple><PersonAddAlt1 />Enroll Existing Student</MenuItem>
                <MenuItem onClick={() => { window.location.href = "/enrollNew" }} disableRipple><PersonAddAlt1Outlined />Enroll New Student</MenuItem>
            </StyledMenu>
        </>, ["enrollments.create","enrollments.create-group"]
    )
}