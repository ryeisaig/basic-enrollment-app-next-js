import { Resources } from "@/utils/ApiConstants";
import { NextApiRequest } from "next";
import clientPromise from "@/lib/mongodb";
// @ts-ignore
import bcrypt from 'bcrypt';
// @ts-ignore
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  const { searchParams} = new URL(req.url);

  return await loginByEmailAddress(searchParams.get("emailAddress"));
}

export async function POST(req: Request) {
  return await login(req);
}


const loginByEmailAddress = async (emailAddress: string | null) => {
  const client = await clientPromise;
  const db = client.db('enrollment');
  
  const result = await db.collection("users")
      .aggregate(
          [
              {
                  '$match': {
                      emailAddress: emailAddress,
                      deleteDateTime: null
                  }
              },
              {
                  '$lookup': {
                      'from': Resources.ROLES,
                      'let': { "searchId": { $toObjectId: `$roleId` } },
                      "pipeline": [
                          { "$match": { "$expr": { "$eq": ["$_id", "$$searchId"] } } }
                      ],
                      'as': 'role'
                  }
              },
              {
                  '$lookup': {
                      'from': Resources.COLLEGES,
                      'let': { "searchId": { $toObjectId: `$collegeId` } },
                      "pipeline": [
                          { "$match": { "$expr": { "$eq": ["$_id", "$$searchId"] } } }
                      ],
                      'as': 'college'
                  }
              },
              {
                  '$set': {
                      role: { '$first': `$role` },
                      college: { '$first': `$college` }
                  }
              }
          ]
      ).toArray();

  const data = result[0];

  if (data) {
      if (data.status !== "active") {
          return Response.json({ 'result': 'inactive' }, {status: 401});
      }
    
      const token = generateToken(data);
      delete data.password;
      return Response.json({ 'result': 'success', 'content': data, 'accessToken': token });
  }

  return Response.json({ 'result': 'forbidden' }, {status: 403});
}

const login = async (req: any) => {
  const client = await clientPromise;
  const db = client.db('enrollment');
  const request = await req.json();
  const result = await db.collection("users")
      .aggregate(
          [
              {
                  '$match': {
                      username: request.username,
                      deleteDateTime: null
                  }
              },
              {
                  '$lookup': {
                      'from': Resources.ROLES,
                      'let': { "searchId": { $toObjectId: `$roleId` } },
                      "pipeline": [
                          { "$match": { "$expr": { "$eq": ["$_id", "$$searchId"] } } }
                      ],
                      'as': 'role'
                  }
              },
              {
                  '$lookup': {
                      'from': Resources.COLLEGES,
                      'let': { "searchId": { $toObjectId: `$collegeId` } },
                      "pipeline": [
                          { "$match": { "$expr": { "$eq": ["$_id", "$$searchId"] } } }
                      ],
                      'as': 'college'
                  }
              },
              {
                  '$set': {
                      role: { '$first': `$role` },
                      college: { '$first': `$college` }
                  }
              }
          ]
      ).toArray();

  const data = result[0];
  if (data) {
      if (data.status !== "active") {
          return Response.json({ 'result': 'inactive' }, {status: 401});
      }
      const result = await bcrypt.compare(request.password, data.password);
      if (result) {
          const token = generateToken(data);
          delete data.password;
          return Response.json({ 'result': 'success', 'content': data, 'accessToken': token });
      }
  }


  return Response.json({ 'result': 'forbidden' }, {status: 403});
}

const generateToken = (data: any) => {
  return jwt.sign(
      {
          id: data._id,
          username: data.username,
          role: data.role?.name,
          exp: Math.floor(Date.now() / 1000) + parseInt(process.env.JWT_EXPIRES_IN || "36000"),
          permissions: data.role?.permissions
      },
      process.env.JWT_SECRET
  );
}
