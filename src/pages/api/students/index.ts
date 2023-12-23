import { Mapping, create, getAll, update, validateRequest } from '@/services/CoreService';
import { HttpMethod, Resources } from '@/utils/ApiConstants';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  validateRequest(req, res);

  const mapping: Mapping[]= [
    { 
      collection: Resources.COURSES,
      localField: "courseId",
      as: "course",
      type: "single" 
    }
  ];
  switch(req.method){
    case HttpMethod.GET: {
      getAll(req, res, Resources.STUDENTS, ['lastName', 'firstName', 'studentNumber'], mapping);
      break; } 
    case HttpMethod.POST: {
      if(req.body._id){
        update(req, res, Resources.STUDENTS);
      } else {
        create(req, res, Resources.STUDENTS);
      }
      break; } 
    default: res.status(404);
  }
}