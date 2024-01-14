import { remove, validateRequest } from "@/services/CoreService";
import { Resources } from "@/utils/ApiConstants";

export async function DELETE (req: Request, { params }: { params: { id: string } }){
    await validateRequest(req);
    return await remove(params.id, Resources.COURSES);
}