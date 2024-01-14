import { Mapping, create, getAll, update, validateRequest } from "@/services/CoreService";
import { Resources } from "@/utils/ApiConstants";

export async function GET(req: Request) {
    await validateRequest(req);

    const mapping: Mapping[]= [
        { 
          collection: Resources.COURSES,
          localField: "courseId",
          as: "course",
          type: "single" 
        },
        { 
          collection: Resources.INSTRUCTORS,
          localField: "adviserId",
          as: "adviser",
          type: "single" 
        }
    ];

    return await getAll(req, Resources.SECTIONS, [], mapping);
}

export async function POST(req: Request) {
    await validateRequest(req);
    const data = await req.json();
    if(data._id){
        return await update(data._id, data, Resources.SECTIONS);
    } else {
        return await create(data, Resources.SECTIONS);
    }
}