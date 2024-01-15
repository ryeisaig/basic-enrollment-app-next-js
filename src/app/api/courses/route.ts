import { Mapping, create, getAll, update, validateRequest } from "@/services/CoreService";
import { Resources } from "@/utils/ApiConstants";

export async function GET(req: Request) {
    const auth = await validateRequest();

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
    const auth = await validateRequest();
    const data = await req.json();
    if(data._id){
        return await update(data._id, data, Resources.COURSES, auth);
    } else {
        return await create(data, Resources.COURSES, auth);
    }
}