import { remove, validateRequest } from "@/services/CoreService";
import { HttpMethod, Resources } from "@/utils/ApiConstants";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    validateRequest(req, res);

    switch(req.method){
        case HttpMethod.DELETE: {
            remove(req, res, Resources.COLLEGES);
            break; 
        } 
        default: res.status(404);
    }
}
