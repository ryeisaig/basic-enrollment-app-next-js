import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from "../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch(req.method){
    case 'GET': {
      getAll(req, res);
      break;
    } 
    case 'POST': {
      if(req.body._id){
        update(req, res);
      } else {
        create(req, res);
      }
      break;
    } 
    default: res.status(404);
  }
}

const getAll = async (req: any, res: any) => {
  const client = await clientPromise;
  const db = client.db("enrollment");
  const rowsPerPage = req.query.rowsPerPage ? parseInt(req.query.rowsPerPage) : 5; 
  const students = await db.collection("students").find({}).limit(rowsPerPage).toArray();
  res.status(200).json({
    totalElements: students.length, 
    content: students
  });
}

const create = async(req: any, res: any) => {
  const client = await clientPromise;
  const db = client.db("enrollment");
  const newStudent = req.body;
  newStudent.createDateTime = new Date();
  await db.collection("students").insertOne(req.body);
  res.status(200).json({'result': 'success'});
}

const update = async(req: any, res: any) => {
  const client = await clientPromise;
  const db = client.db("enrollment");
  const newStudent = req.body;
  newStudent.createDateTime = new Date();
  await db.collection("students").updateOne({"_id" : req.body._id}, { $set: req.body });
  res.status(200).json({'result': 'success'});
}