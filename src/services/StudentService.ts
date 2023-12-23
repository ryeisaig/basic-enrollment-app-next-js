import { Resources } from '@/utils/ApiConstants';
import clientPromise from '../lib/mongodb';
import { ObjectId } from 'mongodb';

export const generateStudentNumber = async (academicPeriodId: string) => {
    const client = await clientPromise;
    const db = client.db('enrollment');

    const data = await db.collection(Resources.ACADEMIC_PERIODS).findOne({_id : new ObjectId(academicPeriodId)});
    if(data){
        const ay = data.year.split("-")[0];

        const counterData:any = await db.collection(Resources.STUDENT_NUMBER).findOne({academicYear : data.year});

        if(counterData){
            counterData.counter = counterData.counter + 1;
            await db.collection(Resources.STUDENT_NUMBER).updateOne({_id : new ObjectId(counterData._id)}, { $set: counterData });
            return ay.slice(-2) + "-" + String(counterData.counter).padStart(5, '0');
        } else {
            await db.collection(Resources.STUDENT_NUMBER).insertOne({
                academicYear: data.year,
                counter: 1
            })
            return ay.slice(-2) + "-" + String(1).padStart(5, '0');
        }

    }
    throw new Error("Unable to generate student number");
}