import CustomTextField from "@/components/common/form/CustomTextField";
import PageTitle from "@/components/common/typography/PageTitle";
import { Google, Mail } from "@mui/icons-material";
import { Alert, Box, Button, CircularProgress, Divider, Link } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
// @ts-ignore
import bcrypt from 'bcryptjs';
import { useSession, signIn } from 'next-auth/react';
import { useDispatch } from "react-redux";
import { authenticate, authenticateByEmailAddress } from "@/actions/LoginActions";
import { Auth } from "@/utils/AuthUtils";

export default function Login(){
    const dispatch = useDispatch();
    const router = useRouter();
    const { redirect } = router.query;
    const { data, status } = useSession();
    
    const [login, setLogin] = useState({
        entity: '',
        username: '',
        password: ''
    });
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);

    const formValueChange = (field: string, value: any) => {
        setLogin({...login, [field]: value});
    }

    const processLogin = async (e: any) => {
        e.preventDefault();
        const hashedPassword = await bcrypt.hash(login.password, process.env.NEXT_PUBLIC_SALT);    
        const res:any = await authenticate(login.username, hashedPassword, dispatch);
        if(res.ok){
            setLoading(true);
            const data = await res.json();
            Auth.saveUserAndToken(data);
            setError("");
            if(redirect) window.location.href = redirect + "";
            router.push("/dashboard/enrollment");
        } else if(res.status === 403){
            setError("Login failed due to incorrect username or password.");
        } else if(res.status === 401){
            setError("Your account is inactive. Please contact your administrator.");
        } else {
            setError("Something went wrong. Please contact your administrator.");
        }
    }

    const authenticateByGmail = async(status: string, userData: any) => {
        if(status === 'authenticated' && data?.user?.email){
            setLoading(true);
            const data = await authenticateByEmailAddress(userData.user.email);
            if(data?.content){
                Auth.saveUserAndToken(data);
                if(redirect) window.location.href = redirect + "";
                router.push("/dashboard/enrollment");
            } else {
                setLoading(false);
                setError("No user found for this email address.");
            }

        }
    }
    
    useEffect(() => {
        authenticateByGmail(status, data);
    }, [status, data])

    return (
        <>
            <Box sx={style} component="form">
                <PageTitle style={{textAlign: "center", marginBottom: "20px"}}>Client Portal</PageTitle>
                { error && <Alert style={{marginBottom: "20px"}} severity="error" onClose={() => setError(undefined)}>{error}</Alert> }
                <CustomTextField value={login.entity} title="Client Code" required column='entity' handler={formValueChange} style={{...formStyle, display: "none"}}/>
                <CustomTextField value={login.username} required column='username' handler={formValueChange} style={formStyle}/>
                <CustomTextField type="password" value={login.password} required column='password' handler={formValueChange} style={formStyle}/>
                <Button type="submit" variant="contained" color="primary" style={{...formStyle, height: "40px"}} onClick={processLogin}>Direct Login</Button>
                <Divider style={{marginBottom: '16px', marginTop: '24px'}}>or</Divider>
                <Button variant="contained" onClick={() => signIn('google')} style={{...formStyle, height: "40px", background: "#db4437"}} startIcon={<Google style={{marginRight: "20px"}} /> }>Login with GMail</Button>
                <Button variant="contained" color="info" style={{...formStyle, height: "40px", marginTop: "15px", display: "none"}} startIcon={<Mail style={{marginRight: "20px"}}/>}> Login with Outlook</Button>
                <div style={{marginTop: "12px", textAlign: "center"}}>
                    <Link href="/resetPassword" color="gray" underline="none">Reset Password</Link>
                </div>
            
            </Box>
            {
            loading && 
                <Box sx={{position: 'absolute', width: '100%', minHeight: '100vh', ZIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center',  backgroundColor: 'rgba(0,0,0,0.8)'}}>
                    <CircularProgress style={{color: "#fff"}}/>
                    <span style={{marginLeft: "20px", color: "#fff"}}>Logging-in...</span>
                </Box>
            }
        </>
    );
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '1px solid #e0e0e0',
    borderRadius: '5px',
    boxShadow: 24,
    padding: '40px',
};

const formStyle = {
    width: "100%", 
    marginTop: "5px"
}