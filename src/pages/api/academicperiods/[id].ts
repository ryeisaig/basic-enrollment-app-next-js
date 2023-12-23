import { remove, validateRequest } from "@/services/CoreService";
import { HttpMethod, Resources } from "@/utils/ApiConstants";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const decoded = validateRequest(req, res);
    switch(req.method){
        case HttpMethod.DELETE: {
            remove(req, res, Resources.ACADEMIC_PERIODS);
            break; 
        } 
        default: res.status(404);
    }
}
