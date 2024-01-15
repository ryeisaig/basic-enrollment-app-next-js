import { updateEnrollmentActive, updateGradingActive } from "@/services/AcademicPeriodService";
import { remove, validateRequest } from "@/services/CoreService";
import { Resources } from "@/utils/ApiConstants";

export async function DELETE (req: Request, { params }: { params: { id: string } }){
    const auth = await validateRequest();
    return await remove(params.id, Resources.ACADEMIC_PERIODS, auth);
}

export async function PATCH (req: Request, { params }: { params: { id: string } }){
    const auth = await validateRequest();
    const data = await req.json();
    if(data?.enrollmentActive){
        return await updateEnrollmentActive(params.id, auth);
    } else if(data?.gradingActive){
        return await updateGradingActive(params.id, auth);
    }
    return Response.json("Invalid request", {status: 400})
}