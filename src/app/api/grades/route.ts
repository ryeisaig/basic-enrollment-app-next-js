import { Mapping, create, getAll, update, validateRequest } from "@/services/CoreService";
import { Resources } from "@/utils/ApiConstants";
import { NextApiRequest } from "next";

export async function GET(req: Request) {
    await validateRequest(req);

    return await getAll(req, Resources.GRADES);
}

export async function POST(req: Request) {
    await validateRequest(req);
    const data = await req.json();
    if(data._id){
        return await update(data._id, data, Resources.GRADES);
    } else {
        return await create(data, Resources.GRADES);
    }
}