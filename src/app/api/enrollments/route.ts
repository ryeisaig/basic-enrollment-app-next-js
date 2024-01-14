import { Mapping, create, getAll, update, validateRequest } from "@/services/CoreService";
import { processEnrollmentForNewStudent, processEnrollmentForOldStudent } from "@/services/EnrollmentService";
import { Resources } from "@/utils/ApiConstants";

export async function GET(req: Request) {
    await validateRequest(req);

    const mapping: Mapping[]= [
        { 
          collection: Resources.STUDENTS,
          localField: "studentId",
          as: "student",
          type: "single" 
        },
        { 
          collection: Resources.COURSES,
          localField: "courseId",
          as: "course",
          type: "single" 
        },
        { 
          collection: Resources.ACADEMIC_PERIODS,
          localField: "academicPeriodId",
          as: "academicPeriod",
          type: "single" 
        }
      ];

    return await getAll(req, Resources.ENROLLMENTS, [], mapping);
}

export async function POST(req: Request) {
    await validateRequest(req);
    const data = await req.json();

    if(data.studentType !== 'new' && data.student?.studentNumber !== ''){
        return await processEnrollmentForOldStudent(data);
    } else {
        return await processEnrollmentForNewStudent(data);
    }
}