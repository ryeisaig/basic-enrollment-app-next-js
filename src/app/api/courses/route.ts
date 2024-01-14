import { Mapping, create, getAll, update, validateRequest } from "@/services/CoreService";
import { Resources } from "@/utils/ApiConstants";

export async function GET(req: Request) {
    await validateRequest(req);

    const mapping: Mapping[]= [
        { 
          collection: Resources.COLLEGES,
          localField: "collegeId",
          as: "college",
          type: "single" 
        }
    ];

    return await getAll(req, Resources.COURSES, ['code', 'name'], mapping);
}

export async function POST(req: Request) {
    await validateRequest(req);
    const data = await req.json();
    if(data._id){
        return await update(data._id, data, Resources.COURSES);
    } else {
        return await create(data, Resources.COURSES);
    }
}