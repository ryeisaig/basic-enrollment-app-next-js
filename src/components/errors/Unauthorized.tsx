import { Auth } from "@/utils/AuthUtils";
import { Alert, Button } from "@mui/material";
import * as permissionValues from "../role/permissions.json";
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import { Error, ErrorOutline, Warning } from "@mui/icons-material";

type Props = {
    permissions: string[]
};
const PERMISSION_KEYS: Map<string, string> = new Map(permissionValues.map(pv => pv.permissions.map(p => { return {code: p.value, name: p.title }})).flat().map(p => {
    return [p.code, p.name]
}))

const permissionDesc = (key: string) => {
    return PERMISSION_KEYS.get(key);
}

const Unauthorized = (props: Props) => {
    const router = useRouter();
    const [userrole, setUserRole] = useState<any>([]);
    const [loaded, setLoaded] = useState<any>(false);

    useEffect(() => {
        setUserRole(Auth.getRole());
        setLoaded(true);
    }, []);

    return (
        loaded && <div style={{margin: "auto", padding: "24px"}}>
        <Alert icon={<ErrorOutline fontSize="large"/>} style={{marginBottom: "20px"}} severity="error">
            <span style={{fontSize: "25px", fontWeight: "bold"}}>You are not authorized to access this page.</span>
            <p>
             <span style={{fontSize: "18px"}}>Your role as <b>{userrole}</b> does not have the ff. permissions required for this page</span>
            <ul>{
                props.permissions.map(p => 
                <li>{permissionDesc(p)}</li>
                )
            }
            </ul>
            </p>
            <p>
            If you think you must have access to this page, please contact your administrator to either change your role or add the permissions to your current role.
            </p>
            <br/>
            <Alert variant="outlined" severity="warning">
            <b>Note</b>: If you wish to add the permission on your current role, other users having the same role will also have access to this page.
            
            </Alert>
        </Alert>
        <Button onClick={() => router.push("/dashboard/enrollment")}>Go to dashboard</Button>
    </div>
    )
    
}

export default Unauthorized;