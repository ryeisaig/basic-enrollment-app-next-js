import { Mapping, create, getAll, update, validateRequest } from '@/services/CoreService';
import { HttpMethod, Resources } from '@/utils/ApiConstants';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  validateRequest(req, res);

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
  switch(req.method){
    case HttpMethod.GET: {
      getAll(req, res, Resources.CLASSES, ['code'], mapping);
      break; } 
    case HttpMethod.POST: {
      if(req.body._id){
        update(req, res, Resources.CLASSES);
      } else {
        create(req, res, Resources.CLASSES);
      }
      break; } 
    default: res.status(404);
  }
}