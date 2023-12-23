import { Mapping, getPotentialMatches, validateRequest } from '@/services/CoreService';
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
        const data = await getPotentialMatches(Resources.STUDENTS, req.query, mapping);
        res.status(200).json({
            content: data,
        });
      break; } 
    default: res.status(404);
  }
}