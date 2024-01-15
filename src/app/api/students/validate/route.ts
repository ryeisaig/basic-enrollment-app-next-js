import { NextApiRequest } from "next";
import { Mapping, getById, getPotentialMatches, validateRequest } from "@/services/CoreService";
import { Resources } from "@/utils/ApiConstants";

export async function GET(req: Request) {
    const auth = await validateRequest();

    const mapping: Mapping[]= [
        { 
            collection: Resources.COURSES,
            localField: "courseId",
            as: "course",
            type: "single" 
        }
    ];

    const {searchParams} = new URL(req.url);

    return await getPotentialMatches(Resources.STUDENTS, searchParams, mapping);
}
