import { Mapping, getAll, update, validateRequest } from '@/services/CoreService';
import { processEnrollmentForNewStudent, processEnrollmentForOldStudent } from '@/services/EnrollmentService';
import { HttpMethod, Resources } from '@/utils/ApiConstants';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  validateRequest(req, res);

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

  switch(req.method){
    case HttpMethod.GET: {
      getAll(req, res, Resources.ENROLLMENTS, [], mapping);
      break; } 
    case HttpMethod.POST: {
      if(req.body.studentType !== 'new' && req.body.student?.studentNumber !== ''){
        processEnrollmentForOldStudent(req, res);
      } else {
        processEnrollmentForNewStudent(req, res);
      }
      break; } 
    default: res.status(404);
  }
}