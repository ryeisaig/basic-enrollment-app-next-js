import { Mapping, create, getAll, update, validateRequest } from "@/services/CoreService";
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

    return await getAll(req, Resources.STUDENTS, ['lastName', 'firstName', 'studentNumber'], mapping);
}

export async function POST(req: Request) {
    const auth = await validateRequest();

    const data = await req.json();
    if(data._id){
        return await update(data._id, data, Resources.STUDENTS, auth);
    } else {
        return await create(data, Resources.STUDENTS, auth);
    }
}