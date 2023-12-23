import { create, getAll, update, validateRequest } from '@/services/CoreService';
import { HttpMethod, Resources } from '@/utils/ApiConstants';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  validateRequest(req, res);
  switch(req.method){
    case HttpMethod.GET: {
      getAll(req, res, Resources.ACADEMIC_PERIODS);
      break; } 
    case HttpMethod.POST: {
      if(req.body._id){
        update(req, res, Resources.ACADEMIC_PERIODS);
      } else {
        create(req, res, Resources.ACADEMIC_PERIODS);
      }
      break; } 
    default: res.status(404);
  }
}