import { Mapping, create, getAll, update, validateRequest } from "@/services/CoreService";
import { Resources } from "@/utils/ApiConstants";

export async function GET(req: Request) {
    const auth = await validateRequest();

    const mapping: Mapping[]= [
        { 
          collection: Resources.SUBJECTS,
          localField: "subjectId",
          as: "subject",
          type: "single" 
        },
        { 
          collection: Resources.SECTIONS,
          localField: "sectionId",
          as: "section",
          type: "single" 
        },
        { 
          collection: Resources.ROOMS,
          localField: "roomId",
          as: "room",
          type: "single" 
        },
        { 
          collection: Resources.INSTRUCTORS,
          localField: "instructorId",
          as: "instructor",
          type: "single" 
        },
        { 
          collection: Resources.ACADEMIC_PERIODS,
          localField: "academicPeriodId",
          as: "academicPeriod",
          type: "single" 
        },
        { 
          collection: Resources.COURSES,
          localField: "courseId",
          as: "course",
          type: "single" 
        }
      ];

    return await getAll(req, Resources.CLASSES, ['code'], mapping);
}

export async function POST(req: Request) {
    const auth = await validateRequest();
    const data = await req.json();
    if(data._id){
        return await update(data._id, data, Resources.CLASSES, auth);
    } else {
        return await create(data, Resources.CLASSES, auth);
    }
}