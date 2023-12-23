import clientPromise from "@/lib/mongodb";
import { HttpMethod, Resources } from "@/utils/ApiConstants";
import { NextApiRequest, NextApiResponse } from "next";
// @ts-ignore
import bcrypt from 'bcrypt';
// @ts-ignore
import jwt from "jsonwebtoken";
import { getListParams } from "@/utils/ParamUtils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    switch (req.method) {
        case HttpMethod.POST: {
            login(req, res);
            break;
        }
        case HttpMethod.GET: {
            loginByEmailAddress(req, res);
            break;
        }
        default: res.status(404);
    }
}

const login = async (req: any, res: any) => {
    const client = await clientPromise;
    const db = client.db('enrollment');
    const request = req.body;
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
            return res.status(401).json({ 'result': 'inactive' })
        }
        const result = await bcrypt.compare(request.password, data.password);
        if (result) {
            const token = generateToken(data);
            delete data.password;
            return res.status(200).json({ 'result': 'success', 'content': data, 'accessToken': token });
        }
    }

    return res.status(403).json({ 'result': 'forbidden' })
}


const loginByEmailAddress = async (req: any, res: any) => {
    const client = await clientPromise;
    const db = client.db('enrollment');
    const emailAddress = req.query.emailAddress;
    
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
            return res.status(401).json({ 'result': 'inactive' })
        }
      
        const token = generateToken(data);
        delete data.password;
        return res.status(200).json({ 'result': 'success', 'content': data, 'accessToken': token });
    }

    return res.status(403).json({ 'result': 'forbidden' })
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