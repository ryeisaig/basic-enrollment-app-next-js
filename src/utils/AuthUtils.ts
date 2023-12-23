export const TOKEN_KEY = "accessToken";

export const Auth = {
    verifyToken: () => localStorage.getItem(TOKEN_KEY) != null && typeof localStorage.getItem(TOKEN_KEY) != 'undefined',
    saveUserAndToken: (data: any)=> {
        localStorage.setItem(TOKEN_KEY, data.accessToken);
        localStorage.setItem("username", data.content.username);
        localStorage.setItem("firstName", data.content.firstName);
        localStorage.setItem("lastName", data.content.lastName);
        localStorage.setItem("accessType", data.content.accessType);
        localStorage.setItem("roleId", data.content.roleId);
        localStorage.setItem("roleName", data.content.role.name);
        localStorage.setItem("permissions", data.content.role.permissions);
    },
    clearToken: () =>  { 
        localStorage.clear();
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            document.cookie = cookies[i] + "=; expires="+ new Date(0).toUTCString();
        }
    } ,
    getToken: () => localStorage.getItem(TOKEN_KEY),
    authenticatePage: () => {
        if(!localStorage.getItem(TOKEN_KEY)){
            window.location.href = "/login";
        }
    },
    getRole: () =>  typeof window !== 'undefined'  ? localStorage.getItem("roleName") : "",
    getPermissions: () =>  typeof window !== 'undefined' ? localStorage.getItem("permissions")?.split(","): []
}