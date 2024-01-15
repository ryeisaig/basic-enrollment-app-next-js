import { NextApiRequest } from "next";
import { Mapping, getById, remove, validateRequest } from "@/services/CoreService";
import { Resources } from "@/utils/ApiConstants";

export async function GET(req: NextApiRequest, { params }: { params: { id: string } }) {
    const auth = await validateRequest();

    const mapping: Mapping[]= [
        { 
            collection: Resources.COURSES,
            localField: "courseId",
            as: "course",
            type: "single" 
        }
    ];
    return await getById(params.id, Resources.STUDENTS, mapping);
}

export async function DELETE (req: NextApiRequest, { params }: { params: { id: string } }){
    const auth = await validateRequest();
    return await remove(params.id, Resources.STUDENTS, auth);
}
