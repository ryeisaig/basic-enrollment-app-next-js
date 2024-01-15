import { Resources } from '@/utils/ApiConstants';
import clientPromise from '../lib/mongodb';
import { ObjectId } from 'mongodb';

export const updateGradingActive = async(id: string, auth?: any) => {
    const client = await clientPromise;
    const db = client.db('enrollment');

    // set all to false
    await db.collection(Resources.ACADEMIC_PERIODS).updateMany({deleteDateTime : null}, { $set: {gradingActive: false} });

    // set requested resource to true
    const request: any = {
        updateDateTime: new Date(),
        updatedBy: auth?.username,
        gradingActive: true
    }
    
    await db.collection(Resources.ACADEMIC_PERIODS).updateOne({_id : new ObjectId(id)}, { $set: request });
    return Response.json({'result': 'success'});
}


export const updateEnrollmentActive = async(id: string, auth?: any) => {
    const client = await clientPromise;
    const db = client.db('enrollment');

    // set all to false
    await db.collection(Resources.ACADEMIC_PERIODS).updateMany({deleteDateTime : null}, { $set: {enrollmentActive: false} });

    // set requested resource to true
    const request: any = {
        updateDateTime: new Date(),
        updatedBy: auth?.username,
        enrollmentActive: true
    }
    
    await db.collection(Resources.ACADEMIC_PERIODS).updateOne({_id : new ObjectId(id)}, { $set: request });
    return Response.json({'result': 'success'});
}