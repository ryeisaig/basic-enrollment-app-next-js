import { Mapping, create, getAll, update, validateRequest } from "@/services/CoreService";
import { processEnrollmentForNewStudent, processEnrollmentForOldStudent } from "@/services/EnrollmentService";
import { Resources } from "@/utils/ApiConstants";

export async function GET(req: Request) {
    const auth = await validateRequest();

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

    return await getAll(req, Resources.ENROLLMENTS, ["student.lastName", "student.firstName", "student.studentNumber"], mapping);
}

export async function POST(req: Request) {
    const auth = await validateRequest();
    const data = await req.json();

    if(data.studentType !== 'new' && data.student?.studentNumber !== ''){
        return await processEnrollmentForOldStudent(data, auth);
    } else {
        return await processEnrollmentForNewStudent(data, auth);
    }
}