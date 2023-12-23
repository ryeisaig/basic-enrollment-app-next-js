import { Auth, TOKEN_KEY } from "./AuthUtils";

export const apiCall = async (resource: string, ...props: any[]) => {
  props[0] = {
    ...props[0],
    headers: {
      'Authorization' : `Bearer ${Auth.getToken()}`,
      'Content-Type' : 'application/json'
    }
  }
  const res = await fetch(`/api/${resource}`, ...props);
  if (!res.ok && res.status === 401) {
    window.alert("You've been auto-logout due to inactivity.")
    window.location.href = `/login?redirect=${window.location.href}` ;
  }
  return res;
}