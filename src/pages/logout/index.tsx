import { Auth } from "@/utils/AuthUtils";
import { useEffect } from "react";
import { signOut } from 'next-auth/react';
import { Box, CircularProgress } from "@mui/material";


export default function Logout(){
    const logout = async () => {
        await signOut();
        await Auth.clearToken();
        window.location.href = "/login";  
    }
    useEffect(() => {
        logout(); 
    }, []);
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',  minHeight: '100vh'}}>
            <CircularProgress />
            <span style={{marginLeft: "20px"}}>Logging-out...</span>
        </Box>
    );
}