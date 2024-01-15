import { generateStudentNumber } from "./StudentService"
import { Resources } from "@/utils/ApiConstants";
import clientPromise from '../lib/mongodb';
import { ObjectId } from "mongodb";

export const processEnrollmentForNewStudent = async(data: any, auth: any) => {
    const client = await clientPromise;
    const db = client.db('enrollment');

    const enrollment =  {...data};
    const student = {...data.student}

    if(student._id){
        student['courseId'] = data.courseId;
        student['type'] = data.enrollmentType;
        student['yearLevel'] = data.yearLevel;
        student['updateDateTime'] = new Date();
        student['updatedBy'] = auth?.username;
        const studentId = student._id;
        delete student._id;
        await db.collection(Resources.STUDENTS).updateOne({_id : new ObjectId(studentId)}, { $set: student });
    } else {
        const studentNumber = await generateStudentNumber(data.academicPeriodId);
        student['studentNumber'] = studentNumber;
        student['courseId'] = data.courseId;
        student['type'] = data.enrollmentType;
        student['yearLevel'] = data.yearLevel;
        student['createDateTime'] = new Date();
        student['updateDateTime'] = new Date();
        student['updatedBy'] = auth?.username;
        student['createdBy'] = auth?.username;
        const studentData = await db.collection(Resources.STUDENTS).insertOne(student);
        enrollment['studentId'] = studentData.insertedId;
    }


    let newData;
    if(enrollment._id){
        let enrollmentId = enrollment._id;
        delete enrollment._id;
        enrollment['updateDateTime'] = new Date();
        enrollment['updatedBy'] = auth?.username;
        newData = await db.collection(Resources.STUDENTS).updateOne({_id : new ObjectId(enrollmentId)}, { $set: enrollment });
    } else {
        enrollment['createDateTime'] = new Date();
        enrollment['createdBy'] = auth?.username;
        newData = await db.collection(Resources.ENROLLMENTS).insertOne(enrollment);
    }
    
    return Response.json({'result': 'success', 'data': newData});
}

export const processEnrollmentForOldStudent = async(data: any, auth: any) => {
    const client = await clientPromise;
    const db = client.db('enrollment');

    const student = {...data.student}
    student['courseId'] = data.courseId;
    student['type'] = data.enrollmentType;
    student['yearLevel'] = data.yearLevel;
    student['updateDateTime'] = new Date();
    student['updatedBy'] = auth?.username;

    const studentId = student._id;
    delete student._id;
    await db.collection(Resources.STUDENTS).updateOne({_id : new ObjectId(studentId)}, { $set: student });
    
    let newData;
    if(data._id){
        let enrollmentId = data._id;
        delete data._id;
        data['updateDateTime'] = new Date();
        data['updatedBy'] = auth?.username;    
        newData = await db.collection(Resources.STUDENTS).updateOne({_id : new ObjectId(enrollmentId)}, { $set: data });
    } else {
        data['createDateTime'] = new Date();
        data['createdBy'] = auth?.username;
        newData = await db.collection(Resources.ENROLLMENTS).insertOne(data);
    }

    return Response.json({'result': 'success', 'data': newData});
}