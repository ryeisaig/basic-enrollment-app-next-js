import { create, getAll, update, validateRequest } from "@/services/CoreService";
import { Resources } from "@/utils/ApiConstants";

export async function POST(req: Request) {
    const auth = await validateRequest();
    const data = await req.json();
    if(data._id){
        return await update(data._id, data, Resources.ACADEMIC_PERIODS, auth);
    } else {
        return await create(data, Resources.ACADEMIC_PERIODS, auth);
    }
}

export async function GET(req: Request) {
    const auth = await validateRequest();
    return await getAll(req, Resources.ACADEMIC_PERIODS);
}