import { Mapping, getById, remove, validateRequest } from "@/services/CoreService";
import { Resources } from "@/utils/ApiConstants";
import { NextApiRequest } from "next";

export async function DELETE (req: NextApiRequest, { params }: { params: { id: string } }){
    await validateRequest(req);
    return await remove(params.id, Resources.ENROLLMENTS);
}

export async function GET (req: NextApiRequest, { params }: { params: { id: string } }){
    await validateRequest(req);

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

    return getById(params.id, Resources.ENROLLMENTS, mapping);
}