import { setLoadingState } from "@/store/listSlice";
import { HttpMethod, Resources } from "@/utils/ApiConstants";
import { apiCall } from "@/utils/ApiUtils";

export const authenticate = async (username: string, password: string, dispatch: any) => {
    dispatch(setLoadingState(true));
    const res = await apiCall(Resources.AUTH, {
        method: HttpMethod.POST, 
        body: JSON.stringify({username: username, password: password}),
    });
    dispatch(setLoadingState(false));
    return res;
}

export const authenticateByEmailAddress = async(emailAddress: string) => {
    const res = await fetch(`/api/${Resources.AUTH}?${new URLSearchParams({
       emailAddress: emailAddress,
    })}`,
    { 
        headers: {
            'Authorization' : `Bearer ${process.env.BYPASS_TOKEN}`,
            'Content-Type' : 'application/json'
        }
    }
    );
    return res.json();
}