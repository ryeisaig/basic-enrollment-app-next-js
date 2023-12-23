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
          collection: Resources.STUDENTS,
          localField: "studentId",
          as: "student",
          type: "single" 
        },
        { 
          collection: Resources.COURSES,
          localField: "courseId",
          as: "course",
          type: "single" 
        },
        { 
          collection: Resources.ACADEMIC_PERIODS,
          localField: "academicPeriodId",
          as: "academicPeriod",
          type: "single" 
        }
    ];

    switch(req.method){
        case HttpMethod.GET: {
            getById(req, res, Resources.ENROLLMENTS, mapping);
            break; 
        } 
        case HttpMethod.DELETE: {
            remove(req, res, Resources.ENROLLMENTS);
            break; 
        } 
        default: res.status(404);
    }
}
