import { Mapping, create, getAll, update, validateRequest } from "@/services/CoreService";
import { Resources } from "@/utils/ApiConstants";

export async function GET(req: Request) {
    await validateRequest(req);

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
    await validateRequest(req);
    const data = await req.json();
    if(data._id){
        return await update(data._id, data, Resources.CLASSES);
    } else {
        return await create(data, Resources.CLASSES);
    }
}