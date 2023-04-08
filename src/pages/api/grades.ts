import { Student } from '@/types/student';
import type { NextApiRequest, NextApiResponse } from 'next'

const saveStudent = (student: Student) => {

}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  switch(req.method){
    case 'GET': {
      res.status(200).json({content: [
        {
          _id: "12345",
          class: {
            _id: "132231",
            code: "001",
            subject: {
              _id: "3232",
              code: "ENG 1",
            },
            instructor: {
              _id: "3232",
              lastName: "Dela Cruz",
              firstName: "Juan"
            }
          },
          
          unit: 3,
          creditUnit: 3,
          status: "Draft",
          grade: "1.50",
          finalGrade: "1.50"
        },
        {
          _id: "12345",
          class: {
            _id: "132231",
            code: "001",
            subject: {
              _id: "3232",
              code: "ENG 1",
            },
            instructor: {
              _id: "3232",
              lastName: "Dela Cruz",
              firstName: "Juan"
            }
          },
          
          unit: 3,
          creditUnit: 3,
          status: "Draft",
          grade: "1.50",
          finalGrade: "1.50"
        }
      ]
      });

      
      break;
    } 
    case 'PUT': {
      res.status(201);
      break;
    } 
    default: res.status(404);
  }
}
