import { getListParams, getNonBlankOrNullQueryParam } from '@/utils/ParamUtils';
import clientPromise from '../lib/mongodb';
import { ObjectId } from 'mongodb';
// @ts-ignore
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export type Mapping = {
  collection: string;
  localField: string;
  as: string;
  type: "many" | "single"
}

const verifyJWT = (token: any) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded as JwtPayload;
  } catch (error: any) {
    console.log(error);
    return null;
  }
}

export const validateRequest = (req: NextApiRequest, res: NextApiResponse, requiredPermissions?: string[]) => {
  const accessToken = req.headers?.authorization?.split(' ')[1];
  if(accessToken === process.env.BYPASS_TOKEN){
    return;
  }

  if(!accessToken) return res.status(401).json({message: 'Unauthorized!'});

  const decoded = verifyJWT(accessToken);
  if (!decoded) {
    return res.status(401).json({message: 'Unauthorized!'});
  } else if(requiredPermissions && !decoded.permissions?.some((p:string) => requiredPermissions.includes(p))){
    return res.status(403).json({message: 'Forbidden!'});
  }
  
  return decoded;
}

export const getPotentialMatches = async(resource: string, query: any, mapping?: Mapping[]) => {
  const client = await clientPromise;
  const db = client.db('enrollment');

  const lookups: any[] = mapping ? mapping.map(m => {
    return {
      '$lookup': {
        'from': m.collection,
        'let': {"searchId": {$toObjectId: `$${m.localField}`}}, 
        "pipeline":[
          {"$match": {"$expr": {"$eq":[  "$_id", "$$searchId"]}}}
        ],
        'as': m.as
      }
    }
  }) : [];

  const setters = mapping ? mapping.reduce((acc: any, curr)=> curr.type === "single" && (acc[curr.as]={'$first': `$${curr.as}`}, acc), {}) : {}

  let pipeline = [
    {'$match': {
      ...getNonBlankOrNullQueryParam(query),
      deleteDateTime: null
    }},
    ...lookups,
    {'$set': {
      ...setters
    }}
  ];

  return await db.collection(resource)
  .aggregate(pipeline).toArray();
}

export const getAll = async (req: any, res: any, resource: string, searchOptions?: string[], mapping?: Mapping[]) => {
    const client = await clientPromise;
    const db = client.db('enrollment');
    
    const {
      rowsPerPage, 
      page, 
      keyword, 
      sortField, 
      sortType
    } = getListParams(req.query);
    
    let search = {};
    if(keyword != null && keyword.trim() != ''){
      const keys = keyword.trim().split(' ');
      let regexKeys = '';
      keys.map((k: string, i: number) => {
        regexKeys += (k + (i !== (keys.length - 1) ? '|' : ''));
      })

      // handle keyword search to match multiple fields
      const searchCriteria: any = [];
      searchOptions?.forEach((option) => {
        searchCriteria.push(
            {
                [option]: {'$regex' : regexKeys, '$options' : 'i'}
            }
        );
      });
      search = {'$or' : searchCriteria} 
    }

    const lookups: any[] = mapping ? mapping.map(m => {
      return {
        '$lookup': {
          'from': m.collection,
          'let': {"searchId": {$toObjectId: `$${m.localField}`}}, 
          "pipeline":[
            {"$match": {"$expr": {"$eq":[  "$_id", "$$searchId"]}}}
          ],
          'as': m.as
        }
      }
    }) : [];

    const setters = mapping ? mapping.reduce((acc: any, curr)=> curr.type === "single" && (acc[curr.as]={'$first': `$${curr.as}`}, acc), {}) : {}

    let pipeline = [
      {'$match': {
        ...search,
        ...getNonBlankOrNullQueryParam(req.query),
        deleteDateTime: null
      }},
      ...lookups,
      {'$set': {
        ...setters
      }}
    ];

    const data = await db.collection(resource)
    .aggregate(pipeline)
    .sort({[sortField]: sortType === 'asc' ? 1 : -1})
    .skip((page !=null && rowsPerPage !=null) ? (page * rowsPerPage) : 0)
    .limit(rowsPerPage != null ? rowsPerPage : Number.MAX_SAFE_INTEGER).toArray();
    
    const count = await db.collection(resource)
    .countDocuments({    
      ...search,
      ...getNonBlankOrNullQueryParam(req.query),
      deleteDateTime: null
    })
  
    res.status(200).json({
      totalElements: count, 
      content: data,
    });
  }


export const getById = async(req: any, res: any, resource: string, mapping?: Mapping[]) => {
  const client = await clientPromise;
  const db = client.db('enrollment');

  const setters = mapping ? mapping.reduce((acc: any, curr)=> curr.type === "single" && (acc[curr.as]={'$first': `$${curr.as}`}, acc), {}) : {}
  const lookups: any[] = mapping ? mapping.map(m => {
    return {
      '$lookup': {
        'from': m.collection,
        'let': {"searchId": {$toObjectId: `$${m.localField}`}}, 
        "pipeline":[
          {"$match": {"$expr": {"$eq":[  "$_id", "$$searchId"]}}}
        ],
        'as': m.as
      }
    }
  }) : [];

  let pipeline = [
    {'$match': {
      _id:  new ObjectId(req.query.id),
      deleteDateTime: null
    }},
    ...lookups,
    {'$set': {
      ...setters
    }}
  ];

  const data = await db.collection(resource)
  .aggregate(pipeline)
  .limit(1).toArray();
  
  res.status(200).json({content: data[0]});
}

export const create = async(req: any, res: any, resource: string) => {
    const client = await clientPromise;
    const db = client.db('enrollment');
    const request = req.body;
    request.createDateTime = new Date();
    request.updateDateTime = new Date();
    const data = await db.collection(resource).insertOne(request);
    res.status(200).json({'result': 'success', 'data': data});
}
  

export const update = async(req: any, res: any, resource: string) => {
    const client = await clientPromise;
    const db = client.db('enrollment');
    const request = { ...req.body};
    delete request._id;
    request.updateDateTime = new Date();
  
    await db.collection(resource).updateOne({_id : new ObjectId(req.body._id)}, { $set: request });
    res.status(200).json({'result': 'success'});
}

export const remove = async(req: any, res: any, resource: string) => {
    const client = await clientPromise;
    const db = client.db('enrollment');

    const data = await db.collection(resource).findOne({_id : new ObjectId(req.query.id)});
    const toBeDeleted = {...data};

    toBeDeleted.deleteDateTime= new Date();
    delete toBeDeleted._id;

    await db.collection(resource).updateOne({_id : new ObjectId(req.query.id)}, { $set: toBeDeleted });
    res.status(200).json({'result': 'success'});
}
