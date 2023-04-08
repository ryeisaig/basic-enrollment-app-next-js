import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  switch(req.method){
    case 'GET': {
      res.status(200).json({
        content: [
          {
            _id: '123',
            sectionNumber: '1',
            course: {
              _id: '123',
              code: 'BSIT',
            },
            year: 1
          },
          {
            _id: '1243',
            sectionNumber: '2',
            course: {
              _id: '123',
              code: 'BSIT',
            },
            year: 1
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
