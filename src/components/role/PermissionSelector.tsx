import { toTitle } from "@/utils/StringUtils";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import PageSubtitle from "../common/typography/PageSubtitle";
import * as permissions from "./permissions.json";

export type MultiSelectProps = {
    value: string[];
    title?: string;
    column?: string;
    handler?: any;
    fullWidth?: boolean;
    style?: any;
    size?: "small" | "medium";
    required?: boolean;
}

export default function PermissionSelector(props: MultiSelectProps){
    const setPermissions = (permission: string, checked: boolean) => {
        const rolePermissions = new Set([...props?.value]);
        if(checked){
          rolePermissions.add(permission);
        } else {
          rolePermissions.delete(permission);
        }
        props.handler(props.column, Array.from(rolePermissions));
    }

    const setAllPermissionsByGroup = (group: string, checked: boolean) => {
        const rolePermissions = new Set([...props?.value]);
        const allPermissionValuesByGroup = getAllPermissionValuesByGroup(group)
        if(checked){
            allPermissionValuesByGroup.forEach(permission => rolePermissions.add(permission))
        } else {
            allPermissionValuesByGroup.forEach(permission => rolePermissions.delete(permission))
        }
        props.handler(props.column, Array.from(rolePermissions));
    }

    const isAllPermissionsByGroupChecked = (group: string) => {
        const allPermissionValuesByGroup = getAllPermissionValuesByGroup(group)
        const match = getMatches(allPermissionValuesByGroup, props.value);
        return match >= allPermissionValuesByGroup.length;
    } 

    const isAnyPermissionsByGroupChecked = (group: string) => {
        const allPermissionValuesByGroup = getAllPermissionValuesByGroup(group);
        const match = getMatches(allPermissionValuesByGroup, props.value);
        return match > 0 && match < allPermissionValuesByGroup.length;
    }

    const getMatches = (group1: string[], group2: string[]) => {
        return group1.filter(element => group2.includes(element)).length;
    }
    
    const getAllPermissionValuesByGroup = (group: string) => {
        const allPermissionsByGroup = permissions.filter(p => p.group === group)[0];
        return allPermissionsByGroup.permissions.map(g => g.value);
    }
    

    return (
        <>
            <PageSubtitle>Permissions</PageSubtitle>
            {
            permissions.map((permissionsGroup) => {
                return(
                <div style={{marginBottom: "20px"}}>
                    <FormControlLabel 
                        control={
                            <Checkbox 
                                checked={isAllPermissionsByGroupChecked(permissionsGroup.group)}
                                indeterminate={isAnyPermissionsByGroupChecked(permissionsGroup.group)}
                                onChange={(e) => setAllPermissionsByGroup(permissionsGroup.group, e.target.checked)} />
                        } 
                        label={`All ${toTitle(permissionsGroup.group)} Functions`}
                    />
                    <div style={{paddingLeft: "20px"}}>
                    {
                        permissionsGroup.permissions.map(permission =>
                        <FormControlLabel 
                            control={
                            <Checkbox checked={props?.value?.includes(permission.value)} onChange={(e) => setPermissions(permission.value, e.target.checked)} />
                            } 
                            label={
                                <label style={{fontSize: "12px"}}>{permission.title}</label>
                            } 
                            style={{width: "320px"}}
                        />)
                    }
                    </div>
                </div>
                );
            })
            }
        </>
    );

}