import { create, getAll, update, validateRequest } from "@/services/CoreService";
import { Resources } from "@/utils/ApiConstants";

export async function POST(req: Response) {
    await validateRequest(req);
    const data = await req.json();
    if(data._id){
        return await update(data._id, data, Resources.ACADEMIC_PERIODS);
    } else {
        return await create(data, Resources.ACADEMIC_PERIODS);
    }
}

export async function GET(req: Request) {
    await validateRequest(req);
    return await getAll(req, Resources.ACADEMIC_PERIODS);
}