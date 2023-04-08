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
            code: 'BSIT',
            name: 'Bachelor of Science in Information Technology'
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
