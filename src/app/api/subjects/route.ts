import { create, getAll, update, validateRequest } from "@/services/CoreService";
import { Resources } from "@/utils/ApiConstants";

export async function GET(req: Request) {
    await validateRequest(req);
    return await getAll(req, Resources.SUBJECTS, ['code', 'name', 'description']);
}

export async function POST(req: Request) {
    await validateRequest(req);
    const data = await req.json();
    if(data._id){
        return await update(data._id, data, Resources.SUBJECTS);
    } else {
        return await create(data, Resources.SUBJECTS);
    }
}