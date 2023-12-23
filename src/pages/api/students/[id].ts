import { Mapping, getById, remove, validateRequest } from "@/services/CoreService";
import { HttpMethod, Resources } from "@/utils/ApiConstants";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    validateRequest(req, res);

    const mapping: Mapping[]= [
        { 
            collection: Resources.COURSES,
            localField: "courseId",
            as: "course",
            type: "single" 
        }
    ];

    switch(req.method){
        case HttpMethod.GET: {
            getById(req, res, Resources.STUDENTS, mapping);
            break; 
        } 
        case HttpMethod.DELETE: {
            remove(req, res, Resources.STUDENTS);
            break; 
        } 
        default: res.status(404);
    }
}