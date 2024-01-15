import { Mapping, create, getAll, update, validateRequest } from "@/services/CoreService";
import { Resources } from "@/utils/ApiConstants";

export async function GET(req: Request) {
    const auth = await validateRequest();

    return await getAll(req, Resources.COLLEGES, ['code', 'name']);
}

export async function POST(req: Request) {
    const auth = await validateRequest();
    const data = await req.json();
    if(data._id){
        return await update(data._id, data, Resources.COLLEGES, auth);
    } else {
        return await create(data, Resources.COLLEGES, auth);
    }
}