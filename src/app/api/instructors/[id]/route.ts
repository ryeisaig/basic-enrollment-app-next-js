import { remove, validateRequest } from "@/services/CoreService";
import { Resources } from "@/utils/ApiConstants";
import { NextApiRequest } from "next";

export async function DELETE (req: NextApiRequest, { params }: { params: { id: string } }){
    const auth = await validateRequest();
    return await remove(params.id, Resources.INSTRUCTORS, auth);
}