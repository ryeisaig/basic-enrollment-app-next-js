import { remove, validateRequest } from "@/services/CoreService";
import { Resources } from "@/utils/ApiConstants";

export async function DELETE (req: Request, { params }: { params: { id: string } }){
    const auth = await validateRequest();
    return await remove(params.id, Resources.COURSES, auth);
}