import { Mapping, create, getAll, update, validateRequest } from '@/services/CoreService';
import { HttpMethod, Resources } from '@/utils/ApiConstants';
import type { NextApiRequest, NextApiResponse } from 'next';
// @ts-ignore
import bcrypt from 'bcrypt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  validateRequest(req, res);

  const mapping: Mapping[]= [
    { 
      collection: Resources.ROLES,
      localField: "roleId",
      as: "role",
      type: "single" 
    },
    { 
      collection: Resources.COLLEGES,
      localField: "collegeId",
      as: "college",
      type: "single" 
    }
  ];
  switch(req.method){
    case HttpMethod.GET: {
      getAll(req, res, Resources.USERS, ["username", "emailAddress", "firstName", "lastName"], mapping);
      break; } 
    case HttpMethod.POST: {
      if(req.body._id){
        update(req, res, Resources.USERS);
      } else {
        const hashedPassword = await bcrypt.hash(req.body.password, process.env.NEXT_PUBLIC_SALT);
        req.body.password = hashedPassword;
        create(req, res, Resources.USERS);
      }
      break; } 
    default: res.status(404);
  }
}