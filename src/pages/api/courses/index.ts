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
      collection: Resources.COLLEGES,
      localField: "collegeId",
      as: "college",
      type: "single" 
    }
  ];
  switch(req.method){
    case HttpMethod.GET: {
      getAll(req, res, Resources.COURSES, ['code', 'name'], mapping);
      break; } 
    case HttpMethod.POST: {
      if(req.body._id){
        update(req, res, Resources.COURSES);
      } else {
        create(req, res, Resources.COURSES);
      }
      break; } 
    default: res.status(404);
  }
}