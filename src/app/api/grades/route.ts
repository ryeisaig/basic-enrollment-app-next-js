import { Mapping, create, getAll, update, validateRequest } from "@/services/CoreService";
import { Resources } from "@/utils/ApiConstants";
import { NextApiRequest } from "next";

export async function GET(req: Request) {
    const auth = await validateRequest();

    return await getAll(req, Resources.GRADES);
}

export async function POST(req: Request) {
    const auth = await validateRequest();
    const data = await req.json();
    if(data._id){
        return await update(data._id, data, Resources.GRADES, auth);
    } else {
        return await create(data, Resources.GRADES, auth);
    }
}