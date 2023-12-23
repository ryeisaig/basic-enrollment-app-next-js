import { Auth } from "@/utils/AuthUtils";
import { useEffect, useState } from "react";
import Unauthorized from "../errors/Unauthorized";

export const withPagePermission = (permissions: string[], component: any) => {
    const [userPermissions, setUserPermissions] = useState<any>([]);
    useEffect(() => {
      setUserPermissions(Auth.getPermissions());
    }, [])
    return userPermissions && permissions.some(p => userPermissions.includes(p)) ? component: <Unauthorized permissions={permissions}/>;
}

export function withFunctionalPermission(component: any, permissions?: string[]) {
  const [userPermissions, setUserPermissions] = useState<any>([]);
  useEffect(() => {
    setUserPermissions(Auth.getPermissions());
  }, []);
  if (!permissions) return component;
  return permissions.some(p => userPermissions.includes(p)) ? component : null;
}